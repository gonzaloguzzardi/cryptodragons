import React from 'react'

export default class Wallet extends React.Component {
  render() {
    return (
      <div className="card" style={{ width: 286, height: 300, float: 'left', margin: 4 }}>
        <h5 className="card-header">{this.props.title}</h5>
        <div className="card-body">
          <p className="card-text">
            <strong>Qtd:</strong> {this.props.balance}
          </p>
          <p className="card-text">{this.props.description}</p>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col-sm">
              <button
                disabled={this.props.disabled}
                type="button"
                className="btn btn-primary"
                onClick={() => this.props.handleOnClick()}>
                {this.props.action}
              </button>
            </div>
            {this.props.handleOnClick2 && (
              <div className="col-sm">
                <button
                  disabled={this.props.disabled}
                  type="button"
                  className="btn btn-primary"
                  onClick={() => this.props.handleOnClick2()}>
                  {this.props.action2}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
