/**
* @description Represents a dinosaur
* @constructor
* @param {string} dinoName - The name or species of the dinosaur
* @param {string} dinoWhere - Where the dinosaur roamed
* @param {string} dinoWhen - What period the dinosaur lived in
* @param {string} dinoFact - A fun fact about the dinosaur
* @param {number} dinoWeight - How much the dinosaur weighed
* @param {number} dinoHeight - The dinosaur height
* @param {string} dinoDiet - The dinosaur diet
* @param {string} dinoDiet - The dinosaur diet
*/
function Dino(dinoName, dinoWhere, dinoWhen, dinoFact, dinoWeight, dinoHeight, dinoDiet) {
	this.name = dinoName,
	this.where = dinoWhere,
    this.when = dinoWhen,
    this.fact = dinoFact,
	this.weight = dinoWeight,
	this.height = dinoHeight,
	this.diet = dinoDiet
}

/**
* @description Represents a human. The constructor uses IIFE to hide data and returns an object with state that is taken from the user input
* @constructor
*/
function Human() {
	return (function(){
		let _name;
		let _height;
		let _weight;
		let _diet;
		
		function readName() {
			_name = document.getElementById('name').value;
			return _name;
		}
		
		function readHeight() {
			const feet = document.getElementById('feet').value || 0;
			const inches = document.getElementById('inches').value || 0;
			_height = parseInt((feet * 12) + inches);
			return _height;
		}
		
		function readWeight() {
			_weight = parseFloat(document.getElementById('weight').value) || 0;
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

/**
* @description A method of the Dino class that compares hieghts
* @param {number} other - The height of the object to compare this dinosaur to
*/
Dino.prototype.compareHeight = function(other) {
	if (this.height < other.height) {
		return 'smaller than';
	} else if (this.height > other.height) {
		return 'taller than';
	}
	return 'similar in height to';
};

/**
* @description A method of the Dino class that compares wieghts
* @param {number} other - The wieght of the object to compare this dinosaur to
*/
Dino.prototype.compareWeight = function(other) {
	if (this.weight < other.weight) {
		return 'lighter than';
	} else if (this.weight > other.weight) {
		return 'heavier than';
	}
	return 'similar in weight to';
};

/**
* @description A method of the Dino class that compares diets
* @param {string} other - The diet of the object to compare this dinosaur to
*/
Dino.prototype.compareDiet = function(other) {
	if (this.diet.toLowerCase() === other.diet.toLowerCase()) {
		return 'similar';
	} 
	return 'different';
};

/**
* @description Create a grid from ac ollection of dinosaurs from an input file and one human to represent the user input
* @returns {number[]} A collection of species
*/
function buildGrid(allSpecies, grid) {
	
	allSpecies.forEach((animal) => {
		let human = allSpecies[4];
		let fileName;
		if (animal.isHuman) {
			fileName = 'human';
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
		if (animal.name === 'Pigeon') {
			newGridItem.appendChild(document.createTextNode(getRandomDinoFact(animal, human, 5)));
		} else if (!animal.isHuman) {
			const factIndex = Math.floor(Math.random() * 9);
			newGridItem.appendChild(document.createTextNode(getRandomDinoFact(animal, human, factIndex)));
		}
		
		grid.appendChild(newGridItem);
	})
}

/**
* @description Hide an HTML element by setting its style display property to none
*/
function hideElementById(id) {
	document.getElementById(id).style.display='none';
}

/**
* @description A function to pretty print the number values from inches as a number to a string in ffet and inches 
* @returns {string} A formatted string representing the height in feet and inches
*/
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

/**
* @description A function to build a string that is a fact about a specific dinosaur or a comparison fact to the user input human
* @param {Dino} dino - the dino oject 
* @param {Human} human - the human object
* @param {number} factIndex - A number used to pick 1 of 9 facts
* @returns {string} A formatted string representing the fact
*/
function getRandomDinoFact(dino, human, factIndex) {
	switch (factIndex) {
		case 0:
			return dino.name + ' grew to a weight of ' + dino.weight + ' lbs';
		case 1:
			return dino.name + ' grew to a height of ' + getPrettyHeight(dino.height);
		case 2:
			return dino.name + ' had a ' + dino.diet + ' diet';
		case 3:
			return dino.name + ' roamed ' + dino.where;
		case 4:
			return dino.name + ' lived during the ' + dino.when;
		case 5:
			return dino.fact;
		case 6:
			return dino.name + ' was ' + dino.compareHeight(human) + ' me';
		case 7:
			return dino.name + ' was ' + dino.compareWeight(human) + ' me';
		case 8:
			return dino.name + ' and I had a ' + dino.compareDiet(human) + ' diet';
	}
}

/**
* @description A function that initializes the data model, displays the infographic and hides the form
* @callback
* @param {Dino} dino - the dino oject 
* @param {Human} human - the human object
* @param {number} factIndex - A number used to pick 1 of 9 facts
* @returns {string} A formatted string representing the fact
*/
function infographic() {
	
	const grid = document.getElementById('grid');
	
	const human = Object.assign({ isHuman: true }, new Human());
	
	fetch('https://raw.githubusercontent.com/udacity/Javascript/master/dino.json')
		.then(response => response.json())
		.then(json => json.Dinos.map(dino => new Dino(dino.species,dino.where,dino.when,dino.fact,dino.weight,dino.height,dino.diet)))
		.then(allSpecies => {
			allSpecies.splice(4, 0, human);
			return allSpecies;
		})
		.then(allSpecies => buildGrid(allSpecies, grid))
		.then(hideElementById('dino-compare'));
		
}

const btn = document.getElementById('btn');
btn.addEventListener('click',infographic);
