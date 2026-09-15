const gameBoard = document.getElementById("game-board");

const flexDirection = document.getElementById("flex-direction");
const justifyContent = document.getElementById("justify-content");
const alignItems = document.getElementById("align-items");
const flexWrap = document.getElementById("flex-wrap");

const checkButton = document.getElementById("check-btn");
const resetButton = document.getElementById("reset-btn");
const previousButton = document.getElementById("previous-btn");
const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
let attempts = 0;

const levelTitle = document.getElementById("level-title");
const levelInstruction = document.getElementById("level-instruction");

let currentLevel = 0;

const levels = [
    {
        instruction: "Arrange the candies in a row at the center of the board.",
        direction: "row",
        justify: "center",
        align: "center",
        wrap: "nowrap"
    },
    {
        instruction: "Arrange the candies in a row with equal space between them at the top.",
        direction: "row",
        justify: "space-between",
        align: "flex-start",
        wrap: "nowrap"
    },
    {
        instruction: "Arrange the candies in a column at the bottom-right of the board.",
        direction: "column",
        justify: "flex-end",
        align: "flex-end",
        wrap: "nowrap"
    },
    {
        instruction: "Arrange the candies in a reversed row at the bottom of the board.",
        direction: "row-reverse",
        justify: "flex-start",
        align: "flex-end",
        wrap: "nowrap"
    },
    {
        instruction: "Arrange the candies from bottom to top and center them horizontally.",
        direction: "column-reverse",
        justify: "flex-start",
        align: "center",
        wrap: "nowrap"
    },
    {
        instruction: "Wrap the candies onto multiple lines and center them.",
        direction: "row",
        justify: "center",
        align: "center",
        wrap: "wrap"
    }
];

function updateBoard() {
    gameBoard.style.flexDirection = flexDirection.value;
    gameBoard.style.justifyContent = justifyContent.value;
    gameBoard.style.alignItems = alignItems.value;
    gameBoard.style.flexWrap = flexWrap.value;
}

flexDirection.addEventListener("change", updateBoard);
justifyContent.addEventListener("change", updateBoard);
alignItems.addEventListener("change", updateBoard);
flexWrap.addEventListener("change", updateBoard);

function resetLevel() {
    flexDirection.value = "row";
    justifyContent.value = "flex-start";
    alignItems.value = "stretch";
    flexWrap.value = "nowrap";

    message.textContent = "";
    attempts = 0;
    attemptsText.textContent = "Attempts: 0";

    updateBoard();
}

function loadLevel() {
    levelTitle.textContent =
        "Level " + (currentLevel + 1) + " of " + levels.length;

    levelInstruction.textContent =
        levels[currentLevel].instruction;

    if (currentLevel === 5) {
        gameBoard.innerHTML = `
            <div class="candy">🍭</div>
            <div class="candy">🍬</div>
            <div class="candy">🍫</div>
            <div class="candy">🍩</div>
            <div class="candy">🍪</div>
            <div class="candy">🧁</div>
            <div class="candy">🍰</div>
            <div class="candy">🍡</div>
            <div class="candy">🍭</div>
            <div class="candy">🍬</div>
        `;
    } else {
        gameBoard.innerHTML = `
            <div class="candy">🍭</div>
            <div class="candy">🍬</div>
            <div class="candy">🍫</div>
        `;
    }

    resetLevel();
}

checkButton.addEventListener("click", function () {
    const level = levels[currentLevel];
    attempts++;
    attemptsText.textContent = "Attempts: " + attempts;

    if (
        flexDirection.value === level.direction &&
        justifyContent.value === level.justify &&
        alignItems.value === level.align &&
        flexWrap.value === level.wrap
    ) {
        message.textContent = "🎉 Correct! Great job!";

        if (currentLevel < levels.length - 1) {
            currentLevel++;

            setTimeout(function () {
                loadLevel();
            }, 1000);
        } else {
            message.textContent =
                "🏆 Congratulations! You completed Candy Flex!";
        }

    } else {
        message.textContent = "❌ Not quite. Try again!";
    }
});

resetButton.addEventListener("click", function () {
    resetLevel();
});

previousButton.addEventListener("click", function () {
    if (currentLevel > 0) {
        currentLevel--;
        loadLevel();
    }
});

loadLevel();