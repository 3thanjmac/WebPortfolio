document.addEventListener("DOMContentLoaded", () => {
	console.log("LOADED!!!");

	renderMatrixRain();

	const resizeObserver = new ResizeObserver(resizeCanvas);
	resizeObserver.observe(document.body);
});

const matrixWorker = new Worker('matrix.js');

function renderMatrixRain() {
	const matrixCanvas = document.getElementById('MatrixRain');
	const matrixOffscreen = matrixCanvas.transferControlToOffscreen();

	matrixWorker.postMessage({ command: "initCanvas", payload: { matrixCanvas: matrixOffscreen, width: document.body.offsetWidth, height: document.body.offsetHeight } }, [matrixOffscreen]);
}

function resizeCanvas() {
	matrixWorker.postMessage({ command: "resizeCanvasOffscreen", payload: { width: document.body.offsetWidth, height: document.body.offsetHeight } });
}
