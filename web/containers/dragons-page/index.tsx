/* eslint-disable @typescript-eslint/ban-types */
import React, { Component, ReactElement } from 'react'
import Slider from '../../components/slider/Slider'
import DragonCreator from '../../components/dragon-creator'
import Grid from '@material-ui/core/Grid'

// http://localhost:3000/dragon-creation

interface DProps {
  any
}
interface DState {
  colorAlas?: number
  colorCola?: number
  colorPanza?: number
  colorCuernos?: number
  colorOjos?: number
  colorCuerpo?: number
  typeAlas?: number
  typeCola?: number
  typePanza?: number
  typeCuernos?: number
  typeOjos?: number
  typeCuerpo?: number
}
class DragonsPage extends Component<DProps> {
  state: DState

  constructor(props: DProps) {
    super(props)
    this.updateColorAlas = this.updateColorAlas.bind(this)
    this.updateColorCola = this.updateColorCola.bind(this)
    this.updateColorOjos = this.updateColorOjos.bind(this)
    this.updateColorPanza = this.updateColorPanza.bind(this)
    this.updateColorCuerpo = this.updateColorCuerpo.bind(this)
    this.updateColorCuernos = this.updateColorCuernos.bind(this)

    this.updateTypeAlas = this.updateTypeAlas.bind(this)
    this.updateTypeCola = this.updateTypeCola.bind(this)
    this.updateTypeOjos = this.updateTypeOjos.bind(this)
    this.updateTypePanza = this.updateTypePanza.bind(this)
    this.updateTypeCuerpo = this.updateTypeCuerpo.bind(this)
    this.updateTypeCuernos = this.updateTypeCuernos.bind(this)

    this.state = {
      colorAlas: 0,
      colorCola: 0,
      colorPanza: 0,
      colorCuernos: 0,
      colorOjos: 0,
      colorCuerpo: 0,

      typeAlas: 1,
      typeCola: 1,
      typePanza: 1,
      typeCuernos: 1,
      typeOjos: 1,
      typeCuerpo: 1,
    }
  }

  updateColorAlas = (color) => this.setState({ colorCola: color })

  //updateColorAlas(color) { this.setState({ colorAlas: color }); }
  updateColorCola(color) {
    this.setState({ colorCola: color })
  }
  updateColorPanza(color) {
    this.setState({ colorPanza: color })
  }
  updateColorCuernos(color) {
    this.setState({ colorCuernos: color })
  }
  updateColorOjos(color) {
    this.setState({ colorOjos: color })
  }
  updateColorCuerpo(color) {
    this.setState({ colorCuerpo: color })
  }

  updateTypeAlas(n) {
    this.setState({ typeAlas: n })
  }
  updateTypeCola(n) {
    this.setState({ typeCola: n })
  }
  updateTypePanza(n) {
    this.setState({ typePanza: n })
  }
  updateTypeCuernos(n) {
    this.setState({ typeCuernos: n })
  }
  updateTypeOjos(n) {
    this.setState({ typeOjos: n })
  }
  updateTypeCuerpo(n) {
    this.setState({ typeCuerpo: n })
  }

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
    <div>
      <div className="main">
        <DragonCreator
          typeAlas={this.state.typeAlas}
          typeCuernos={this.state.typeCuernos}
          typeOjos={this.state.typeOjos}
          typePanza={this.state.typePanza}
          typeCola={this.state.typeCola}
          typeCuerpo={this.state.typeCuerpo}
          colorAlas={this.state.colorAlas}
          colorCuernos={this.state.colorCuernos}
          colorOjos={this.state.colorOjos}
          colorPanza={this.state.colorPanza}
          colorCola={this.state.colorCola}
          colorCuerpo={this.state.colorCuerpo}
        />
        <Grid className="navigation">
          <Grid item>
            {this.createSliderForPart(
              'Cuernos',
              this.updateColorCuernos,
              this.updateTypeCuernos,
              4,
              true,
              true
            )}
          </Grid>
          <Grid item>
            {this.createSliderForPart(
              'Panza',
              this.updateColorPanza,
              this.updateTypePanza,
              2,
              true,
              true
            )}
          </Grid>
          <Grid item>
            {this.createSliderForPart(
              'Cola',
              this.updateColorCola,
              this.updateTypeCola,
              4,
              true,
              true
            )}
          </Grid>
          <Grid item>
            {this.createSliderForPart(
              'Alas',
              this.updateColorAlas,
              this.updateTypeAlas,
              4,
              true,
              true
            )}
          </Grid>
          <Grid item>
            {this.createSliderForPart(
              'Ojos',
              this.updateColorOjos,
              this.updateTypeOjos,
              4,
              true,
              true
            )}
          </Grid>
          <Grid item>
            {this.createSliderForPart(
              'Cuerpo',
              this.updateColorCuerpo,
              this.updateTypeCuerpo,
              1,
              false,
              true
            )}
          </Grid>
        </Grid>
      </div>
      <style global jsx>{`
        .main {
          width: 100%;
        }
        .cardContainer {
          position: absolute;
          width: 500px;
          top: 0%;
          height: 600px;
          float: left;
        }
        .navigation {
          margin: 0 auto;
          width: 400px;
        }
      `}</style>
    </div>
  )
}

export default DragonsPage
