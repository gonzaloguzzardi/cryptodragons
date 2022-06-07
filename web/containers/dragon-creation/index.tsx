import React, { Component, ReactElement } from 'react'
import DragonCreator from 'components/dragon-creator'
import DragonAttributes from 'components/dragon-attributes'
import Grid from '@mui/material/Grid'

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
class DragonCreation extends Component<DProps> {
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

  updateColorAlas(color) {
    this.setState({ colorAlas: color });
  }
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

  render: () => ReactElement<DProps> = () => (
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
      <DragonAttributes
        updateColorCuernos={this.updateColorCuernos}
        updateTypeCuernos={this.updateTypeCuernos}
        updateColorPanza={this.updateColorPanza}
        updateTypePanza={this.updateTypePanza}
        updateColorCola={this.updateColorCola}
        updateTypeCola={this.updateTypeCola}
        updateColorAlas={this.updateColorAlas}
        updateTypeAlas={this.updateTypeAlas}
        updateColorOjos={this.updateColorOjos}
        updateTypeOjos={this.updateTypeOjos}
        updateColorCuerpo={this.updateColorCuerpo}
        updateTypeCuerpo={this.updateTypeCuerpo}
      />
      <style global jsx>{`
        .main {
          width: 100%;
          padding-top: 10px;
        }
        .cardContainer {
          position: absolute;
          width: 500px;
          top: 0%;
          height: 600px;
          float: left;
        }
        .navigation {
          margin-left: 525px;
          width: 600px;
        }
      `}</style>
    </div>
  )
}

export default DragonCreation
