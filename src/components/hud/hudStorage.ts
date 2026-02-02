export const HUD_LAYOUT_KEY = 'rm-hud-layout-infantry';
export const HUD_SETTINGS_KEY = 'rm-hud-settings-infantry';

export interface StoredHudWidget {
    id: string;
    title: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minW: number;
    minH: number;
    visible: boolean;
    locked: boolean;
    z: number;
    props?: Record<string, unknown>;
}

export interface StoredHudSettings {
    autosave: boolean;
    editMode: boolean;
    showGrid: boolean;
    snapToGrid: boolean;
    gridSize: number;
    compactHeader: boolean;
    showDemoBadge: boolean;
    hudOpacity: number;
    glassBlur: number;
    fontScale: number;
    performanceMode: boolean;
    demoMode: boolean;
}

export const loadHudLayout = (): StoredHudWidget[] | null => {
    try {
        const raw = localStorage.getItem(HUD_LAYOUT_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as StoredHudWidget[]) : null;
    } catch (error) {
        console.warn('HUD layout load failed:', error);
        return null;
    }
};

export const saveHudLayout = (layout: StoredHudWidget[]) => {
    localStorage.setItem(HUD_LAYOUT_KEY, JSON.stringify(layout));
};

export const loadHudSettings = (): Partial<StoredHudSettings> | null => {
    try {
        const raw = localStorage.getItem(HUD_SETTINGS_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as Partial<StoredHudSettings>;
    } catch (error) {
        console.warn('HUD settings load failed:', error);
        return null;
    }
};

export const saveHudSettings = (settings: StoredHudSettings) => {
    localStorage.setItem(HUD_SETTINGS_KEY, JSON.stringify(settings));
};

export const exportHudConfig = () => {
    const layout = loadHudLayout() ?? [];
    const settings = loadHudSettings() ?? {};
    return JSON.stringify({ layout, settings }, null, 2);
};

export const importHudConfig = (raw: string) => {
    const parsed = JSON.parse(raw) as {
        layout?: StoredHudWidget[];
        settings?: Partial<StoredHudSettings>;
    };
    if (parsed.layout) {
        saveHudLayout(parsed.layout);
    }
    if (parsed.settings) {
        const merged = {
            ...(loadHudSettings() ?? {}),
            ...parsed.settings,
        } as StoredHudSettings;
        saveHudSettings(merged);
    }
};
