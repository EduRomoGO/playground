import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import Game from "./Game.js";
import pretty from "pretty";

describe("Game", () => {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  const getSquare = num =>
  document.querySelectorAll("[data-testid=square]")[num - 1];


  it("renders with/without props", () => {
    act(() => {
      render(<Game />, container);
    });

    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"game\\">
        <div class=\\"game-board\\">
          <div data-testid=\\"board\\">
            <div class=\\"board-row\\"><button class=\\"square\\" data-testid=\\"square\\"></button><button class=\\"square\\" data-testid=\\"square\\"></button><button class=\\"square\\" data-testid=\\"square\\"></button></div>
            <div class=\\"board-row\\"><button class=\\"square\\" data-testid=\\"square\\"></button><button class=\\"square\\" data-testid=\\"square\\"></button><button class=\\"square\\" data-testid=\\"square\\"></button></div>
            <div class=\\"board-row\\"><button class=\\"square\\" data-testid=\\"square\\"></button><button class=\\"square\\" data-testid=\\"square\\"></button><button class=\\"square\\" data-testid=\\"square\\"></button></div>
          </div>
        </div>
        <div class=\\"game-info\\">
          <div class=\\"status\\">Next player: X</div>
          <ol>
            <li><button data-testid=\\"move\\"></button></li>
          </ol>
        </div>
      </div>"
    `);
  });

  describe("board section", () => {
    const getStatus = () => document.querySelector(".status").textContent;
    const getNextPlayerSymbol = () =>
      getStatus()
        .split(":")[1]
        .trim();

    const clickingEmptySquareFillItWithNextPlayerSymbol = square => {
      expect(square.innerHTML).toBe("");
      const nextPlayerSymbol = getNextPlayerSymbol();

      act(() => {
        square.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(square.innerHTML).toBe(nextPlayerSymbol);
    };

    const clickingSameSquareDoesNotChangeGameStatus = square => {
      const statusBeforeClickingAgain = getStatus();

      act(() => {
        square.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      const statusAfterClickingAgain = getStatus();

      expect(statusBeforeClickingAgain).toBe(statusAfterClickingAgain);
    };

    const combineAlternatingArrays = (a, b) => {
      let combined = [];
      const [shorter, larger] = [a, b].sort((a, b) => a.length - b.length);

      shorter.forEach((item, i) => {
        combined.push(a[i], b[i]);
      });

      return [...combined, ...larger.slice(shorter.length)];
    };

    const finishGameInFiveMoves = ({ arrays, first, second }) => {
      const { squaresClickedWinner, squaresClickedLooser } = arrays;
      arrays[`squaresClicked${first}`];
      const combined = combineAlternatingArrays(
        arrays[`squaresClicked${first}`],
        arrays[`squaresClicked${second}`]
      );
      // const combined = combineAlternatingArrays(squaresClickedWinner, squaresClickedLooser);

      combined.forEach(squareNumber => {
        act(() => {
          getSquare(squareNumber).dispatchEvent(
            new MouseEvent("click", { bubbles: true })
          );
        });
      });
    };

    describe("on square click", () => {
      it("should fill it with next player symbol", () => {
        act(() => {
          render(<Game />, container);
        });

        clickingEmptySquareFillItWithNextPlayerSymbol(getSquare(3));
        clickingEmptySquareFillItWithNextPlayerSymbol(getSquare(5));
      });

      it("should not change its content if has already been clicked", () => {
        act(() => {
          render(<Game />, container);
        });

        const secondSquare = getSquare(2);

        const clickingSameSquareDoesNotChangeItsContent = square => {
          const squareContentBeforeClickingAgain = square.innerHTML;
          act(() => {
            square.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          });

          expect(squareContentBeforeClickingAgain).toBe(square.innerHTML);
        };

        clickingEmptySquareFillItWithNextPlayerSymbol(secondSquare);
        clickingSameSquareDoesNotChangeItsContent(secondSquare);
      });

      it("should update game status", () => {
        act(() => {
          render(<Game />, container);
        });

        const clickingEmptySquareChangesGameStatus = square => {
          const statusBeforeClickingAgain = getStatus();

          act(() => {
            square.dispatchEvent(new MouseEvent("click", { bubbles: true }));
          });

          const statusAfterClickingAgain = getStatus();

          expect(statusBeforeClickingAgain).not.toBe(statusAfterClickingAgain);
        };

        const seventhSquare = getSquare(7);

        clickingEmptySquareChangesGameStatus(seventhSquare);
      });

      it("should not update game status when clicking on an already clicked square", () => {
        act(() => {
          render(<Game />, container);
        });

        const seventhSquare = getSquare(7);

        act(() => {
          seventhSquare.dispatchEvent(
            new MouseEvent("click", { bubbles: true })
          );
        });

        clickingSameSquareDoesNotChangeGameStatus(seventhSquare);
      });

      it("should not update game status when clicking on any square (previously clicked or not) after game has finished", () => {
        act(() => {
          render(<Game />, container);
        });

        const clickingEmptSquareDoesNotChangeGameStatus = clickingSameSquareDoesNotChangeGameStatus;
        const clickingClickedSquareDoesNotChangeGameStatus = clickingSameSquareDoesNotChangeGameStatus;

        finishGameInFiveMoves({
          arrays: {
            squaresClickedWinner: [1, 4, 7],
            squaresClickedLooser: [2, 3]
          },
          first: "Winner",
          second: "Looser"
        });

        expect(getStatus()).toBe("X won the game!");

        const notClickedSquare = getSquare(9);
        const clickedSquare = getSquare(1);

        clickingEmptSquareDoesNotChangeGameStatus(notClickedSquare);
        clickingClickedSquareDoesNotChangeGameStatus(clickedSquare);
      });

      it("should update game status after game has finished", () => {
        act(() => {
          render(<Game />, container);
        });

        finishGameInFiveMoves({
          arrays: {
            squaresClickedWinner: [1, 4, 7],
            squaresClickedLooser: [2, 3, 9]
          },
          first: "Looser",
          second: "Winner"
        });

        expect(getStatus()).toBe("O won the game!");
      });
    });
  });

  describe("info section", () => {
    it("should show past moves as a list", () => {
      render(<Game />, container);

      act(() => {
        getSquare(1).dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(document.querySelectorAll('[data-testid="move"]')).toBeTruthy();
      expect(document.querySelectorAll('[data-testid="move"]').length).toBe(2);

      act(() => {
        getSquare(3).dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(document.querySelectorAll('[data-testid="move"]').length).toBe(3);
    });
    // <li>
    //   <button onClick={() => this.jumpTo(move)}>{desc}</button>
    // </li>
  });
});
