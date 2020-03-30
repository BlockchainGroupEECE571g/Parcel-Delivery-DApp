import React, { Component } from 'react'

class Grade extends Component {
  render() {
    return (
      <div className="dialog-container">
        <div className="dialog-header"> </div>{' '}
        <div className="dialog-body">
        <form
        onSubmit={async event => {
                event.preventDefault()
                const grade = this.grade.value;
                const gradeId=this.props.gradeId;
                console.log(grade+gradeId)
                await this.props.makeGrade(gradeId,grade)
                
              }}
            >
              <div className="inputdiv">
                <span>Please input your grade about order #{this.props.gradeId} (0-100)</span>
                <input
                  id="grade"
                  type="Number"
                  ref={input => {
                    this.grade = input
                  }}
                  className="form-control"
                  placeholder=""
                  required
                />
                </div>
                <div className="buttondiv">
                <button type="submit" className="gradeButton">
                Grade Courier{' '}
              </button>{' '}
              </div>
            </form>{' '}
        </div>{' '}
        <div className="dialog-footer">
          <button className="btn" onClick={this.props.closeGrade}>
            {' '}
            Close{' '}
          </button>{' '}
        </div>{' '}
      </div>
  )
}
}

export default Grade