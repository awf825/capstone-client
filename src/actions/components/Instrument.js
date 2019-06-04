import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
class Instrument extends Component {
  constructor (props) {
    super(props)
    this.state = {
      instrument: {
        name: this.props.match.params.name,
        description: this.props.match.params.description,
        rent: this.props.match.params.rent,
        sale: this.props.match.params.sale,
        price: this.props.match.params.price,
        rate: this.props.match.params.rate
      }
    }
  }

  async componentDidMount () {
    const response = await
    axios(`${apiUrl}/instruments/${this.props.match.params.id}`)
    this.setState({ instrument: response.data.instrument })
  }

  // onDelete = async id => {
  // // await axios.delete(`${apiUrl}/movies/${id}`)
  // //   this.setState({ deleted: true })
  // // }

  render () {
    const { instrument } = this.state
    return (
      <Fragment>
        <p>{instrument.name}</p>
        <p>{instrument.description}</p>
        <p>{instrument.rent}</p>
        <p>{instrument.sale}</p>
        <p>Price: {instrument.price}</p>
        <p>Daily Rate: {instrument.rate}</p>
        <Link to='/'>Back to all items</Link>
      </Fragment>
    )
  }
}

export default Instrument
