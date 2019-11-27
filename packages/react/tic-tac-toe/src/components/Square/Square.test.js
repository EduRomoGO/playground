import React from 'react';
import { unmountComponentAtNode, render } from "react-dom";
import { act } from 'react-dom/test-utils';
import Square from './Square.js';

describe('Square', () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders with/without passed value', () => {
    act(() => {
      render(<Square />, container);
    });

    expect(container.textContent).toBe('');

    act(() => {
      render(<Square value={'X'} />, container);
    });

    expect(container.textContent).toBe('X');
  });

  it('calls callback when onClick', () => {
    const onClick = jest.fn();

    act(() => {
      render(<Square onClick={onClick} />, container);
    });

    const button = document.querySelector("[data-testid=square]");
    expect(button.innerHTML).toBe('');

    act(() => {
      button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button.innerHTML).toBe('');

    act(() => {
      for(let i = 0; i <3; i++) {
        button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
      }
    });

    expect(onClick).toHaveBeenCalledTimes(4);
    expect(button.innerHTML).toBe('');
  });

});
