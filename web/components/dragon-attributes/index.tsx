import React, { Component, ReactElement } from 'react'
import SliderCustom from 'components/slider/SliderCustom'
import Grid from '@mui/material/Grid'

const createSliderForPart = (
  parte,
  callbackColorFunction,
  callbacktypeFunction,
  typeTotal
) => (
  <div>
    <label className="attribute-label">{parte}</label>
    <div className="aParent">
      <div className="slider">
        <SliderCustom
          min={1}
          max={typeTotal}
          step={1}
          value={1}
          label={'Tipo'}
          parentMethod={callbacktypeFunction}
        />
      </div>
      <div className="slider">
        <SliderCustom
          min={1}
          max={360}
          step={1}
          value={1}
          label={'Color'}
          parentMethod={callbackColorFunction}
        />
      </div>
    </div>
    <style global jsx>
      {`
        .attribute-label {
          display: block;
          padding-bottom: 5px;
          font-weight: 600;
        }
        .aParent {
          display: flex;
        }
        .slider {
          width: 500px;
          padding-left: 40px;
        }
      `}
    </style>
  </div>
);

const DragonAttributes = ({
  updateColorCuernos,
  updateTypeCuernos,
  updateColorPanza,
  updateTypePanza,
  updateColorCola,
  updateTypeCola,
  updateColorAlas,
  updateTypeAlas,
  updateColorOjos,
  updateTypeOjos,
  updateColorCuerpo,
  updateTypeCuerpo,
}) => {
  return (
    <Grid className="navigation">
      <Grid item>
        {createSliderForPart(
          'Cuernos',
          updateColorCuernos,
          updateTypeCuernos,
          4
        )}
      </Grid>
      <Grid item>
        {createSliderForPart(
          'Panza',
          updateColorPanza,
          updateTypePanza,
          2
        )}
      </Grid>
      <Grid item>
        {createSliderForPart(
          'Cola',
          updateColorCola,
          updateTypeCola,
          4
        )}
      </Grid>
      <Grid item>
        {createSliderForPart(
          'Alas',
          updateColorAlas,
          updateTypeAlas,
          4
        )}
      </Grid>
      <Grid item>
        {createSliderForPart(
          'Ojos',
          updateColorOjos,
          updateTypeOjos,
          4
        )}
      </Grid>
      <Grid item>
        {createSliderForPart(
          'Cuerpo',
          updateColorCuerpo,
          updateTypeCuerpo,
          1
        )}
      </Grid>
    </Grid>
  )
}

export default DragonAttributes
