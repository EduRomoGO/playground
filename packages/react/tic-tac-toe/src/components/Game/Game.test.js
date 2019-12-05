import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import Game from "./Game.js";
import pretty from "pretty";
import { getByText } from '@testing-library/dom';
import { accessSync } from "fs";

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
  const getStatus = () => document.querySelector(".status").textContent;
  const getNextPlayerSymbol = () =>
    getStatus()
      .split(":")[1]
      .trim();

  const combineAlternatingArrays = (a, b) => {
    let combined = [];
    const [shorter, larger] = [a, b].sort((a, b) => a.length - b.length);

    shorter.forEach((item, i) => {
      combined.push(a[i], b[i]);
    });

    return [...combined, ...larger.slice(shorter.length)];
  };

  const getMoves = ({ arrays, first, second }) => combineAlternatingArrays(
    arrays[`squaresClicked${first}`],
    arrays[`squaresClicked${second}`]
  );

  const playGame = moves => {
    moves.forEach(squareNumber => {
      act(() => {
        getSquare(squareNumber).dispatchEvent(
          new MouseEvent("click", { bubbles: true })
        );
      });
    });
  };

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
            <li><button data-testid=\\"move\\">Go to move #0</button></li>
          </ol>
        </div>
      </div>"
    `);
  });

  describe("board section", () => {
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

        const gameMoves = getMoves({
          arrays: {
            squaresClickedWinner: [1, 4, 7],
            squaresClickedLooser: [2, 3]
          },
          first: "Winner",
          second: "Looser"
        });
        playGame(gameMoves);

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

        const gameMoves = getMoves({
          arrays: {
            squaresClickedWinner: [1, 4, 7],
            squaresClickedLooser: [2, 3, 9]
          },
          first: "Looser",
          second: "Winner"
        });
        playGame(gameMoves);

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

      const getMoves = () => document.querySelectorAll('[data-testid="move"]');

      expect(getMoves()).toBeTruthy();
      expect(getMoves().length).toBe(2);

      act(() => {
        getSquare(3).dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });

      expect(getMoves().length).toBe(3);

      for (let i = 0; i < getMoves().length; i++) {
        expect(getMoves()[i].textContent).toBe(`Go to move #${i}`);
      }
    });

    it('clicking on any of the moves buttons updates board and status with the situation in this moment', () => {
      let gameMoves;
      let currentMove = 0;

      act(() => {
        render(<Game />, container);
      });

      const nextPlayerSymbolBefore = getNextPlayerSymbol();

      expect(nextPlayerSymbolBefore).toBe('X');

      gameMoves = [1, 2, 4, 3, 9, 5, 7];
      currentMove = gameMoves.length;
      playGame(gameMoves);

      // console.log(gameMoves);
      const getSquaresMap = () => gameMoves.reduce(
        (acc, next, i) => {
          return { ...acc, [next]: i % 2 === 0 ? 'X' : 'O' };
        },
        {},
      );
      const squaresMap = getSquaresMap();
      // console.log(getSquaresMap())


      const checkBoardState = () => {
        Array.from(document.querySelectorAll("[data-testid=square]")).forEach((square, i) => {
          // console.log('square content: ', square.textContent);
          // console.log('index: ', i);
          if (!squaresMap[i+1]) {
            squaresMap[i+1] = '';
          }
          expect(square.textContent).toBe(squaresMap[i+1]);
        });
      }

      checkBoardState();

      act(() => {
        currentMove = 1;
        getByText(container, `Go to move #${currentMove}`).dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(getNextPlayerSymbol()).toBe('O');


      // [1, 2, 3, 4].forEach(squareNumber => {
      //   expect(getSquare(squareNumber)).innerHTML.toBe('');
      // });

      act(() => {
        getByText(container, 'Go to move #2').dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
      expect(getNextPlayerSymbol()).toBe('X');
    });
  });
});
