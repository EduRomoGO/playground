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
    it('should handle onClick event on any square filling it with next player symbol', () => {
      act(() => {
        render(<Game />, container);
      });

      const thirdSquare = document.querySelectorAll("[data-testid=square]")[2];
      const getNextPlayerSymbol = () => document.querySelector('.status').textContent.split(':')[1].trim();
      const nextPlayerSymbol = getNextPlayerSymbol();
      expect(thirdSquare.innerHTML).toBe('');

      thirdSquare.dispatchEvent(new MouseEvent('click', { bubbles: true }));

      expect(thirdSquare.innerHTML).toBe(nextPlayerSymbol);
    });
  });
});
