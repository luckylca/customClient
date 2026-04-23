type CommonCommandPayload = {
	cmdType: number;
	param: number;
};

type HeroDeployModePayload = {
	mode: number;
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

export { AutoBuy42mm5, AutoBuy17mm20, sendCommonCommand, sendHeroDeployMode, ToggleHeroDeployMode };