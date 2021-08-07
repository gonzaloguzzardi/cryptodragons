import React, { Component, ReactNode } from 'react'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Chip from '@material-ui/core/Chip'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import DragonCreator from '../../components/dragon-creator'

import MainchainAPI from '../../services/blockchain-interaction/mainchain'
import SidechainAPI from '../../services/blockchain-interaction/sidechain'

import { tDragonSrc } from '../../types/data'

import dragonStyles from './dragon.module.scss'

interface IProps {
  location: tDragonSrc
  id: string
  transferMethod?: (id: string, location: string) => unknown
}

interface IState {
  location: tDragonSrc
  name: string
  id: string
  pic: string
  fetching: boolean
  health: string
  agility: string
  strength: string
  fortitude: string
}

class Dragon extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      location: props.location,
      name: 'dragon',
      id: props.id,
      pic: 'onepic',
      fetching: false,
      health: '',
      agility: '',
      strength: '',
      fortitude: '',
    }

    this.getDragonData()
    this.getDragonVisualData()
  }

  getDragonData: () => unknown = () => {
    if (this.state.location === 'SIDECHAIN' || this.state.location === 'SIDECHAIN_GATEWAY') {
      SidechainAPI.getDragonDataById(this.state.id)
        .then((dragonData) => this.setState(dragonData))
        .catch((err) => console.error(err))
    }
    if (this.state.location === 'MAINCHAIN' || this.state.location === 'MAINCHAIN_GATEWAY') {
      MainchainAPI.getDragonDataById(this.state.id)
        .then((dragonData) => this.setState(dragonData))
        .catch((err) => console.error(err))
    }
  }

  //TODO: map when backend is ready.
  getDragonVisualData: () => unknown = () => {
    if (this.state.location === 'SIDECHAIN') {
      SidechainAPI.getDragonVisualDataById(this.state.id).then((dragonData) =>
        console.log(dragonData)
      )
    }
    if (this.state.location === 'MAINCHAIN') {
      MainchainAPI.getDragonVisualDataById(this.state.id).then((dragonData) =>
        console.log(dragonData)
      )
    }
  }

  transfer: () => unknown = () => {
    this.setState({ fetching: true })

    if (this.props.transferMethod) {
      this.props.transferMethod(this.state.id, this.state.location)
    } else {
      if (this.state.location === 'SIDECHAIN') {
        SidechainAPI.transferDragon(this.state.id)
          .then((res) => console.log('[SIDECHAIN]: Transfer to Mainchain response', res))
          .catch(() => this.setState({ fetching: false }))
      }
      if (this.state.location === 'MAINCHAIN') {
        MainchainAPI.transferDragon(this.state.id)
          .then((res) => console.log('[MAINCHAIN]: Transfer to Sidechain response', res))
          .catch(() => this.setState({ fetching: false }))
      }
    }
  }

  render: () => ReactNode = () => {
    return (
      <Card className={dragonStyles.container} raised>
        <CardContent>
          <Typography color="textSecondary" align="center" gutterBottom>
            #{this.state.id}
          </Typography>
          <Typography color="textSecondary" align="center" noWrap gutterBottom>
            {this.state.name}
          </Typography>

          <CardMedia className={dragonStyles.card}>
            <DragonCreator
              typeAlas={1}
              typeCuernos={1}
              typeOjos={1}
              typePanza={1}
              typeCola={1}
              typeCuerpo={1}
              colorAlas={1}
              colorCuernos={1}
              colorOjos={1}
              colorPanza={1}
              colorCola={1}
              colorCuerpo={1}
            />
          </CardMedia>

          <Grid container justify="center" spacing={2}>
            <Grid item>
              <img src={'/assets/corazon.svg'} alt="" width="20" height="20" />
              <Typography variant="body2" align="center">
                {this.state.health}
              </Typography>
            </Grid>
            <Grid item>
              <img src={'/assets/reloj.svg'} alt="" width="20" height="20" />
              <Typography variant="body2" align="center">
                {this.state.agility}
              </Typography>
            </Grid>
            <Grid item>
              <img src={'/assets/espada.svg'} alt="" width="20" height="20" />
              <Typography variant="body2" align="center">
                {this.state.strength}
              </Typography>
            </Grid>
            <Grid item>
              <img src={'/assets/escudo.svg'} alt="" width="20" height="20" />
              <Typography variant="body2" align="center">
                {this.state.fortitude}
              </Typography>
            </Grid>
          </Grid>

          <CardContent>
            <Grid container justify="center" spacing={2}>
              <Typography variant="caption">Location:&nbsp;</Typography>
              <Chip color="secondary" size="small" label={<b>{this.state.location}</b>} />
            </Grid>
          </CardContent>

          <CardActions style={{ justifyContent: 'center' }}>
            {!this.props.location.includes('GATEWAY') && !this.state.fetching && (
              <Button variant="contained" color="secondary" onClick={this.transfer}>
                {`Transfer to ${this.props.location === 'SIDECHAIN' ? 'MAINCHAIN' : 'SIDECHAIN'}`}
              </Button>
            )}
            {(this.state.fetching || this.props.location.includes('GATEWAY')) && (
              <CircularProgress color="secondary" />
            )}
          </CardActions>
        </CardContent>
      </Card>
    )
  }
}

export default Dragon
