import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../messages'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
class Instruments extends Component {
  constructor (props) {
    super(props)
    this.state = {
      instruments: []
    }
  }

  async componentDidMount () {
    const { user } = this.props
    const response = await axios({
      url: `${apiUrl}/myinstruments/`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
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
    const { instruments } = this.state
    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">Instruments</h3>
        </div>
        <ListGroup>
          {instruments.map((instrument, i) => (
            <ListGroup.Item key={i}>
              <h4>{instrument.name}</h4>
              <Button
                variant="info"
                href={'#instruments/' + instrument.id}
                className= "m-2">
                Info
              </Button>
              <Button
                variant="danger"
                onClick={() => this.handleDelete(instrument.id)}
                className= "m-2">
                Delete
              </Button>
              <Button
                variant="secondary"
                href={'#instruments/' + instrument.id + '/edit'}
                className= "m-2">
                Update
              </Button>
            </ListGroup.Item>))}
        </ListGroup>
      </Fragment>
    )
  }
}

export default withRouter(Instruments)
