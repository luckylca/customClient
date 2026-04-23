type CommonCommandPayload = {
	cmdType: number;
	param: number;
};

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
	return sendCommonCommand({
		cmdType: 2,
		param: 5,
	});
};

const AutoBuy17mm20 = (): boolean => {
	return sendCommonCommand({
		cmdType: 1,
		param: 20,
	});
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

export { AutoBuy42mm5, AutoBuy17mm20, AutoResurrection, AutoBuyResurrection, sendCommonCommand, sendHeroDeployMode, ToggleHeroDeployMode, sendRobotPerformanceSelection };