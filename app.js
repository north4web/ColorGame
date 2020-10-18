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

const reset = () => {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    resetButton.textContent = "New Colors";
    colorDisplay.textContent = pickedColor;
    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.backgroundColor = "black";
        }
    }
    title.style.backgroundColor = "steelblue";
    message.textContent = ""; 
}

//State
let numSquares = 6;
let colors = generateRandomColors(numSquares);
// Choose winning color
let pickedColor = pickColor();

// Select elements
const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const message = document.getElementById("message");
const title = document.querySelector("h1");
const resetButton = document.getElementById("resetButton");
const modeButtons = document.querySelectorAll(".mode");

//====================================
// Main
//====================================

// Update Color Display
colorDisplay.textContent = pickedColor;

// Reset colors button
resetButton.addEventListener("click", reset);

//Mode Buttons
modeButtons.forEach((button) => {
    button.addEventListener("click", function() {
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        this.classList.add("selected");
        if (this.textContent === "Easy") {
            numSquares = 3;
        } else {
            numSquares = 6;
        }
        reset()
    });

});

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

