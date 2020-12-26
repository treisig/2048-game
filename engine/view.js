export default class View {
  constructor(model) {
    this.model = model;
    this.listeners = [];
    this.div = $("#gameBoard");
    this.div.addClass("board");

    // initializes the board's view

    // make rows of 4/boardsize
    // append the rows to the div
    const currBoard = this.model.gameState.board;

    const rowNum = this.model.boardSize;
    let i = 0;
    for (let j = 0; j < rowNum; j++) {
      let row = $(`<div> </div>`);
      row.addClass(`row`);
      // add cells together into a row
      while (i % rowNum < rowNum - 1) {
        const cell = $(
          `<div> ${currBoard[i] === 0 ? "" : currBoard[i]} </div>`
        );
        cell.attr("id", `cell${i}`);
        cell.addClass("cell");

        // chooses the color of the tile

        switch (currBoard[i]) {
          case 0:
            cell.css("background-color", "#25A18E");
            break;
          case 2:
            cell.css("background-color", "#830A48");
            break;
          case 4:
            cell.css("background-color", "#FE7F2D");
            break;
          case 8:
            cell.css("background-color", "#7D82B8");
            break;
          case 16:
            cell.css("background-color", "#613F75");
            break;
          case 32:
            cell.css("background-color", "#7ae582");
            break;
          case 64:
            cell.css("background-color", "#EF798A");
            break;
          case 128:
            cell.css("background-color", "#7CA982");
            break;
          case 256:
            cell.css("background-color", "#AA5042");
            break;
          case 512:
            cell.css("background-color", "#004E64");
            break;
          case 1024:
            cell.css("background-color", "#25A18E");
            break;
          case 2048:
            cell.css("background-color", "#FAB2EA");
            break;
          case 5096:
            cell.css("background-color", "#25A18E");
            break;
          case 10192:
            cell.css("background-color", "#25A18E");
            break;
        }
        row.append(cell);
        i++;
      }
      // adds the last cell in the rpw
      const cell = $(`<div> ${currBoard[i] === 0 ? "" : currBoard[i]} </div>`);
      cell.attr("id", `cell${i}`);
      cell.addClass("cell");
      switch (currBoard[i]) {
        case 0:
          cell.css("background-color", "#25A18E");
          break;
        case 2:
          cell.css("background-color", "#830A48");
          break;
        case 4:
          cell.css("background-color", "#FE7F2D");
          break;
        case 8:
          cell.css("background-color", "#7D82B8");
          break;
        case 16:
          cell.css("background-color", "#613F75");
          break;
        case 32:
          cell.css("background-color", "#7ae582");
          break;
        case 64:
          cell.css("background-color", "#EF798A");
          break;
        case 128:
          cell.css("background-color", "#7CA982");
          break;
        case 256:
          cell.css("background-color", "#AA5042");
          break;
        case 512:
          cell.css("background-color", "#004E64");
          break;
        case 1024:
          cell.css("background-color", "#FAB2EA");
          break;
        case 2048:
          cell.css("background-color", "#D8D78F");
          break;
        case 5096:
          cell.css("background-color", "#25A18E");
          break;
        case 10192:
          cell.css("background-color", "#25A18E");
          break;
      }
      row.append(cell);
      this.div.append(row);
      i++;
    }
  }

  updateValues(gameState) {
    // goes through the board and updates every cell's value
    gameState.board.forEach((eachCell, index) => {
      $(`#cell${index}`).text(eachCell === 0 ? "" : eachCell);
      switch (eachCell) {
        case 0:
          $(`#cell${index}`).css("background-color", "#25A18E");
          break;
        case 2:
          $(`#cell${index}`).css("background-color", "#830A48");
          break;
        case 4:
          $(`#cell${index}`).css("background-color", "#FE7F2D");
          break;
        case 8:
          $(`#cell${index}`).css("background-color", "#7D82B8");
          break;
        case 16:
          $(`#cell${index}`).css("background-color", "#613F75");
          break;
        case 32:
          $(`#cell${index}`).css("background-color", "#7ae582");
          break;
        case 64:
          $(`#cell${index}`).css("background-color", "#EF798A");
          break;
        case 128:
          $(`#cell${index}`).css("background-color", "#7CA982");
          break;
        case 256:
          $(`#cell${index}`).css("background-color", "#AA5042");
          break;
        case 512:
          $(`#cell${index}`).css("background-color", "#004E64");
          break;
        case 1024:
          $(`#cell${index}`).css("background-color", "#FAB2EA");
          break;
        case 2048:
          $(`#cell${index}`).css("background-color", "#D8D78F");
          break;
        case 5096:
          $(`#cell${index}`).css("background-color", "#25A18E");
          break;
        case 10192:
          $(`#cell${index}`).css("background-color", "#25A18E");
          break;
      }
    });
  }
  updateScore(gameState) {
    $(`#score`).text(`Score: ${gameState.score}`);
  }
}
