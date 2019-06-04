import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import messages from '../messages'
class EditInstrument extends Component {
  constructor (props) {
    super(props)

    this.state = {
      instrument: null
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/instruments/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => {
        this.setState({ instrument: response.data.instrument })
      })
      .catch(alert(messages.updateFailure, 'danger'))
  }

  handleEdit = (event, id) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/instruments/${id}/`,
      method: 'PATCH',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        instrument: {
          name: this.state.name,
          description: this.state.description,
          rent: this.state.rent,
          sale: this.state.sale,
          price: this.state.price,
          rate: this.state.rate
        }
      }
    })
      .then(() => alert(`You updated ${this.state.name}`, 'success'))
      .then(() => this.props.history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ name: '', description: '', rent: '', sale: '', price: '', rate: '' })
        alert('Something went wrong, try again', 'danger')
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  resetForm = () => this.setState({
    name: '',
    description: '',
    rent: '',
    sale: '',
    price: '',
    rate: ''
  })

  render () {
    const { instrument } = this.state
    return (
      <Form className='form' onSubmit={(e) => this.handleEdit(e, instrument.id)}>
        <h3>Edit:</h3>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            name="name"
            value={this.name}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            required
            name="description"
            value={this.description}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="rent">
          <Form.Label>Rent</Form.Label>
          <Form.Control
            type="text"
            placeholder="For Rent?"
            required
            name="rent"
            value={this.rent}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="sale">
          <Form.Label>Sale</Form.Label>
          <Form.Control
            type="text"
            placeholder="For Sale?"
            required
            name="sale"
            value={this.sale}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="string"
            placeholder="Price"
            required
            name="price"
            value={this.price}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="rate">
          <Form.Label>Rate</Form.Label>
          <Form.Control
            type="integer"
            placeholder="Rate"
            required
            name="rate"
            value={this.rate}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="m-1"
        >
          Submit
        </Button>
        <Button
          variant="danger"
          type="button"
          className="m-1"
          onClick={this.resetForm}
        >
          Reset
        </Button>
      </Form>
    )
  }
}

export default withRouter(EditInstrument)
