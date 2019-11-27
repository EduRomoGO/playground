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
});
