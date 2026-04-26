<template>
    <div ref="rootRef" class="hero-model-panel">
        <canvas ref="canvasRef" class="hero-model-canvas"></canvas>
        <div v-if="loading" class="hint">模型加载中...</div>
        <div v-else-if="errorText" class="hint error">{{ errorText }}</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

const defaultHeroModelUrl = new URL('../../assets/英雄.glb', import.meta.url).href;

const props = defineProps<{
    modelUrl?: string;
    autoRotate?: boolean;
    showGrid?: boolean;
    centerOffsetX?: number;
    centerOffsetY?: number;
    centerOffsetZ?: number;
}>();

const rootRef = ref<HTMLElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const loading = ref(true);
const errorText = ref('');

const clock = new THREE.Clock();
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;
let mixer: THREE.AnimationMixer | null = null;
let modelRoot: THREE.Object3D | null = null;
let modelPivot: THREE.Group | null = null;
let grid: THREE.GridHelper | null = null;
let resizeObserver: ResizeObserver | null = null;
let rafId = 0;
const MODEL_YAW_OFFSET = 0;
const MODEL_PITCH_OFFSET = -Math.PI / 2;
const MODEL_ROLL_OFFSET = 0;
const DEFAULT_CENTER_OFFSET_X = 0;
const DEFAULT_CENTER_OFFSET_Y = 0;
const DEFAULT_CENTER_OFFSET_Z = 0;
const CAMERA_TARGET_OFFSET_X = -1.42;
const CAMERA_TARGET_OFFSET_Y = -0.28;
const CAMERA_TARGET_OFFSET_Z = 0;
const ROTATION_PIVOT_OFFSET_X = 0;
const ROTATION_PIVOT_OFFSET_Y = 0;
const ROTATION_PIVOT_OFFSET_Z = 0;

const disposeMaterial = (material: THREE.Material | THREE.Material[]) => {
    if (Array.isArray(material)) {
        material.forEach((item) => item.dispose());
        return;
    }
    material.dispose();
};

const clearModel = () => {
    if (!scene || !modelRoot) return;
    if (modelPivot) {
        scene.remove(modelPivot);
    } else {
        scene.remove(modelRoot);
    }
    modelRoot.traverse((child: THREE.Object3D) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry?.dispose();
        if (mesh.material) {
            disposeMaterial(mesh.material);
        }
    });
    modelRoot = null;
    modelPivot = null;
    mixer = null;
};

const updateSize = () => {
    if (!rootRef.value || !renderer || !camera) return;
    const width = Math.max(rootRef.value.clientWidth, 1);
    const height = Math.max(rootRef.value.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};

const isPlaceholderCube = (mesh: THREE.Mesh) => {
    if (mesh.name === 'mesh_0') return true;
    if (!mesh.geometry) return false;

    if (!mesh.geometry.boundingBox) {
        mesh.geometry.computeBoundingBox();
    }

    const box = mesh.geometry.boundingBox;
    if (!box || box.isEmpty()) return false;

    const size = box.getSize(new THREE.Vector3());
    const minDim = Math.min(size.x, size.y, size.z);
    const maxDim = Math.max(size.x, size.y, size.z);
    if (minDim <= 0) return false;

    const isNearCube = maxDim / minDim < 1.2;
    const isLargeCube = maxDim >= 1.5;
    return isNearCube && isLargeCube;
};

const computeModelBounds = (root: THREE.Object3D) => {
    root.updateMatrixWorld(true);

    const bounds = new THREE.Box3();
    let hasMesh = false;

    root.traverse((child: THREE.Object3D) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh || !mesh.visible || isPlaceholderCube(mesh)) return;

        const meshBounds = new THREE.Box3().setFromObject(mesh);
        if (meshBounds.isEmpty()) return;

        if (!hasMesh) {
            bounds.copy(meshBounds);
            hasMesh = true;
        } else {
            bounds.union(meshBounds);
        }
    });

    return hasMesh ? bounds : new THREE.Box3().setFromObject(root);
};

const hidePlaceholderCube = (root: THREE.Object3D) => {
    root.traverse((child: THREE.Object3D) => {
        const mesh = child as THREE.Mesh;
        if (!mesh.isMesh) return;
        if (isPlaceholderCube(mesh)) {
            mesh.visible = false;
        }
    });
};

const normalizeModel = (object: THREE.Object3D) => {
    const box = computeModelBounds(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    if (size.lengthSq() === 0) return;

    const targetHeight = 3.6;
    const rawScale = targetHeight / Math.max(size.y, 1e-6);
    const scale = THREE.MathUtils.clamp(rawScale, 0.05, 8);
    object.scale.setScalar(scale);
    object.position.sub(center.clone().multiplyScalar(scale));

    const offsetX = props.centerOffsetX ?? DEFAULT_CENTER_OFFSET_X;
    const offsetY = props.centerOffsetY ?? DEFAULT_CENTER_OFFSET_Y;
    const offsetZ = props.centerOffsetZ ?? DEFAULT_CENTER_OFFSET_Z;
    if (offsetX !== 0 || offsetY !== 0 || offsetZ !== 0) {
        object.position.add(new THREE.Vector3(offsetX, offsetY, offsetZ));
    }
};

const frameCameraToObject = (object: THREE.Object3D) => {
    if (!camera || !controls) return;

    const box = computeModelBounds(object);
    const center = box.getCenter(new THREE.Vector3());
    const focus = center.clone().add(new THREE.Vector3(
        CAMERA_TARGET_OFFSET_X,
        CAMERA_TARGET_OFFSET_Y,
        CAMERA_TARGET_OFFSET_Z
    ));
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z, 0.1);

    const halfFovRad = THREE.MathUtils.degToRad(camera.fov * 0.5);
    const fitDistance = (maxDim * 0.5) / Math.tan(halfFovRad);
    const distance = Math.max(fitDistance * 0.38, 0.52);
    const viewDir = new THREE.Vector3(0.12, 0.02, 1).normalize();

    camera.position.copy(focus).addScaledVector(viewDir, distance);
    camera.lookAt(focus);
    camera.near = Math.max(distance / 100, 0.01);
    camera.far = Math.max(distance * 20, 50);
    camera.updateProjectionMatrix();

    controls.target.copy(focus);
    controls.minDistance = distance * 0.75;
    controls.maxDistance = distance * 1.4;
    controls.minPolarAngle = 0.1;
    controls.maxPolarAngle = Math.PI - 0.1;
    controls.update();
};

const loadModel = async () => {
    if (!scene) return;

    const activeModelUrl = props.modelUrl ?? defaultHeroModelUrl;
    if (!activeModelUrl) return;

    loading.value = true;
    errorText.value = '';
    clearModel();

    const loader = new GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    try {
        const gltf = await loader.loadAsync(activeModelUrl);
        const object = gltf.scene || gltf.scenes[0];
        if (!object) {
            throw new Error('模型内容为空');
        }

        const rawBounds = new THREE.Box3().setFromObject(object);
        if (rawBounds.isEmpty()) {
            throw new Error('模型包围盒为空，无法渲染');
        }

        hidePlaceholderCube(object);
        normalizeModel(object);
        object.updateMatrixWorld(true);

        const rotationPivot = new THREE.Group();
        rotationPivot.position.set(
            ROTATION_PIVOT_OFFSET_X,
            ROTATION_PIVOT_OFFSET_Y,
            ROTATION_PIVOT_OFFSET_Z
        );
        rotationPivot.rotation.set(MODEL_PITCH_OFFSET, MODEL_YAW_OFFSET, MODEL_ROLL_OFFSET);

        object.position.sub(rotationPivot.position);
        rotationPivot.add(object);

        const pivot = new THREE.Group();
        pivot.add(rotationPivot);
        scene.add(pivot);
        pivot.updateMatrixWorld(true);

        modelPivot = pivot;
        modelRoot = object;
        frameCameraToObject(pivot);

        if (gltf.animations.length > 0) {
            mixer = new THREE.AnimationMixer(object);
            gltf.animations.forEach((clip: THREE.AnimationClip) => mixer?.clipAction(clip).play());
        }

        loading.value = false;
    } catch (error) {
        console.error('HeroModelPanel load failed:', error);
        loading.value = false;
        const message = error instanceof Error ? error.message : String(error);
        errorText.value = `模型加载失败: ${message}`;
    }
};

const renderFrame = () => {
    if (!scene || !camera || !renderer) return;

    const delta = clock.getDelta();
    mixer?.update(delta);

    if ((props.autoRotate ?? true) && modelPivot) {
        modelPivot.rotation.y += delta * 0.65;
    }

    if (controls) {
        controls.autoRotate = false;
        controls.enabled = true;
        controls.update();
    }

    renderer.render(scene, camera);
    rafId = requestAnimationFrame(renderFrame);
};

const initScene = async () => {
    if (!canvasRef.value || !rootRef.value) return;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(1.4, 1.2, 2.4);

    renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x2a3040, 0.95);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.1);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x9ec6ff, 0.6);
    rimLight.position.set(-3, 2, -4);
    scene.add(rimLight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 1.3;
    controls.maxDistance = 4.8;
    controls.target.set(0, 0.95, 0);

    if (props.showGrid ?? false) {
        grid = new THREE.GridHelper(6, 12, 0x66a3ff, 0x33435f);
        (grid.material as THREE.Material).transparent = true;
        (grid.material as THREE.Material).opacity = 0.25;
        scene.add(grid);
    }

    updateSize();

    resizeObserver = new ResizeObserver(() => {
        updateSize();
    });
    resizeObserver.observe(rootRef.value);

    await loadModel();
    renderFrame();
};

const disposeScene = () => {
    cancelAnimationFrame(rafId);

    resizeObserver?.disconnect();
    resizeObserver = null;

    clearModel();

    if (scene && grid) {
        scene.remove(grid);
        const gridMaterial = grid.material;
        if (Array.isArray(gridMaterial)) {
            gridMaterial.forEach((item) => item.dispose());
        } else {
            gridMaterial.dispose();
        }
        grid.geometry.dispose();
    }
    grid = null;

    controls?.dispose();
    controls = null;

    renderer?.dispose();
    renderer = null;

    scene = null;
    camera = null;
};

watch(
    () => props.modelUrl,
    async () => {
        if (scene) {
            await loadModel();
        }
    }
);

onMounted(async () => {
    await initScene();
});

onUnmounted(() => {
    disposeScene();
});
</script>

<style scoped lang="sass">
.hero-model-panel
    position: relative
    width: 100%
    height: 100%
    border-radius: 10px
    overflow: hidden

.hero-model-canvas
    width: 100%
    height: 100%
    display: block
    background: transparent

.hint
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    font-size: 12px
    color: var(--hud-text-secondary)
    background: rgba(6, 12, 20, 0.55)
    border: 1px solid rgba(255, 255, 255, 0.16)
    padding: 4px 8px
    border-radius: 6px

.hint.error
    color: #ff8a80
</style>
