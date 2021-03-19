import React, { Dispatch, SetStateAction } from 'react';
import { SliderStyled, InputStyled } from './SliderStyled';

type ValueSliderProps = {
  name: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  setRefetch: Dispatch<SetStateAction<number>>;
  min: number;
  max: number;
  step: number;
};

export default function ValueSlider({
  name,
  value,
  setValue,
  setRefetch,
  min,
  max,
  step,
}: ValueSliderProps) {
  return (
    <>
      <InputStyled>
        <label htmlFor={name}>{name}</label>
        <SliderStyled
          style={{ paddingRight: '1rem' }}
          name={name}
          min={min}
          max={max}
          step={step}
          onInput={(event) => {
            setValue(event.target.value);
          }}
          onMouseUp={() => {
            setRefetch(Math.random());
          }}
          onTouchEnd={() => {
            setRefetch(Math.random());
          }}
          value={value}
        />
        <span style={{ paddingLeft: '1rem' }}>
          {step < 1 ? `${value * 100} %` : value}
        </span>
      </InputStyled>
    </>
  );
}
