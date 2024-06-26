import React, { Component, ReactElement } from 'react'

import Layout from 'components/layout'
import Dragon from 'components/dragon'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import FormLabel from '@mui/material/FormLabel'

import MainchainAPI from 'services/blockchain-interaction/mainchain'
import SidechainAPI from 'services/blockchain-interaction/sidechain'
import { getDragonsFromOracleAPI } from 'services/oracle'

interface IProps {
  any
}
interface IState {
  sideAccount?: string
  mainAccount?: string
  sideDragons?: Array<string>
  mainDragons?: Array<string>
  sidechainGatewayDragons?: Array<string>
  mainchainGatewayDragons?: Array<string>
  accountsAreMapped?: boolean
}

class Demo extends Component<IProps> {
  state: IState

  constructor(props: IProps) {
    super(props)

    this.state = {
      sideAccount: '0x4db65f5e24acbedb56e0d89855b41ee4450d476a',
      mainAccount: '0xa64d35d224c85f239820a229ca3acf5575d28fdd',

      sideDragons: [],
      mainDragons: [],
      sidechainGatewayDragons: [],
      mainchainGatewayDragons: [],

      accountsAreMapped: false,
    }
    this.initAccounts()
  }

  initAccounts: () => unknown = () => {
    MainchainAPI.getClientHelper().then(
      (account) => account && this.setState({ mainAccount: account.account })
    )
    SidechainAPI.getClientHelper().then(
      (account) => account && this.setState({ sideAccount: account.account })
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
    getDragonsFromOracleAPI().then((result) => {
      result &&
        this.setState({
          sidechainGatewayDragons: result[0]['sidechain-gateway-results'],
          mainchainGatewayDragons: result[1]['mainchain-gateway-results'],
        })
    })
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
      MainchainAPI.mapAccountToSidechainAccount(this.state.sideAccount),
      SidechainAPI.mapAccountToMainchainAccount(this.state.mainAccount),
    ]).then((values) => {
      console.log('[MAINCHAIN]: MAPEO EN MAINCHAIN', values[0])
      console.log('[SIDECHAIN]: MAPEO EN SIDECHAIN', values[1])
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
      <Grid container justifyContent="center" mt={2} mb={2}>
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
        <Grid item ml={2}>
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
        <Grid item ml={2}>
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
      <Grid container justifyContent="center" spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={this.buyDragonInSideChain}>
            Buy New Dragon in Sidechain
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={this.buyDragonInMainChain}>
            Buy New Dragon in Mainchain
          </Button>
        </Grid>
      </Grid>

      {/* Sidechain dragons - Mainchain dragons */}
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={6} className="containerGridDragonsItems">
          <h3 className="chainsHeadings">Sidechain Dragons</h3>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {this.state.sideDragons
                  ? this.state.sideDragons.map((value) => (
                      <Grid key={value} item>
                        <Dragon mappedAccounts={this.state.accountsAreMapped} location="SIDECHAIN" id={value} owned={true} />
                      </Grid>
                    ))
                  : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} className="containerGridDragonsItems">
          <h3 className="chainsHeadings">Mainchain Dragons</h3>
          <Grid container spacing={2}>
            <Grid item>
              <Grid container spacing={2}>
                {this.state.mainDragons
                  ? this.state.mainDragons.map((value) => (
                      <Grid key={value} item>
                        <Dragon mappedAccounts={this.state.accountsAreMapped} location="MAINCHAIN" id={value} owned={true} />
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
          <Grid container justifyContent="center" spacing={2}>
            {this.state.sidechainGatewayDragons
              ? this.state.sidechainGatewayDragons.map((value) => (
                  <Grid item>
                    <Dragon mappedAccounts={this.state.accountsAreMapped} location="SIDECHAIN_GATEWAY" id={value} owned={true} />
                  </Grid>
                ))
              : null}
          </Grid>
        </Grid>
        <Grid item xs={6} className="containerGridDragonsItems">
          <h3 className="oracleHeading">Mainchain Gateway Dragons</h3>
          <Grid container justifyContent="center" spacing={2}>
            {this.state.mainchainGatewayDragons
              ? this.state.mainchainGatewayDragons.map((value) => (
                  <Grid item>
                    <Dragon mappedAccounts={this.state.accountsAreMapped} location="MAINCHAIN_GATEWAY" id={value} owned={true} />
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

        .mapAcountsInput {
          width: 380px;
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
