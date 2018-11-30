import React from 'react'
import { socket } from './helpers/socket'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      chat: '',
      messages: [],
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    socket.on('pesan', data => {
      this.setState({
        messages: [...this.state.messages, data]
      })
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    socket.emit('data', this.state.chat)
    
    this.setState({ chat: '' })
  }

  render() {
    document.title = 'Chat App'
    
    return (
      <React.Fragment>
        {this.state.messages.map((pesan, i) => <li key={i}>{pesan}</li>)}
        <form onSubmit={this.handleSubmit}>
          <input name="chat" onChange={this.handleChange} value={this.state.chat} />
          <button>send</button>
        </form>
      </React.Fragment>
    )
  }
}

export default App