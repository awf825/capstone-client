import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
class Instruments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      instruments: []
    }
  }

  async componentDidMount () {
    const response = await axios(`${apiUrl}/instruments`)
    this.setState({ instruments: response.data.instruments })
  }

  render () {
    const { user } = this.props
    const { instruments } = this.state
    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">Instruments</h3>
          {!user && <p className="m-0">Sign in to Post Items</p>}
        </div>
        <ListGroup>
          {instruments.map((instrument, i) => (
            <ListGroup.Item key={i}>
              <Link to={`/instruments/${instrument.id}`}>{instrument.name}</Link>
            </ListGroup.Item>))}
        </ListGroup>
      </Fragment>
    )
  }
}

export default withRouter(Instruments)
