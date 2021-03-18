import React from 'react';
import styled from 'styled-components';

const Slider = styled.input`
  width: 100%;
  margin: 8px 0 8px 8px;
  background-color: transparent;
  -webkit-appearance: none;

  :focus {
    outline: none;
  }
  ::-webkit-slider-runnable-track {
    background: #717171;
    border: 0.2px solid rgba(1, 1, 1, 0.9);
    border-radius: 1.3px;
    width: 100%;
    height: 2px;
    cursor: pointer;
  }
  ::-webkit-slider-thumb {
    margin-top: -7.2px;
    width: 16px;
    height: 16px;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 8px;
    cursor: pointer;
    -webkit-appearance: none;
  }
  :focus::-webkit-slider-runnable-track {
    background: #7e7e7e;
  }
  ::-moz-range-track {
    background: #717171;
    border: 0.2px solid rgba(1, 1, 1, 0.9);
    border-radius: 1.3px;
    width: 100%;
    height: 4px;
    padding: 1rem 0 1rem 0;
    cursor: pointer;
  }
  ::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 8px;
    cursor: pointer;
  }
  ::-ms-track {
    background: transparent;
    border-color: transparent;
    border-width: 7px 0;
    color: transparent;
    width: 100%;
    height: 2px;
    cursor: pointer;
  }
  ::-ms-fill-lower {
    background: #646464;
    border: 0.2px solid rgba(1, 1, 1, 0.9);
    border-radius: 2.6px;
  }
  ::-ms-fill-upper {
    background: #717171;
    border: 0.2px solid rgba(1, 1, 1, 0.9);
    border-radius: 2.6px;
  }
  ::-ms-thumb {
    width: 16px;
    height: 16px;
    background: #ffffff;
    border: 1px solid #000000;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 0px;
    /*Needed to keep the Edge thumb centred*/
  }
  :focus::-ms-fill-lower {
    background: #717171;
  }
  :focus::-ms-fill-upper {
    background: #7e7e7e;
  }
`;

export default function SliderStyled({ name, ...rest }) {
  return <Slider id={name} type="range" {...rest} />;
}
