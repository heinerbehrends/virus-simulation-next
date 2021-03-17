import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from './SliderStyled';

const InputStyled = styled.button`
  margin-left: 8px;
  padding: 0.4rem 1rem;
  border: 1px solid lightblue;
  border-radius: 8px;
  font-size: 16px;
  background-color: white;
`;
export default function ValueSlider({ name, value, setValue, min, max, step }) {
  return (
    <>
      <InputStyled
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <label htmlFor="speed">{name}</label>
        <Slider
          style={{ paddingRight: '1rem' }}
          name={'speed'}
          min={min}
          max={max}
          step={step}
          // onInput={(event) => {
          //   setValue(event.target.value);
          // }}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          value={value}
        />
        {value}
      </InputStyled>
    </>
  );
}
