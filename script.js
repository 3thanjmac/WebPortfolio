document.addEventListener("DOMContentLoaded", () => {
	console.log("LOADED!!!");

	renderMatrixRain();
});

const matrixWorker = new Worker('matrix.js');

function renderMatrixRain() {
	const matrixCanvas = document.getElementById('MatrixRain');
	const matrixOffscreen = matrixCanvas.transferControlToOffscreen();

	matrixWorker.postMessage({command: "initCanvas", payload: {matrixCanvas: matrixOffscreen, width: window.innerWidth, height: window.innerHeight}}, [matrixOffscreen]);
}

function resizeCanvas() {
	let canvas = document.getElementById('MatrixRain');
	matrixWorker.postMessage({command: "resizeCanvasOffscreen", payload: {width: window.innerWidth, height: window.innerHeight}});
}

window.addEventListener('resize', resizeCanvas);