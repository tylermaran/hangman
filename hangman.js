// allows for user input
var inquirer = require("inquirer");
// Clears the terminal
var clear = require('clear');

var hangmanImage = [
	" ______\n|     |\n|     \n|     \n|     \n|________\n ||    ||",
	" ______\n|     |\n|     O\n|     \n|     \n|________\n ||    ||",
	" ______\n|     |\n|     O\n|     |\n|     \n|________\n ||    ||",
	" ______\n|     |\n|     O\n|    -|\n|     \n|________\n ||    ||",
	" ______\n|     |\n|     O\n|    -|-\n|     \n|________\n ||    ||",
	" ______\n|     |\n|     O\n|    -|-\n|    / \n|________\n ||    ||",
	" ______\n|     |\n|     O\n|    -|-\n|    / \\" + "\n|________\n ||    ||\n"
]

var winLoss = {
	win: 0,
	loss: 0,
	wonGame: false,
	message: 0
}

var messageText = [
	"",
	"Sorry, that is not a single letter! Guess again.",
	"Correct Guess",
	"Nope! Not a letter"
]

var game =0;

// create the wordify constructor
var Wordify = function(word) {
	this.word = word;

	this.letters = word.length;

  	this.blankArray = [];

	this.letterArray = word.split('');

	for (var i = 0; i < this.letters; i++) {
		this.blankArray.push(" _ ");
	}

	this.guessnumber = 0;
	this.letterGuess = "";
	this.correctGuess = 0;
	this.hangedMan = 0;
}

// establish the wordbank
var wordbank = ["elephant", "plant", "vase", "computer", "guitar"];

// lauch the game
function newgame() {
	game++;
	var rand = Math.floor((Math.random() * (wordbank.length - 1)));
	var word = new Wordify(wordbank[rand]);

	// runs inquire function to allow user guess
	guess(word);
}

// Logs out the hint and the hangman image
function guess(word){
	clear();
	// checks to see if game lost
	if (word.hangedMan === 6) {
		winLoss.wonGame = false;
		winLoss.loss++;
		return(playAgain());
	}
	console.log("------------------------------------------");
	console.log("Game: " + game + ".  Your Score is W: " + winLoss.win + "  L: " + winLoss.loss);

	console.log(messageText[winLoss.message])
	console.log(hangmanImage[word.hangedMan]);

	console.log("Hint: " + word.blankArray + "\n");

 
	// Basic inquirer prompt
	inquirer.prompt([
    {
      type: "input",
      message: "Guess a letter:",
      name: "inquireGuess"
    }
    ]).then(function(inquirerResponse) {
		
    	var userInput = inquirerResponse.inquireGuess.toLowerCase().split('');
    	
    	var inputType = typeof userInput[0];



    	// input validation
    	if (isNaN(userInput)) {
	     	if (userInput.length === 1) {
	     		word.letterGuess = userInput[0];
	     		letterCheck(word);
	    	}
		    else {
	    		winLoss.message=1;
	    		word.guessnumber++;
	    		word.hangedMan++;
				return(guess(word));
			}
		}
		else {
    		winLoss.message=1;
    		word.guessnumber++;
    		word.hangedMan++;
    		return(guess(word));
    	}

  	});
}


// Checks the letter array to see if the guessed letter matches
function letterCheck(word){
	// Adds one to the number of guesses
	word.guessnumber++;
	var cycle = 0;
	// Cycle through the letter array to check for matches 
	for (var i = 0; i < word.letters; i++) {
		// if true, add 1 to correct guesses, change out blanks with guessed letter
		
		// Correct guess
		if (word.letterGuess === word.letterArray[i]) {
			winLoss.message=2;
			word.blankArray.splice( i, 1, " " + word.letterArray[i] + " ");
			cycle++;
			word.correctGuess++;
		}
	}
	// no correct letters were guessed
	if (cycle === 0) {
		word.hangedMan++;
		winLoss.message=3;
	}
	// lost game
	if (word.hangedMan === 6) {
		winLoss.wonGame = false;
		winLoss.loss++;
		return(playAgain());
	}
	// won game
	if (word.correctGuess === word.letters) {
		winLoss.wonGame = true;
		winLoss.win++;
		return(playAgain());
	}


	// return to the guess function when done
	return(guess(word));
}

function playAgain() {
	clear();
	newgame();
}

newgame();