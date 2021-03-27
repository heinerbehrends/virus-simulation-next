import React, { Dispatch, SetStateAction } from 'react';
import {
  QueryObserverResult,
  RefetchOptions,
} from 'react-query/types/core/types';
import { SliderStyled, InputStyled } from './SliderStyled';

export type ValueSliderProps = {
  name: string;
  value: number | string;
  setValue: Dispatch<SetStateAction<number>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, unknown>>;
  min: number;
  max: number;
  step: number;
};

export default function ValueSlider({
  name,
  value,
  setValue,
  refetch,
  min,
  max,
  step,
}: ValueSliderProps) {
  return (
    <>
      <InputStyled>
        <label htmlFor={name}>{name}</label>
        <SliderStyled
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          onInput={(event) => {
            const eventTarget = event.target as HTMLInputElement;
            setValue(Math.round(parseFloat(eventTarget.value) * 100) / 100);
          }}
          onMouseUp={() => {
            refetch();
          }}
          onTouchEnd={() => {
            refetch();
          }}
          value={value}
        />
        <span style={{ paddingLeft: '1.5rem' }}>
          {typeof value === 'number'
            ? step < 1
              ? `${Math.round(value * 100)} %`
              : Math.round(value)
            : value}
        </span>
      </InputStyled>
    </>
  );
}
