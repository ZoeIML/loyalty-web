import React from 'react'
import {connect} from 'react-redux'

import {receiveLogin} from '../actions/login'
import {registerAdmin, getAdmin} from '../apiClient'
import {set} from '../utils/localStorage'
import ErrorMessage from './ErrorMessage'

class AdmimRegister extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitNewUser = this.submitNewUser.bind(this)
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitNewUser () {
    if (this.state.username && this.state.password && this.state.name) {
      registerAdmin({...this.state})
        .then(token => set('token', token))
        .then(getAdmin)
        .then(admin => this.props.loginUser(admin))
        .then(() => this.props.history.push('/profile'))
    }
  }

  render () {
    return (
      <div className ='AdmimRegister'>
        <h2>AdmimRegister</h2>
        <ErrorMessage />
        <div><input type='text' name='name' placeholder='First Name' onChange={this.handleChange}/></div>
        <div><input type='text' name='username' placeholder='Username' onChange={this.handleChange}/></div>
        <div><input type='password' placeholder='Password' name='password' onChange={this.handleChange}/></div>
        <button onClick={this.submitNewUser}>Register</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginUser: user => {
      return dispatch(receiveLogin(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(AdmimRegister)
