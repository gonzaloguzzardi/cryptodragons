import React, { Component, ReactNode } from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

import DragonCreator from 'components/dragon-creator'

import MainchainAPI from 'services/blockchain-interaction/mainchain'
import SidechainAPI from 'services/blockchain-interaction/sidechain'

import { tDragonSrc } from 'types/data'

import dragonStyles from './dragon.module.scss'

interface IProps {
  location: tDragonSrc
  id: string
  key: string
  transferMethod?: (id: string, location: string) => unknown
  mappedAccounts?: boolean
}

interface IState {
  location: tDragonSrc
  name: string
  id: string
  isApprovedForSelling: boolean
  pic: string
  fetching: boolean
  health: string
  agility: string
  strength: string
  fortitude: string

  bodyColor: number
  bodyPatternColor: number
  bodyPatternType: number
  bodyType: number
  eyesColor: number
  eyesType: number
  hornsColor: number
  hornsType: number
  tailColor: number
  tailType: number
  wingsColor: number
  wingsType: number
}

class Dragon extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      location: props.location,
      name: 'dragon',
      id: props.id,
      isApprovedForSelling: false,
      pic: 'onepic',
      fetching: false,
      health: '',
      agility: '',
      strength: '',
      fortitude: '',
      bodyColor: 1,
      bodyPatternColor: 1,
      bodyPatternType: 1,
      bodyType: 1,
      eyesColor: 1,
      eyesType: 1,
      hornsColor: 1,
      hornsType: 1,
      tailColor: 1,
      tailType: 1,
      wingsColor: 1,
      wingsType: 1,
    }

    this.getDragonData()
    this.getDragonVisualData()
    this.getIsApprovedForSelling()
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

  getDragonVisualData: () => unknown = () => {
    if (this.state.location === 'SIDECHAIN') {
      SidechainAPI.getDragonVisualDataById(this.state.id).then((dragonData) =>
        this.updateDragonVisualData(dragonData)
      )
    }
    if (this.state.location === 'MAINCHAIN') {
      MainchainAPI.getDragonVisualDataById(this.state.id).then((dragonData) =>
        this.updateDragonVisualData(dragonData)
      )
    }
  }

  updateDragonVisualData = (dragonData) => {
    console.log(dragonData)
    if (dragonData) {
      const {
        bodyPatternColor,
        // bodyPatternType,
        bodyColor,
        bodyType,
        eyesColor,
        eyesType,
        hornsColor,
        hornsType,
        tailColor,
        tailType,
        wingsColor,
        wingsType,
      } = dragonData

      this.setState({
        bodyPatternColor: Math.round(bodyPatternColor * 1.41),
        bodyPatternType: 1, //(bodyPatternType % 2) + 1, //1-2
        bodyColor: Math.round(bodyColor * 1.41),
        bodyType: (bodyType % 2) + 1, //1-2
        eyesColor: Math.round(eyesColor * 1.41),
        eyesType: (eyesType % 4) + 1, //1-4
        hornsColor: Math.round(hornsColor * 1.41),
        hornsType: (hornsType % 4) + 1, //1-4
        tailColor: Math.round(tailColor * 1.41),
        tailType: (tailType % 4) + 1, //1-4
        wingsColor: Math.round(wingsColor * 1.41),
        wingsType: (wingsType % 4) + 1, //1-4
      })
    }
  }

  getIsApprovedForSelling: () => unknown = () => {
    MainchainAPI.isApprovedForSelling(this.state.id)
      .then(result => {
        this.setState({ isApprovedForSelling: result });
      })
      .catch((err) => console.error(err))
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

  approveForSelling: () => unknown = () => {
    this.setState({ fetching: true })

    MainchainAPI.approveSellDragon(this.state.id)
      .then((res) => console.log('[MAINCHAIN]: Create sell order succesfully created...', res))
      // .catch(() => this.setState({ fetching: false }))
      .finally(() => {
        this.getIsApprovedForSelling()
        this.setState({ fetching: false })
      })
  }

  sellDragon: () => unknown = () => {
    this.setState({ fetching: true })

    MainchainAPI.createSellOrder(this.state.id)
      .then((res) => console.log('[MAINCHAIN]: Create sell order succesfully created...', res))
      .catch(() => this.setState({ fetching: false }))
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
              typeAlas={this.state.wingsType}
              typeCuernos={this.state.hornsType}
              typeOjos={this.state.eyesType}
              typePanza={this.state.bodyType}
              typeCola={this.state.tailType}
              typeCuerpo={this.state.bodyPatternType}
              colorAlas={this.state.wingsColor}
              colorCuernos={this.state.hornsColor}
              colorOjos={this.state.eyesColor}
              colorPanza={this.state.bodyColor}
              colorCola={this.state.tailColor}
              colorCuerpo={this.state.bodyPatternColor}
              id={this.state.id}
            />
          </CardMedia>

          <Grid container justifyContent="center" spacing={2}>
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
            <Grid container justifyContent="center">
              <Typography variant="caption">Location:&nbsp;</Typography>
              <Chip color="secondary" size="small" label={<b>{this.state.location}</b>} />
            </Grid>
          </CardContent>

          {/* Transfer actions Begin */}
          {!this.props.location.includes('GATEWAY') &&
            !this.state.fetching &&
            this.props.mappedAccounts && (
              <CardActions style={{ justifyContent: 'center' }}>
                <Button variant="contained" color="secondary" onClick={this.transfer}>
                  {`Transfer to ${this.props.location === 'SIDECHAIN' ? 'MAINCHAIN' : 'SIDECHAIN'}`}
                </Button>
              </CardActions>
          )}
          {(this.state.fetching || this.props.location.includes('GATEWAY')) && (
            <CardActions style={{ justifyContent: 'center' }}>
              <CircularProgress color="secondary" />
            </CardActions>
          )}
          {/* Transfer actions End */}

          {/* Marketplace actions Begins */}
          {this.props.location === 'MAINCHAIN' &&
            !this.state.fetching &&
            !this.state.isApprovedForSelling && (
              <CardActions style={{ justifyContent: 'center' }}>
                <Button variant="contained" color="secondary" onClick={this.approveForSelling}>
                  Approve for Selling
                </Button>
              </CardActions>
            )
          }
          {this.props.location === 'MAINCHAIN' &&
            !this.state.fetching &&
            this.state.isApprovedForSelling && (
              <CardActions style={{ justifyContent: 'center' }}>
                <Button variant="contained" color="secondary" onClick={this.sellDragon}>
                  Sell Dragon
                </Button>
              </CardActions>
          )}
          {/* Marketplace actions Ends */}
        </CardContent>
      </Card>
    )
  }
}

export default Dragon
