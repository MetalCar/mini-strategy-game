var BoardGenerator = function () {
};

BoardGenerator.prototype.generate = function generate(boardSize) {
    var boardOutput = "";

    for (i = 0; i < boardSize.y; i++) {
        boardOutput = boardOutput + "<div>";
        for (j = 0; j < boardSize.x; j++) {
            boardOutput = boardOutput + '<div class="tile" id="tile_' + i + '_' + j + '" data-x="' + j + '" data-y="' + i + '"></div>';
        }
        boardOutput = boardOutput + "</div>";
    }


    return boardOutput;
};