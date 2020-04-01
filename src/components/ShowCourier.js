import React, { Component } from 'react'

class ShowCourier extends Component {
  render() {
    return (
      <div className="dialog-container">
        <div className="dialog-body">
        <div className="dialog-content"> <span>Courier's grade:  &nbsp; &nbsp;</span> {this.props.myCourier[0]}</div>{' '}
        <div className="dialog-content"> <span>Total Number of grades:  &nbsp; &nbsp;</span> {this.props.myCourier[2]}</div>{' '}
        </div>{' '}
        <div className="dialog-footer">
          <button className="btn" onClick={this.props.closeCourier}>
            {' '}
            Close{' '}
          </button>{' '}
        </div>{' '}
      </div>
  )
}
}

export default ShowCourier