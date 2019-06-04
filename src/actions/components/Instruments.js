import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import messages from '../messages'
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

  handleDelete = (id) => {
    const { alert, user } = this.props
    axios({
      url: `${apiUrl}/instruments/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(() => {
        axios(`${apiUrl}/instruments`)
          .then(res => {
            this.setState({ instruments: res.data.instruments })
          })
          .then(() => alert(messages.deleteSuccess, 'success'))
      })
      .catch(error => {
        console.error(error)
        alert(messages.deleteFailure, 'danger')
      })
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
          {user && instruments.map((instrument, i) => (
            <ListGroup.Item key={i}>
              <h4>{instrument.name}</h4>
              <Button
                variant="info"
                href={'#instruments/' + instrument.id}>
                Info
              </Button>
              <Button
                variant="danger"
                onClick={() => this.handleDelete(instrument.id)}>
                Delete
              </Button>
              <Button
                variant="secondary"
                href={'#instruments/' + instrument.id + '/edit'}
              >
                Update
              </Button>
            </ListGroup.Item>))}
          {!user && instruments.map((instrument, i) => (
            <ListGroup.Item key={i}>
              <Link to={`/instruments/${instrument.id}`}>{instrument.name}</Link>
            </ListGroup.Item>))}
        </ListGroup>
      </Fragment>
    )
  }
}

export default withRouter(Instruments)
