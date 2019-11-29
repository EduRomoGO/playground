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

  it('renders with/without props', () => {
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
          <ol></ol>
        </div>
      </div>"
    `);
  });

  describe('board section', () => {
    const getSquare = num => document.querySelectorAll("[data-testid=square]")[num -1];
    const getStatus = () => document.querySelector('.status').textContent;
    const getNextPlayerSymbol = () => getStatus().split(':')[1].trim();

    const clickingEmptySquareFillItWithNextPlayerSymbol = square => {
      expect(square.innerHTML).toBe('');
      const nextPlayerSymbol = getNextPlayerSymbol();

      act(() => {
        square.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(square.innerHTML).toBe(nextPlayerSymbol);
    };

    describe('on square click', () => {
      it('should fill it with next player symbol', () => {
        act(() => {
          render(<Game />, container);
        });

        clickingEmptySquareFillItWithNextPlayerSymbol(getSquare(3));
        clickingEmptySquareFillItWithNextPlayerSymbol(getSquare(5));
      });

      it('should not change its content if has already been clicked', () => {
        act(() => {
          render(<Game />, container);
        });

        const secondSquare = getSquare(2);

        const clickingSameSquareDoesNotChangeItsContent = square => {
          const squareContentBeforeClickingAgain = square.innerHTML;
          act(() => {
            square.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          });

          expect(squareContentBeforeClickingAgain).toBe(square.innerHTML);
        };

        clickingEmptySquareFillItWithNextPlayerSymbol(secondSquare);
        clickingSameSquareDoesNotChangeItsContent(secondSquare);
      });

      it('should update game status unless clicking on already clicked square', () => {
        act(() => {
          render(<Game />, container);
        });

        const clickingEmptySquareChangesGameStatus = square => {
          const statusBeforeClickingAgain = getStatus();

          act(() => {
            square.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          });

          const statusAfterClickingAgain = getStatus();

          expect(statusBeforeClickingAgain).not.toBe(statusAfterClickingAgain);
        };

        const clickingSameSquareDoesNotChangeGameStatus = square => {
          const statusBeforeClickingAgain = getStatus();

          act(() => {
            square.dispatchEvent(new MouseEvent('click', { bubbles: true }));
          });

          const statusAfterClickingAgain = getStatus();

          expect(statusBeforeClickingAgain).toBe(statusAfterClickingAgain);
        };


        const seventhSquare = getSquare(7);

        clickingEmptySquareChangesGameStatus(seventhSquare);
        clickingSameSquareDoesNotChangeGameStatus(seventhSquare);
      });
    });
  });
});
