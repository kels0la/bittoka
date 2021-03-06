import React from 'react'

class CommentReplyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = e => this.setState({ value: e.target.value })
  handleSubmit = e => {
    e.preventDefault()
    this.props.toggleShowForm()
    this.props.submitComment({
      parentComment: this.props.parentComment,
      body: this.state.value,
    })
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className='flex bg-darkest-gray mt-2'>
          <ReplyTextArea onChange={this.handleChange} />
          <input className='border border-medium-gray medium-gray-darker hover:bg-body-background hover:text-brand-green ml-0 mr-1 my-1 text-light-gray cursor-pointer' type='submit' />
        </form>
      </React.Fragment>
    )
  }
}

const ReplyTextArea = props => {
  return (
    <textarea
      onChange={props.onChange}
      rows={props.rows || '5'}
      className='w-full outline-none bg-body-background border border-medium-gray text-light-gray rounded text-sm m-1 p-3'
    />
  )
}

export default CommentReplyForm