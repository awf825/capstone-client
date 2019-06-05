import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
class CreateInstrument extends Component {
  constructor () {
    super()

    this.state = {
      instrument: {
        name: '',
        description: '',
        rent: '',
        sale: '',
        price: '',
        rate: ''
      }
    }
  }

  onCreateInstrument = event => {
    event.preventDefault()
    console.log(event.target.checked)
    const { alert, history } = this.props
    axios({
      url: apiUrl + '/create-instrument',
      method: 'POST',
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
      .then(() => alert(`You created ${this.state.name}`, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ name: '',
          description: '',
          rent: '',
          sale: '',
          price: '',
          rate: '' })
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
        <Form>
          {['radio'].map(type => (
            <div key={`inline-${type}`} className="mb-3">
              <Form.Check inline label="For Rent"
                type={type}
                id={`inline-${type}-1`}
                value={this.rent}
                onChange={event.target.checked} />
              <Form.Check inline label="For Sale"
                type={type}
                id={`inline-${type}-2`}
                value={this.sale}
                onChange={event.target.checked}/>
            </div>
          ))}
        </Form>
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

export default withRouter(CreateInstrument)
