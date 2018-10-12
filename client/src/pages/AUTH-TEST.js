import React from 'react'
import withAuthorization from '../components/AuthUserSession/withAuthorization'
import axios from '../utils/authAxios'

class AuthTest extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      response: null,
      url: '',
      method: 'get',
      data: '{ "body":"you can use json here" }'
    }
  }

  doRequest = (event) => {
    event.preventDefault()
    let data
    if (this.state.data) {
      data = JSON.parse(this.state.data)
    }
    axios({
      method: this.state.method,
      url: this.state.url,
      data: data
    }).then(response => {
      this.setState({ response })
      console.log(response)
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  render() {
    const  formStyle = {
      width: '80%',
      margin: '0 auto'
    }
    return (
      <div style={{width: '80%', margin: '20px auto'}}>
        <form style={formStyle}>
          <div className='form-group'>
            <select name='method' onChange={this.handleChange}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
          <div className='form-group'>
            <input style={formStyle} type='text' name='url' onChange={this.handleChange} placeholder='url' />
          </div>
          <div className='form-group'>
            <textarea style={formStyle} name='data' onChange={this.handleChange} value={this.state.data} />
          </div>
          <input type='submit' onClick={this.doRequest} />
        </form>
      </div>
    )
  }

}

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(AuthTest)