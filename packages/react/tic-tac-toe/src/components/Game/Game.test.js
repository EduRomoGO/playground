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
    const getNextPlayerSymbol = () => document.querySelector('.status').textContent.split(':')[1].trim();

    const clickingEmptySquareFillItWithNextPlayerSymbol = square => {
      expect(square.innerHTML).toBe('');
      const nextPlayerSymbol = getNextPlayerSymbol();

      act(() => {
        square.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      expect(square.innerHTML).toBe(nextPlayerSymbol);
    };


    it('should handle onClick event on any square filling it with next player symbol', () => {
      act(() => {
        render(<Game />, container);
      });

      clickingEmptySquareFillItWithNextPlayerSymbol(getSquare(3));
      clickingEmptySquareFillItWithNextPlayerSymbol(getSquare(5));
    });

    it('should not allow override already clicked square', () => {
      act(() => {
        render(<Game />, container);
      });

      const secondSquare = getSquare(2);
      // const nextPlayerSymbol = getNextPlayerSymbol();


      const clickingSameSquareDoesNotChangeItsContent = () => {
        const squareContentBeforeClickingAgain = secondSquare.innerHTML;
        // const nextPlayerSymbol = getNextPlayerSymbol();
        act(() => {
          secondSquare.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        });

        expect(squareContentBeforeClickingAgain).toBe(secondSquare.innerHTML);
      };

      clickingEmptySquareFillItWithNextPlayerSymbol(secondSquare);
      clickingSameSquareDoesNotChangeItsContent();
    });
  });
});
