/* eslint-disable @typescript-eslint/ban-types */
import React, { Component, ReactElement } from 'react'
import Slider from '../../components/slider/Slider'
import Grid from '@mui/material/Grid'

// http://localhost:3000/dragon-creation

interface DProps {
  name?: string
  typeTotal?: number
  haveTypes?: boolean
  haveColors?: boolean
}
interface DState {
  name?: string
  color?: number
  type?: number
  typeTotal?: number
  haveTypes?: boolean
  haveColors?: boolean
}
class DragonsAttributes extends Component<DProps> {
  state: DState

  constructor(props: DProps) {
    super(props)

    this.state = {
      color: 0,
      type: 1,
      name: props.name,
      typeTotal: props.typeTotal,
      haveTypes: props.haveTypes,
      haveColors: props.haveColors,
    }
  }

  updateColor = (color) => this.setState({ color: color })

  updateType = (type) => this.setState({ type: type })

  createSliderForPart(
    parte,
    callbackColorFunction,
    callbacktypeFunction,
    typeTotal,
    haveTypes,
    haveColors
  ) {
    return (
      <div>
        <label>{parte}</label>
        <div className="aParent">
          <div className="slider">
            {haveTypes ? (
              <Slider
                min={1}
                max={typeTotal}
                step={1}
                value={1}
                label={'Tipo'}
                parentMethod={callbacktypeFunction}
              />
            ) : null}
          </div>
          <div className="slider">
            {haveColors ? (
              <Slider
                min={1}
                max={360}
                step={1}
                value={1}
                label={'Color'}
                parentMethod={callbackColorFunction}
              />
            ) : null}
          </div>
        </div>
        <style global jsx>
          {`
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
    )
  }

  render: () => ReactElement<DProps> = () => (
    <Grid item>
      {this.createSliderForPart(
        this.state.name,
        this.updateColor,
        this.updateType,
        this.state.typeTotal,
        this.state.haveTypes,
        this.state.haveColors
      )}
    </Grid>
  )
}

export default DragonsAttributes
