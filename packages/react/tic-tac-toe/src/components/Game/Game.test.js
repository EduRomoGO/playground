import React from "react";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "react-dom/test-utils";
import Game from "./Game.js";
import pretty from "pretty";
import { getByText } from '@testing-library/dom';

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

  const playGame = ({ arrays, first, second }) => {
    const combined = combineAlternatingArrays(
      arrays[`squaresClicked${first}`],
      arrays[`squaresClicked${second}`]
    );

    combined.forEach(squareNumber => {
      act(() => {
        getSquare(squareNumber).dispatchEvent(
          new MouseEvent("click", { bubbles: true })
        );
      });
    });

    return combined;
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

        playGame({
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

        playGame({
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
      act(() => {
        render(<Game />, container);
      });

      const nextPlayerSymbolBefore = getNextPlayerSymbol();

      expect(nextPlayerSymbolBefore).toBe('X');

      [1, 2, 3, 4].forEach(squareNumber => {
        act(() => {
          getSquare(squareNumber).dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
      });

      // const squaresClicked = playGame({
      //   arrays: {
      //     squaresClickedWinner: [1, 4, 7],
      //     squaresClickedLooser: [2, 3, 9]
      //   },
      //   first: "Looser",
      //   second: "Winner"
      // });


      act(() => {
        getByText(container, 'Go to move #1').dispatchEvent(new MouseEvent("click", { bubbles: true }));
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
