type CommonCommandPayload = {
	cmdType: number;
	param: number;
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

export { AutoBuy42mm5, sendCommonCommand };