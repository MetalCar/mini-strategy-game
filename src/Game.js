var gameWindow = document.getElementById("game");

var state;

var gameState = localStorage.getItem("game_state");
if (gameState === null) {
    state = {
        clicked: false,
        gameObjects: [],
        woodCount: 25,
        boardSize: {
            x: 10,
            y: 16
        }
    };
} else {
    state = JSON.parse(gameState);
}

var boardGenerator = new BoardGenerator();
var woodCountElement = document.getElementById("woodCount");

function initialize() {
    gameWindow.innerHTML = boardGenerator.generate(state.boardSize);
}

function update(progress) {
    // Update the state of the world for the elapsed time since last render
    if (state.clicked) {
        var lumberCamp = new LumberCamp(state.clickedObj.y, state.clickedObj.x);
        if (state.woodCount >= lumberCamp.cost) {
            state.gameObjects.push(lumberCamp);
            state.woodCount -= lumberCamp.cost;
        }
    }

    state.gameObjects.forEach(function(value) {
        if (value.type == "LumberCamp") {
            value = new LumberCamp(0, 0, value);
        }

        value.generateWood();
    });
}

function draw() {
    // Draw the state of the world
    woodCountElement.innerHTML = "Wood: " + parseInt(state.woodCount);

    state.gameObjects.forEach(function(value) {
        document.getElementById("tile_" + value.y + "_" + value.x).innerHTML = value.label;
    });
}

function loop(timestamp) {
    var progress = timestamp - lastRender;

    update(progress);
    draw();

    localStorage.setItem("game_state", JSON.stringify(state));

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
initialize();
window.requestAnimationFrame(loop);

window.addEventListener("mousedown", function(e) {
    if (e.target.className !== "tile") {
        return;
    }

    state.clicked = true;

    state.clickedObj = {
        element: e.target,
        x: e.target.attributes["data-x"].value,
        y: e.target.attributes["data-y"].value,
    };
}, false);


window.addEventListener("mouseup", function(e) {
    state.clickedObj = null;
    state.clicked = false;
}, false);