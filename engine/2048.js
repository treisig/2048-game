import Game from "./game.js";
import View from "./view.js";

let game = null;
let view = null;

$(document).ready(() => {
  game = new Game(4);
  view = new View(game);

  const winModal = () => {
    $("#winModal").addClass("is-active");
  };
  const loseModal = () => {
    $("#loseModal").addClass("is-active");
  };

  $("#loseClose").on("click", () => {
    $("#loseModal").removeClass("is-active");
    resetFunction();
  });

  $("#winClose").on("click", () => {
    $("#winModal").removeClass("is-active");
  });

  // on move updates the view
  game.onMove(view.updateValues);
  game.onMove(view.updateScore);
  game.onWin(winModal);
  game.onLose(loseModal);

  const resetFunction = function () {
    game.setupNewGame();
    view.updateValues(game.getGameState());
    view.updateScore(game.getGameState());
    game.onMove(view.updateValues);
    game.onMove(view.updateScore);
    game.onWin(winModal);
    game.onLose(loseModal);
  };

  // resets the game and re-adds the listeners
  $(`#newGameButton`).on("click", resetFunction);

  $(document).on("keydown", (event) => {
    switch (event.which) {
      case 39:
        game.move("right");
        break;
      case 37:
        game.move("left");
        break;
      case 40:
        game.move("down");
        break;
      case 38:
        game.move("up");
        break;
    }
  });
});
