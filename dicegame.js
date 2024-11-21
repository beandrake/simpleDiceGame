
function numberToTwoDigitString(num)
{
	let padding = (num < 10) ? '0' : '';
	return padding + num.toString();
}


class Dice 
{
	constructor(id)
	{
		this.element = document.getElementById(id);
		this.value = -1;
	}

	roll()
	{
		// generates a random number from 1 to 6
		this.value = Math.floor( Math.random()*6 ) + 1;
		this.#updateDiceImage();	
		return this.value;
	}

	set(diceValue)
	{
		this.value = diceValue;
		this.#updateDiceImage();
	}

	increment()
	{
		this.value = this.value < 6 ? this.value+1 : 1;
		this.#updateDiceImage();
	}

	#updateDiceImage()
	{
		// update corresponding dice image
		let diceImage = this.#getDiceImage(this.value);
		this.element.src = diceImage;
	}

	#getDiceImage(diceValue) 
	{
		const diceImagePathFront = './images/dice'
		const diceImagePathBack =  '.png'
		return diceImagePathFront + diceValue + diceImagePathBack;
	}
}


class DiceGame 
{
	constructor(numberOfDice) 
	{
		this.diceList = []

		for (let currentDice = 1; currentDice <= 2; currentDice++)
		{
			// generate corresponding HTML id to initialize Dice objects that we store in a list
			let twoDigitString = numberToTwoDigitString(currentDice);
			let currentID = 'dice' + twoDigitString;
			this.diceList.push( new Dice(currentID) );
		}
	}

	rollAllDice()
	{
		for (let index in this.diceList)
		{
			var currentDice = this.diceList[index]
			currentDice.roll()
		}
	}

	aestheticRoll(numberOfFaceChangesLeft, millisecondsBetweenChanges) 
	{
		// change faces once
		for (let index in this.diceList)
		{
			var currentDice = this.diceList[index]
			// incrementing guarantees a face change; random rolls do not
			var value = currentDice.increment()
		}

		// if we're not done, delay and recursion
		if (numberOfFaceChangesLeft > 0)
		{
			//console.log(numberOfFaceChangesLeft);			
			setTimeout(
				() => {this.aestheticRoll(numberOfFaceChangesLeft-1, millisecondsBetweenChanges);}
				, millisecondsBetweenChanges
			);
		} 
		else
		{
			// Base case: roll the final, actually random roll
			this.rollAllDice();

			// decide the winner based on result (only works for 2 players)
			const dice01 = this.diceList[0];
			const dice02 = this.diceList[1];
		
			const headingElement = document.getElementById('bigwords');

			if (dice01.value > dice02.value){
				headingElement.textContent = "Winner: Player 1!"
			} else if (dice01.value < dice02.value) {
				headingElement.textContent = "Winner: Player 2!"
			} else {
				headingElement.textContent = "Result: Draw!"
			}
		}
	}

	playGame() 
	{		
		const headingElement = document.getElementById('bigwords');
		headingElement.textContent = "Rolling Dice..."

		// randomize starting point for each dice
		this.rollAllDice();

		const diceRollDuration = 500;	//milliseconds
		const numberOfFaceChanges = 6;
		const millisecondsBetweenChanges = diceRollDuration / numberOfFaceChanges;

		this.aestheticRoll(numberOfFaceChanges, millisecondsBetweenChanges);
	}
}





const diceGame = new DiceGame(2);

function buttonClicked()
{
	diceGame.playGame();
}
const buttonElement = document.getElementById('roll-button');
buttonElement.addEventListener('click', buttonClicked);

/////////////////////////////////////////////////////


