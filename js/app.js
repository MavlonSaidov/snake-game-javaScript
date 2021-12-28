document.addEventListener('DOMContentLoaded', () => {
	const scoreDisplay = document.querySelector('span');
	const startBtn = document.querySelector('.start-btn');
	const upBtn = document.querySelector('.up-btn');
	const downBtn = document.querySelector('.down-btn');
	const leftBtn = document.querySelector('.left-btn');
	const rightBtn = document.querySelector('.right-btn');
	const grid = document.querySelector('.grid');

	const width = 15;
	let currentIndex = 0; // so first div in our grid
	let appleIndex = 0; // so first div in our grid
	let currentSnake = [2, 1, 0] // so the div in our grid being 2 (or the Head), and 0 being the end or (Tail with all 1's being the body for now on)
	let direction = 1;
	let score = 0;
	let speed = 0.98;
	let intervalTime = 0;
	let interval = 0;

	for (let i = 0; i < 225; i++) {
		const square = document.createElement('div')
		grid.appendChild(square)
	}

	const squares = document.querySelectorAll('.grid div');


	// to start and restart the game
	function startGame() {
		currentSnake.forEach(index => squares[index].classList.remove('snake'))
		squares[appleIndex].classList.remove('apple');
		clearInterval(interval);
		score = 0;
		randomApple()
		direction = 1;
		scoreDisplay.innerText = score;
		intervalTime = 450;
		currentSnake = [2, 1, 0];
		currentIndex = 0;
		currentSnake.forEach(index => squares[index].classList.add('snake'))
		interval = setInterval(moveOutComes, intervalTime)
	}

	// function that deals with ALL the move outcomes of the Snake
	function moveOutComes() {
		// deals with snake hitting border and snake hitting self 

		if (
			(currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
			(currentSnake[0] % width === width - 1 && direction === 1) || //if snake hits right wall
			(currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
			(currentSnake[0] - width < 0 && direction === -width) || //if snake hits top
			squares[currentSnake[0] + direction].classList.contains('snake') // if snake goes into itself
		) {
			return clearInterval(interval) // this wil clear the interval if any of the above happen
		}

		const tail = currentSnake.pop(); // removes last item of the array and shows it
		squares[tail].classList.remove('snake');
		currentSnake.unshift(currentSnake[0] + direction) // gives direction to the head of the array


		// deals with snake  getting apple
		if (squares[currentSnake[0]].classList.contains('apple')) {
			squares[currentSnake[0]].classList.remove('apple')
			squares[tail].classList.add('snake')
			currentSnake.push(tail)
			randomApple()
			score++
			scoreDisplay.textContent = score;
			clearInterval(interval)
			intervalTime = intervalTime * speed
			interval = setInterval(moveOutComes, intervalTime)
		}
		squares[currentSnake[0]].classList.add('snake');
	}

	//generate new apple once apple is eaten
	function randomApple() {
		do {
			appleIndex = Math.floor(Math.random() * squares.length)
		} while (squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
		squares[appleIndex].classList.add('apple')
	}


	//assign functions to keycodes
	function control(e) {
		squares[currentIndex].classList.remove('snake')

		if (e.keyCode === 39) {
			direction = 1 // if we press the right arrow on our keyboard, the snake will go right one
		} else if (e.keyCode === 38) {
			direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
		} else if (e.keyCode === 37) {
			direction = -1; // if we press left, the snake will go left one div
		} else if (e.keyCode === 40) {
			direction = +width; // if we press down, the snake head will instantly appear in the divs from where you are now
		}
	}

	document.addEventListener('keyup', control)
	startBtn.addEventListener('click', startGame)

	upBtn.addEventListener('click', () => direction = -width)
	downBtn.addEventListener('click', () => direction = +width)
	leftBtn.addEventListener('click', () => direction = -1)
	rightBtn.addEventListener('click', () => direction = 1)
});