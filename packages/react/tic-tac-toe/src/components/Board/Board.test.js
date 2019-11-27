import React from 'react';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Board from './Board.js';

describe('Board', () => {
  let container;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders with/without params', () => {
    act(() => {
      render(<Board />, container);
    });

    expect(document.querySelector('[data-testid="board"]').textContent).toBe('no board');

    act(() => {
      const squares = Array(9).fill(null);
      render(<Board squares={squares} />, container);
    });

    expect(document.querySelectorAll('[data-testid="square"]').length).toBe(9);
  });

  it('calls onClick prop callback each time a Square is clicked', () => {
    const onClick = jest.fn();

    act(() => {
      const squares = Array(9).fill(null);

      render(<Board squares={squares} onClick={onClick} />, container);
    });

    const squares = document.querySelectorAll('[data-testid="square"]');

    act(() => {
      squares.forEach(square => {
        square.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });
    });

    expect(onClick).toHaveBeenCalledTimes(9);
  });
});
