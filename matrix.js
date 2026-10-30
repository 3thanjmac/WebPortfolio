let canvas = null;
/** @type CanvasRenderingContext2D */
let context = null;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;
const fontSize = 16;
const inverseDensity = 500; // smaller = more dense

let columns;
/** @type number[][] */
let rainDrops = [];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const draw = () => {
	context.fillStyle = 'rgba(0, 0, 0, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = '#0F0';
	context.font = fontSize + 'px monospace';

	for (let i = 0; i < rainDrops.length; i++) {
		for (let j = 0; j < rainDrops[i].length; j++) {
			const drop = rainDrops[i][j];

			if (drop > 0) {
				const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
				context.fillText(text, i * fontSize, drop * fontSize);

				if (drop * fontSize > canvas.height && Math.random() > 0.975) {
					rainDrops[i][j] = 0;
				}
			}

			rainDrops[i][j]++;
		}
	}
};

onmessage = (e) => {
	const { command, payload } = e.data;

	if (command === "resizeCanvasOffscreen") {
		resizeCanvasOffscreen(payload.width, payload.height);
	}

	if (command === "initCanvas") {
		canvas = payload.matrixCanvas;
		context = canvas.getContext('2d');
		columns = payload.width / fontSize;

		const charsPerColumn = payload.height / inverseDensity;

		for (let x = 0; x < columns; x++) {
			const seed = [1];

			for (let i = 0; i < charsPerColumn; i++) {
				seed.push(-(50 + Math.random() * payload.height));
			}

			rainDrops[x] = seed;
		}

		resizeCanvasOffscreen(payload.width, payload.height);
		setInterval(draw, 30);
	}
}

function resizeCanvasOffscreen(setWidth, setHeight) {
	if (!canvas) {
		return;
	}

	canvas.width = setWidth;
	canvas.height = setHeight;
	context.fillStyle = 'rgb(0, 0, 0)';
	context.fillRect(0, 0, canvas.width, canvas.height);
}