import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Slider from './SliderStyled';

const InputStyled = styled.div`
  margin-left: 8px;
  padding: 1rem 1rem;
  font-size: 16px;
  background-color: white;
  display: grid;
  grid-template-columns: 175px 1fr 100px;
  align-items: center;
`;

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
        <Slider
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
        {step < 1 ? `${value * 100} %` : value}
      </InputStyled>
    </>
  );
}
