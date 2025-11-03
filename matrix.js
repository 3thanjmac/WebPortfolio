let canvas = null;
let context = null;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;
const fontSize = 16;

let columns;
let rainDrops = [];

onmessage = (e) => {
	const {command, payload} = e.data;

	if (command === "resizeCanvasOffscreen") {
		resizeCanvasOffscreen(payload.width, payload.height);
	}

	if (command === "initCanvas") {
		canvas = payload.matrixCanvas;
		context = canvas.getContext('2d');
		columns = payload.width/fontSize;

		for( let x = 0; x < columns; x++ ) {
			rainDrops[x] = 1;
		}

		resizeCanvasOffscreen(payload.width, payload.height);
		setInterval(draw, 30);
	}
}

function resizeCanvasOffscreen(setWidth, setHeight) {
	if (canvas == null)
		return;
	canvas.width = setWidth;
	canvas.height = setHeight;
	context.fillStyle = 'rgb(0, 0, 0)';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

const draw = () => {
	context.fillStyle = 'rgba(0, 0, 0, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = '#0F0';
	context.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = alphabet.charAt(Math.round(Math.random() * alphabet.length));
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
			rainDrops[i] = 0;
		}
		rainDrops[i]++;
	}
};