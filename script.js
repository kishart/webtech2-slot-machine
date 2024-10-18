function getRandomInt(max) {
    return Math.floor(Math.random() * max); // Random integer between 0 and max - 1
}

//work the spinning to determine the final number
function spin() {
    const reelElements = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ];

    // Clear previous message
    document.getElementById('message').textContent = "";

    // Spin each reel
    reelElements.forEach((reel) => {
        reel.innerHTML = ''; // Clear current content
        let spins = 20; // Number of spins
        let currentSpin = 0;

        const interval = setInterval(() => {
            const randomNumber = getRandomInt(7); // Random number between 0 and 6
            const numDiv = document.createElement('div');
            numDiv.textContent = randomNumber;
            reel.appendChild(numDiv);

            if (reel.children.length > 3) {
                reel.removeChild(reel.firstChild); // Keep last three numbers
            }
            currentSpin++;

            if (currentSpin >= spins) {
                clearInterval(interval);
                showFinalNumber(reel, getFinalNumber()); 
            }
        }, 100);
    });

    setTimeout(checkResult, 2400); 
}

// generate a random integer between 1 and 7
function getFinalNumber() {
    return Math.round(Math.random() * 6) + 1; 
}

//show the final number
function showFinalNumber(reel, number) {
    reel.innerHTML = ''; 
    const finalDiv = document.createElement('div');
    finalDiv.textContent = number;
    reel.appendChild(finalDiv);
    finalDiv.style.padding = '50px 0'; 
}

//check the result
function checkResult() {
    const reelElements = [
        document.getElementById('reel1'),
        document.getElementById('reel2'),
        document.getElementById('reel3')
    ];

    const results = reelElements.map(reel => parseInt(reel.children[0].textContent));

    const messageElement = document.getElementById('message');
    messageElement.className = ''; // Clear previous classes

    // Check if at least one reel shows "7"
    if (results.includes(7)) {
        messageElement.textContent = "🎉 You Win! 🎉";
        messageElement.classList.add('win'); // Add win class
    } else {
        messageElement.textContent = "Try Again!😢";
        messageElement.classList.add('try-again'); // Add try-again class
    }
}
