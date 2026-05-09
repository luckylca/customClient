type CommonCommandPayload = {
	cmdType: number;
	param: number;
};

export type AmmoPurchaseRole = 'hero' | 'infantry';

const HERO_AMMO_OPTIONS = [1, 2, 5, 10, 20] as const;
const INFANTRY_AMMO_OPTIONS = [2, 5, 10, 20, 40] as const;

const isValidAmmoQuantity = (role: AmmoPurchaseRole, quantity: number) => {
	const options = role === 'hero' ? HERO_AMMO_OPTIONS : INFANTRY_AMMO_OPTIONS;
	return options.includes(quantity as never);
};

const purchaseAmmoCommand = (role: AmmoPurchaseRole, quantity: number): boolean => {
	if (!Number.isFinite(quantity) || !isValidAmmoQuantity(role, quantity)) {
		return false;
	}

	return sendCommonCommand({
		cmdType: role === 'hero' ? 2 : 1,
		param: Math.trunc(quantity),
	});
};

const getAmmoPurchaseOptions = (role: AmmoPurchaseRole): readonly number[] => {
	return role === 'hero' ? HERO_AMMO_OPTIONS : INFANTRY_AMMO_OPTIONS;
};

const getAmmoCommandLabel = (role: AmmoPurchaseRole) => role === 'hero' ? '42mm' : '17mm';

const getAmmoPurchaseDescription = (role: AmmoPurchaseRole, quantity: number) => `${getAmmoCommandLabel(role)} ${quantity}发`;

const getAmmoPurchaseSuccessText = (role: AmmoPurchaseRole, quantity: number, nextAmmo: number) =>
	`购买 ${getAmmoPurchaseDescription(role, quantity)}子弹指令已发送（当前子弹：${nextAmmo}）`;

const getAmmoPurchaseFailureText = (role: AmmoPurchaseRole, quantity: number, ammoText: string) =>
	`购买 ${getAmmoPurchaseDescription(role, quantity)}子弹发送失败（当前子弹：${ammoText}）`;

const getAmmoPurchaseUnsupportedText = () => '当前机型不支持补弹';

const getAmmoPurchaseInvalidQuantityText = (role: AmmoPurchaseRole, quantity: number) =>
	`${getAmmoCommandLabel(role)} 不支持购买 ${quantity} 发`;

type HeroDeployModePayload = {
	mode: number;
};

export type RobotPerformanceSelectionPayload = {
	shooter?: number;
	chassis?: number;
	sentry_control?: number;
};

const ipcRenderer = (window as any).require ? (window as any).require('electron').ipcRenderer : null;

const sendCommonCommand = (payload: CommonCommandPayload): boolean => {
	if (!ipcRenderer) {
		console.warn('[AutoTask] ipcRenderer unavailable, cannot send CommonCommand');
		return false;
	}

	ipcRenderer.send('send-common-command', payload);
	return true;
};

const AutoBuy42mm5 = (): boolean => {
	return purchaseAmmoCommand('hero', 5);
};

const AutoBuy17mm20 = (): boolean => {
	return purchaseAmmoCommand('infantry', 20);
};

const AutoResurrection = (): boolean => {
	return sendCommonCommand({
		cmdType: 3,
		param: 1,
	});
};

const AutoBuyResurrection = (): boolean => {
	return sendCommonCommand({
		cmdType: 4,
		param: 1,
	});
};

const sendHeroDeployMode = (payload: HeroDeployModePayload): boolean => {
	if (!ipcRenderer) {
		console.warn('[AutoTask] ipcRenderer unavailable, cannot send HeroDeployModeEventCommand');
		return false;
	}

	ipcRenderer.send('send-hero-deploy-mode', payload);
	return true;
};

const ToggleHeroDeployMode = (currentStatus: number | undefined): { sent: boolean; nextMode: number } => {
	const nextMode = currentStatus === 1 ? 0 : 1;
	return {
		sent: sendHeroDeployMode({ mode: nextMode }),
		nextMode,
	};
};

const sendRobotPerformanceSelection = (payload: RobotPerformanceSelectionPayload): boolean => {
	if (!ipcRenderer) {
		console.warn('[AutoTask] ipcRenderer unavailable, cannot send RobotPerformanceSelectionCommand');
		return false;
	}

	ipcRenderer.send('send-robot-performance-selection', payload);
	return true;
};

export {
	AutoBuy42mm5,
	AutoBuy17mm20,
	AutoResurrection,
	AutoBuyResurrection,
	sendCommonCommand,
	sendHeroDeployMode,
	ToggleHeroDeployMode,
	sendRobotPerformanceSelection,
	purchaseAmmoCommand,
	getAmmoPurchaseOptions,
	getAmmoCommandLabel,
	getAmmoPurchaseDescription,
	getAmmoPurchaseSuccessText,
	getAmmoPurchaseFailureText,
	getAmmoPurchaseUnsupportedText,
	getAmmoPurchaseInvalidQuantityText,
};