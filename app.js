function Dino(dinoName, dinoWhere, dinoWhen, dinoFact, dinoWeight, dinoHeight, dinoDiet, species) {
	this.species = species || 'Dinosaurs',
	this.name = dinoName,
	this.where = dinoWhere,
    this.when = dinoWhen,
    this.fact = dinoFact,
	this.weight = dinoWeight,
	this.height = dinoHeight,
	this.diet = dinoDiet
}

const triceratops = new Dino('Triceratops','North America','Late Cretaceous','First discovered in 1889 by Othniel Charles Marsh',13000,114,'Herbavor');
const rex = new Dino('Tyrannosaurus Rex','North America','Late Cretaceous','The largest known skull measures in at 5 feet long.',11905,144,'Carnivor');
const anklyosaurus = new Dino('Anklyosaurus','North America','Late Cretaceous','Anklyosaurus survived for approximately 135 million years.',10500,55,'Herbavor');
const brachiosaurus = new Dino('Brachiosaurus','North America','Late Jurasic','An asteroid was named 9954 Brachiosaurus in 1991.',70000,372,'Herbavor');
const stegosaurus = new Dino('Stegosaurus','North America, Europe, Asia','Late Jurasic to Early Cretaceous','The Stegosaurus had between 17 and 22 seperate places and flat spines.',11600,79,'Herbavor');
const elasmosaurus = new Dino('Elasmosaurus','North America','Late Cretaceous','Elasmosaurus was a marine reptile first discovered in Kansas.',16000,59,'Carnivor');
const pteranodon = new Dino('Pteranodon','North America','Late Cretaceous','Actually a flying reptile, the Pteranodon is not a dinosaur.',44,20,'Carnivor');
const pigeon = new Dino('Pigeon','World Wide','Holocene','All birds are living dinosaurs.',0.5,9,'Herbavor','Columbidae');

const human = {
	species: 'Human',	
};

function Human() {
	return (function(data){
		let _name;
		let _height;
		let _weight;
		let _diet;
		
		function readName() {
			_name = document.getElementById('name').value;
			return _name;
		}
		
		function readHeight() {
			const feet = document.getElementById('feet').value;
			const inches = document.getElementById('inches').value;
			_height = parseInt((feet * 12) + inches);
			return _height;
		}
		
		function readWeight() {
			_weight = parseFloat(document.getElementById('weight').value);
			return _weight;
		}
		
		function readDiet() {
			_diet = document.getElementById('diet').value;
			return _diet;
		}

		return {
			name: readName(),
			height: readHeight(),
			weight: readWeight(),
			diet: readDiet()
		};
	}());
}

const all = [triceratops,rex,anklyosaurus,brachiosaurus,human,stegosaurus,elasmosaurus,pteranodon,pigeon];

Dino.prototype.compareHeight = function(other) {
	if (this.height < other.height) {
		return 'smaller than';
	} else if (this.height > other.height) {
		return 'taller than';
	}
	return 'similar in height to';
};

Dino.prototype.compareWeight = function(other) {
	if (this.weight < other.weight) {
		return 'lighter than';
	} else if (this.weight > other.weight) {
		return 'heavier than';
	}
	return 'similar in weight to';
};

Dino.prototype.compareDiet = function(other) {
	if (this.diet === other.diet) {
		return 'similar';
	} 
	return 'different';
};

function hideElementById(id) {
	document.getElementById(id).style.display='none';
}

function getPrettyHeight(height) {
	let feet = Math.floor(height/12);
	let feetString =  feet === 0 ? '' : feet === 1 ? `${feet} foot` : `${feet} feet`;
	let inches = height%12;
	let inchesString = inches === 0 ? '' : inches === 1 ? `${inches} inch` : `${inches} inches`;
	if (feet === 0 && inches === 0) {
		return '';
	} else if (feet === 0) {
		return inchesString;
	} else if (inches === 0) {
		return feetString;
	}
	return `${feetString} and ${inchesString}`;
}

function getRandomDinoFact(dino, human, factIndex) {
	switch (factIndex) {
		case 0:
			return dino.name + ' grew to a weight of ' + dino.weight + ' lbs';
			break;
		case 1:
			return dino.name + ' grew to a height of ' + getPrettyHeight(dino.height);
			break;
		case 2:
			return dino.name + ' had a ' + dino.diet + ' diet';
			break;
		case 3:
			return dino.name + ' roamed ' + dino.where;
			break;
		case 4:
			return dino.name + ' lived during the ' + dino.when;
			break;
		case 5:
			return dino.fact;
			break;
		case 6:
			return dino.name + ' was ' + dino.compareHeight(human) + ' me';
			break;
		case 7:
			return dino.name + ' was ' + dino.compareWeight(human) + ' me';
			break;
		case 8:
			return dino.name + ' and I had a ' + dino.compareDiet(human) + ' diet';
			break;
	}
}

function infographic() {
	
	const grid = document.getElementById('grid');
	
	const factIndex = Math.floor(Math.random() * 9);
	 
	Object.assign(human, new Human());
	
	all.forEach((animal, index) => {
		let fileName;
		if (animal.species === 'Human') {
			fileName = animal.species;
		} else {
			fileName = animal.name;
		}
		const newGridItem = document.createElement('div');
		newGridItem.classList.add('grid-item');
		newGridItem.setAttribute('style', 'padding: 10px');
		
		const newImg = document.createElement('img');
		newImg.src = './images/' + fileName + '.png';
		
		newGridItem.appendChild(document.createTextNode(animal.name));
		newGridItem.appendChild(newImg);
		if (animal.species !== 'Human' && animal.species !== 'Columbidae') {
			newGridItem.appendChild(document.createTextNode(getRandomDinoFact(animal, human, 1)));
		} 
		if (animal.species === 'Columbidae') {
			newGridItem.appendChild(document.createTextNode(getRandomDinoFact(animal, human, 5)));
		}
		
		grid.appendChild(newGridItem);
	});	
	
	hideElementById('dino-compare');
}

const btn = document.getElementById('btn');
btn.addEventListener('click',infographic);
