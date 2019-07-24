const firePixelsArray = []; //Array linear - todos o pixels estão um do lado do outro
let fireWidth = 80; //Define a largura do fogo
let fireHeigth = 45; //Define a altura do fogo
let debug = false;
const fireColorsPalette = [{ "r" : 7 , "g" : 7 , "b" : 7 }, { "r" : 31 , "g" : 7 , "b" : 7 }, { "r" : 47 , "g" : 15 , "b" : 7 }, { "r" : 71 , "g" : 15 , "b" : 7 }, { "r" : 87 , "g" : 23 , "b" : 7 }, { "r" : 103 , "g" : 31 , "b" : 7 }, { "r" :119 , "g" : 31 , "b" : 7 }, { "r" : 143 , "g" : 39 , "b" : 7 }, { "r" : 159 , "g" : 47 , "b" : 7 }, { "r" : 175 , "g" :63 , "b" : 7 }, { "r" : 191 , "g" : 71 , "b" : 7 }, { "r" : 199 , "g" : 71 , "b" : 7 }, { "r" : 223 , "g" : 79 , "b" :7 }, { "r" : 223 , "g" : 87 , "b" : 7 }, { "r" : 223 , "g" : 87 , "b" : 7 }, { "r" : 215 , "g" : 95 , "b" : 7 }, { "r" :215 , "g" : 95 , "b" : 7 }, { "r" : 215 , "g" : 103 , "b" : 15 }, { "r" : 207 , "g" : 111 , "b" : 15 }, { "r" : 207 , "g" :119 ,"b" : 15 }, { "r" : 207 , "g" : 127 , "b" : 15 }, { "r" : 207 , "g" : 135 , "b" : 23 }, { "r" : 199 , "g" : 135 , "b": 23}, { "r" : 199 , "g" : 143 , "b" : 23 }, { "r" : 199 , "g" : 151 , "b" : 31 }, { "r" : 191 , "g" : 159 , "b" : 31 }, { "r" :191 , "g" : 159 , "b" : 31 }, { "r" : 191 , "g" : 167 , "b" : 39 }, { "r" : 191 , "g" : 167 , "b" : 39 }, { "r" : 191 , "g": 175 , "b" : 47 }, { "r" : 183 , "g" : 175 , "b" : 47 }, { "r" : 183 , "g" : 183 , "b" : 47 }, { "r" : 183 , "g" : 183 , "b" : 55 }, { "r" : 207 , "g" : 207 , "b" : 111 }, { "r" : 223 , "g" : 223 , "b" : 159 }, { "r" : 239 , "g" : 239 , "b" :199 }, { "r" : 255 , "g" : 255 , "b" : 255 }];

function start(){ //Inicialização
	createFireDataStructure();
	createFireSource();

	setInterval(calculateFirePropagation, 50);
}

function createFireDataStructure(){ //Estrutura de dados - Array linear
	const numberOfPixels = fireWidth * fireHeigth;

	//Criando a estrutura e inserindo a intensidade do fogo
	for (let i = 0; i < numberOfPixels; i++) {
		firePixelsArray[i] = 0; //0 é a intensidade do fogo
	}
}

function calculateFirePropagation(){ //Calculo da animação do fogo
	for (let column = 0; column < fireWidth; column++){
		for (let row = 0; row < fireHeigth; row++){
			const pixelIndex = column + (fireWidth * row);

			updateFireIntesityPerPixel(pixelIndex);
		}
	}

	renderFire();
}

function updateFireIntesityPerPixel(currentPixelIndex){
	const belowPixelIndex = currentPixelIndex + fireWidth;

	if (belowPixelIndex >= fireWidth * fireHeigth){
		return;
	}

	const decay = Math.floor(Math.random() * 3);
	const belowPixelFireIntensity = firePixelsArray[belowPixelIndex];
	const newFireIntensity = 
		belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0;

	firePixelsArray[currentPixelIndex - decay] = newFireIntensity;
}

//O fogo não está renderizando de forma gráfica, apenas em estrutura de dados.
function renderFire(){ //Renderização
	let html = '<table cellpadding=0 cellspacing=0>';

	for(let row = 0; row < fireHeigth; row++){
		html += '<tr>';

		for(let column = 0; column < fireWidth; column++){
			const pixelIndex = column + (fireWidth * row);
			const fireIntensity = firePixelsArray[pixelIndex];
			const color = fireColorsPalette[fireIntensity];
			const colorString = `${color.r},${color.g},${color.b}`;

			if (debug === true){
				html += '<td>';
				html += `<div class="pixel-index">${pixelIndex}</div>`;
				html += `<div style  ="color: rgb(${colorString})">${fireIntensity}</div>`;
				html += '</td>';
			}else {
				html += `<td class="pixel" style="background-color: rgb(${colorString})">`;
				html += '</td>';
			}
			

		}

		html += '</tr>';
	}

	html += '</table>';

	document.querySelector('#fireCanvas').innerHTML = html;
}

function createFireSource(){
	for (let column = 0; column <= fireWidth; column++){
		const overflowPixelIndex = fireWidth * fireHeigth;
		const pixelIndex = (overflowPixelIndex - fireWidth) + column;

		firePixelsArray[pixelIndex] = 36;
	}
}

function deleteFireSource(){
	for (let column = 0; column <= fireWidth; column++){
		const overflowPixelIndex = fireWidth * fireHeigth;
		const pixelIndex = (overflowPixelIndex - fireWidth) + column;

		firePixelsArray[pixelIndex] = 0;
	}
}

function increaseFireIntensity(){
	for (let column = 0; column <= fireWidth; column++){
		const overflowPixelIndex = fireWidth * fireHeigth;
		const pixelIndex = (overflowPixelIndex - fireWidth) + column;
		const currentFireIntensity = firePixelsArray[pixelIndex];

		if (currentFireIntensity < 36){
			const increase = Math.floor(Math.random() * 14);
			const newFireIntensity =
				currentFireIntensity + increase >= 36 ? 36 : currentFireIntensity + increase;

			firePixelsArray[pixelIndex] = newFireIntensity;
		}
	}
}

function decreaseFireIntensity(){
	for (let column = 0; column <= fireWidth; column++){
		const overflowPixelIndex = fireWidth * fireHeigth;
		const pixelIndex = (overflowPixelIndex - fireWidth) + column;
		const currentFireIntensity = firePixelsArray[pixelIndex];

		if (currentFireIntensity > 0){
			const decay = Math.floor(Math.random() * 14);
			const newFireIntensity =
				currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0;

			firePixelsArray[pixelIndex] = newFireIntensity;
		}
	}
}

function debugChange(){
	if(debug === false){
		fireWidth = 25;
		fireHeigth = 17;
		debug = true;
	}else{
		fireWidth = 80;
    	fireHeigth = 45;
    	debug = false;
	}

	createFireDataStructure();
	createFireSource();
}

start();