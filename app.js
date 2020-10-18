


//====================================
// Helper Functions
//====================================

const pickColor = () => {
    // Get random number between 0 and 5, inclusive
    const random = Math.floor(Math.random() * colors.length)
    // Return colors of that random number
    return colors[random]
}
// Generate random colors for array

const generateRandomColor = () => {
    // Pick r, g, b values between 0 & 255

    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}
// if we want to extend the game in the future we will do this to chose betweehn 3 or 6 squares
const generateRandomColors = (num) => {
    // Make an array
    let output = [];
    // Add num random colors to array
    for (let i = 0; i < num; i++) {
        output.push(generateRandomColor())
    }
    // Return array
    return output
}

//create a function to set all the squares to correct color
const changeColors = (color) => {
    squares.forEach((square) => {
        square.style.backgroundColor = color
    })
    }

//====================================
// Init Variables
//====================================

// -OLD- Constant declarations

// const colors = [
//     "rgb(255, 0, 0)",
//     "rgb(0, 255, 0)",
//     "rgb(0, 0, 255)",
//     "rgb(255, 0, 255)",
//     "rgb(255, 255, 0)",
//     "rgb(0, 255, 255)"
// ];

//State
let numSquares = 6;


// Select elements
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const message = document.getElementById("message");
const title = document.querySelector("h1");
const resetButton = document.getElementById("resetButton");
const easyButton = document.getElementById("easyButton");
const hardButton = document.getElementById("hardButton");

let colors = generateRandomColors(numSquares);
// Choose winning color
let pickedColor = pickColor();

//====================================
// Main
//====================================

// Update Color Display
colorDisplay.textContent = pickedColor;

// Reset colors button
resetButton.addEventListener("click", function() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    message.textContent = "";
    this.textContent = "New Colors";
    title.style.backgroundColor = "black";
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
})


//easy button
easyButton.addEventListener("click", function() {
    this.classList.add("selected");
    hardButton.classList.remove("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
})

//hard button
hardButton.addEventListener("click", function() {
    this.classList.add("selected");
    easyButton.classList.remove("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
    }
})

// Set up squares
for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    // Add click listeners
    squares[i].addEventListener("click", function() {
        // Get the color of the clicked square
        const clickedColor = this.style.backgroundColor;
        
        //Compare that color to pickedColor
        if (clickedColor === pickedColor) {
            // add the try again/correct message when the square is clicked
            message.textContent = "Correct!";
            //set all the squares to correct color
            changeColors(pickedColor);
            title.style.backgroundColor = pickedColor;
            resetButton.textContent = "Play Again?"
        }   else {
            //Fade out the incorrect div when clicked
            this.style.backgroundColor = "black";
            // add the try again/correct message when the square is clicked
            message.textContent = "Try Again!"
            
        }
    })
};

