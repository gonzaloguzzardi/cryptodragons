/* eslint-disable @typescript-eslint/ban-types */
import React, { Component } from 'react'

import Layout from '../../components/layout'
import Dragon from '../../components/dragon'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import FormLabel from '@material-ui/core/FormLabel'

import MainchainAPI from '../../services/blockchain-interaction/mainchain'
import SidechainAPI from '../../services/blockchain-interaction/sidechain'
// import { _getDragonsFromOracle } from '../../services/oracle'
import { ReactElement } from 'react'

interface IProps {
  any
}
interface IState {
  sideAccount?: string
  mainAccount?: string
  sideDragons?: Array<string>
  mainDragons?: Array<string>
  sidechainGatewayDragons?: Array<Object>
  mainchainGatewayDragons?: Array<Object>
  accountsAreMapped?: boolean
}

class Demo extends Component<IProps> {
  state: IState

  constructor(props: IProps) {
    super(props)

    this.state = {
      sideAccount: '0xfee39fad945754831b59b92a1a8339f65358792d',
      mainAccount: '0x28863498efede12296888f7ca6cf0b94974fbdbc',

      sideDragons: [],
      mainDragons: [],
      sidechainGatewayDragons: [],
      mainchainGatewayDragons: [],

      accountsAreMapped: false,
    }
    this.initAccounts()
  }

  initAccounts: () => unknown = () => {
    MainchainAPI.getClientHelper().then((account) =>
      this.setState({ mainAccount: account.account })
    )
    SidechainAPI.getClientHelper().then((account) =>
      this.setState({ sideAccount: account.account })
    )
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  componentDidMount: () => unknown = () => {
    this.updateDragons()
    setInterval(this.updateDragons, 7000)

    this.accountsAreMapped()
  }

  updateDragons: () => unknown = () => {
    this.getDragonsFromMain()
    this.getDragonsFromSide()
    this.getDragonsFromOracle()
  }

  getDragonsFromMain: () => unknown = () => {
    MainchainAPI.getMyDragons().then((mainDragons) => this.setState({ mainDragons }))
  }

  getDragonsFromSide: () => unknown = () => {
    SidechainAPI.getMyDragons().then((sideDragons) => this.setState({ sideDragons }))
  }

  getDragonsFromOracle: () => unknown = () => {
    // _getDragonsFromOracle().then((result) => {
    //   this.setState({
    //     sidechainGatewayDragons: result[0]['sidechain-gateway-results'],
    //     mainchainGatewayDragons: result[1]['mainchain-gateway-results'],
    //   })
    // })
  }

  buyDragonInSideChain: () => unknown = () => {
    SidechainAPI.createDragon().then((res) => {
      console.log('[SIDECHAIN]: Dragon create response', res)
    })
  }

  buyDragonInMainChain: () => unknown = () => {
    MainchainAPI.createDragon().then((res) =>
      console.log('[MAINCHAIN]: Dragon create response', res)
    )
  }

  mapAccounts: () => unknown = () => {
    Promise.all([
      SidechainAPI.mapAccountToMainchainAccount(this.state.mainAccount),
      MainchainAPI.mapAccountToSidechainAccount(this.state.sideAccount),
    ]).then((values) => {
      console.log('[SIDECHAIN]: MAPEO EN SIDECHAIN', values[0])
      console.log('[MAINCHAIN]: MAPEO EN MAINCHAIN', values[1])
      this.accountsAreMapped()
    })
  }

  accountsAreMapped: () => unknown = () => {
    console.log('Are accounts mapped?')
    Promise.all([
      MainchainAPI.areAccountsMapped(this.state.sideAccount),
      SidechainAPI.areAccountsMapped(this.state.mainAccount),
    ]).then((values) => {
      console.log('MAPEO CUENTAS [SideInMain, MainInSide]', values)
      this.setState({ accountsAreMapped: values[0] && values[1] })
    })
  }

  onChangeMainAccount: (event) => unknown = (event) =>
    this.setState({ mainAccount: event.target.value })

  onChangeSideAccount: (event) => unknown = (event) =>
    this.setState({ sideAccount: event.target.value })

  render: () => ReactElement<IProps> = () => (
    <Layout>
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <FormLabel>
            <b>SideChain Account:</b>&nbsp;
            <Input
              type="text"
              name="sideAccount"
              className="mapAcountsInput"
              defaultValue={this.state.sideAccount}
              onChange={this.onChangeSideAccount}
            />
          </FormLabel>
        </Grid>
        <Grid item>
          {this.state.accountsAreMapped ? (
            // eslint-disable-next-line jsx-a11y/accessible-emoji
            <Button variant="contained" disabled>
              Accounts Mapped! 😁 🎉
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={this.mapAccounts}>
              Map Accounts
            </Button>
          )}
        </Grid>
        <Grid item>
          <FormLabel>
            <b>MainChain Account:</b>&nbsp;
            <Input
              type="text"
              name="mainAccount"
              className="mapAcountsInput"
              defaultValue={this.state.mainAccount}
              onChange={this.onChangeMainAccount}
            />
          </FormLabel>
        </Grid>
      </Grid>

      {/* Buttons - Buy Dragons in blockchains */}
      <Grid container justify="center" spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={this.buyDragonInSideChain}>
            Buy New Dragon in Sidechain
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={this.buyDragonInMainChain}>
            Buy New Dragon in MainChain
          </Button>
        </Grid>
      </Grid>

      {/* Sidechain dragons - Mainchain dragons */}
      <Grid container justify="center" spacing={2}>
        <Grid item xs={6} className="containerGridDragonsItems">
          <h3 className="chainsHeadings">Side Chain Dragons</h3>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {this.state.sideDragons
                  ? this.state.sideDragons.map((value) => (
                      <Grid key={value} item>
                        <Dragon location="SIDECHAIN" id={value} />
                      </Grid>
                    ))
                  : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} className="containerGridDragonsItems">
          <h3 className="chainsHeadings">Main Chain Dragons</h3>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {this.state.mainDragons
                  ? this.state.mainDragons.map((value) => (
                      <Grid key={value} item>
                        <Dragon location="MAINCHAIN" id={value} />
                      </Grid>
                    ))
                  : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Oracle dragons */}
      <Grid container spacing={2}>
        <Grid item xs={6} className="containerGridDragonsItems">
          <h3 className="oracleHeading">Sidechain Gateway Dragons</h3>
          <Grid container justify="center" spacing={2}>
            {this.state.sidechainGatewayDragons
              ? this.state.sidechainGatewayDragons.map((value) => (
                  <Grid key={value['uid']} item>
                    <Dragon location="SIDECHAIN_GATEWAY" id={value['uid']} />
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>
        <Grid item xs={6} className="containerGridDragonsItems">
          <h3 className="oracleHeading">Mainchain Gateway Dragons</h3>
          <Grid container justify="center" spacing={2}>
            {this.state.mainchainGatewayDragons
              ? this.state.mainchainGatewayDragons.map((value) => (
                  <Grid key={value['uid']} item>
                    <Dragon location="MAINCHAIN_GATEWAY" id={value['uid']} />
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>
      </Grid>

      <style global jsx>{`
        .cardContainer {
          position: relative !important;
        }

        .container {
          margin-top: 20px;
        }

        .mapAcountsInput {
          width: 360px;
        }

        .chainsHeadings {
          text-align: center;
        }

        .oracleHeading {
          text-align: center;
          padding-top: 50px;
        }

        .containerGridDragonsItems {
          min-height: 300px;
        }
      `}</style>
    </Layout>
  )
}

export default Demo
