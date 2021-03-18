import React from 'react';
import { render, screen, within, fireEvent } from '@testing-library/react';
import ValueSlider from './ValueSlider';

describe('ValueSlider', () => {
  it('calls the setValue function onInput and the setRefetch onMouseUp and onTouchEnd', () => {
    const mockValue = jest.fn();
    const mockRefetch = jest.fn();
    const { container } = render(
      <ValueSlider
        name="test"
        value={2}
        setValue={mockValue}
        setRefetch={mockRefetch}
        min={0}
        max={10}
        step={1}
      />
    );
    const slider = screen.getByRole('slider', {
      name: /test/i,
    });
    fireEvent.input(slider, { target: { value: 4 } });
    expect(mockValue).toBeCalledWith('4');
    fireEvent.mouseUp(slider, { target: { value: 8 } });
    fireEvent.touchEnd(slider, { target: { value: 10 } });
    expect(mockRefetch).toBeCalledTimes(2);
  });
});
