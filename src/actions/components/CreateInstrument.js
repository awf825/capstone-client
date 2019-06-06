import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
class CreateInstrument extends Component {
  constructor (props) {
    super(props)

    this.state = {
      instrument: {
        name: '',
        description: '',
        rent: { checked: false },
        sale: { checked: false },
        price: '',
        rate: ''
      }
    }
  }

  onCreateInstrument = event => {
    event.preventDefault()
    const { alert, history } = this.props
    const { instrument } = this.state
    axios({
      url: apiUrl + '/create-instrument',
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        instrument: {
          name: instrument.name,
          description: instrument.description,
          rent: instrument.rent.checked,
          sale: instrument.sale.checked,
          price: instrument.price,
          rate: instrument.rate
        }
      }
    })
      .then(() => alert(`You created ${instrument.name}`, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ instrument: {
          name: '',
          description: '',
          rent: false,
          sale: false,
          price: '',
          rate: ''
        }
        })
        alert('Something went wrong, try again', 'danger')
      })
  }

  handleChange = event => {
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const editedInstrument =
    Object.assign(this.state.instrument, updatedField)

    this.setState({ instrument: editedInstrument })
  }

  handleCheck = event => {
    const updatedCheckbox = {
      [event.target.name]: { checked: (event.target.checked) }
    }

    const editedCheckbox =
    Object.assign(this.state.instrument, updatedCheckbox)

    this.setState({ instrument: editedCheckbox })
  }

  resetForm = () => this.setState({ instrument: {
    name: '',
    description: '',
    rent: { checked: false },
    sale: { checked: false },
    price: '',
    rate: ''
  }
  })

  render () {
    const { instrument } = this.state
    return (
      <Form className='form' onSubmit={this.onCreateInstrument}>
        <h3>Post:</h3>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            required
            name="name"
            value={instrument.name}
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
            value={instrument.description}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="Rent or Sale">
          <div className="mb-3">
            <Form.Check inline label="For Rent"
              type="checkbox"
              name="rent"
              checked={instrument.rent.checked}
              onChange={this.handleCheck} />
          </div>
          <div className="mb-3">
            <Form.Check inline label="For Sale"
              type="checkbox"
              name="sale"
              checked={instrument.sale.checked}
              onChange={this.handleCheck} />
          </div>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="string"
            placeholder="Price"
            required
            name="price"
            value={instrument.price}
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
            value={instrument.rate}
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

export default withRouter(CreateInstrument)
