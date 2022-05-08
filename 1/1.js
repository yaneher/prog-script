

	let ranbdomLoc;
	let location1;


	location1 = Math.floor(Math.random() * 5); 

	let location2 = location1 + 1;
	let location3 = location2 + 1;

	let guess;
	let hits = 0;
	let guesses = 0;
	let isSunk = false;
	let rank;


	while (isSunk == false) {

		guess = prompt("Ready, Aim, Fire! (Enter a number 0-6):");

		if (guess < 0 || guess > 6) { alert("Please enter a valid cell number!"); }

		else {  guesses++; 

				if (guess == location1 || guess == location2 || guess == location3) {

					alert("HIT!");
					hits++;

					if (hits == 3) {

						isSunk = true;

						if (guesses == 3) { rank = 'Admiral'}
						else if (guesses == 4) { rank = 'Captain'}
						else if (guesses == 5) { rank = 'Commander'}	
						else if (guesses == 6) { rank = 'Lieutenant'}
						else { rank = 'Ensign'}
							
						alert(`You sank a battleship! (Rank: ${rank})`);

			 		}

				} else { alert("MISS!"); }
			}
	}

