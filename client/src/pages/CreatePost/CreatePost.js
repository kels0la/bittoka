import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import withAuthorization from '../../components/AuthUserSession/withAuthorization';
import './createPost.css';
import { Input, TextArea, FormBtn } from "../../components/PostComponents/PostForm";
import API from '../../utils/API';
import authAxios from '../../utils/authAxios'

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorName: props.authUser.dbUser.username,
      body: "",
      categoryName: props.location.state.categoryName, //This comes from the CreatePostButton component
      // comments: "",
      // purchasers: "",
      tags: "",
      teaser: "",
      title: "",
      author: props.authUser.dbUser._id,
      redirectToNewPage: false,
      redirectPathId: "",
    };

    this.requestWithAuth = props.authUser.requestWithAuth
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    console.log(this.state);
    event.preventDefault();

    const { title, teaser, body } = this.state
    if (title && teaser && body) {
      const data = {
        title: title,
        teaser: teaser,
        body: body,
        author: this.state.author,
        authorName: this.state.authorName,
        categoryName: this.state.categoryName
      }

      authAxios({
        method: 'post',
        url: '/api/posts',
        data: data
      }).then(result => {
        console.log('authAxios result: ', result)
        this.setState({ redirectToNewPage: true, redirectPathId: result.data._id })
      }).catch(err => console.log(err))
    }
  }

  render() {

    if (this.state.redirectToNewPage) {
      return (
        <Redirect to={{ pathname: '/api/posts/' + this.state.redirectPathId }} />
      )
    };

    return (
      <div>
        <div className="col-md-4">
          <form>
            <Input
              value={this.state.title}
              onChange={this.handleInputChange}
              name="title"
              placeholder="Title of your Story"
            />
            <Input
              value={this.state.teaser}
              onChange={this.handleInputChange}
              name="teaser"
              placeholder="Enter your teaser here"
            />
            <TextArea
              value={this.state.body}
              onChange={this.handleInputChange}
              name="body"
              placeholder="Enter Story Here"
            />
            <FormBtn
              disabled={!(this.state.title && this.state.teaser && this.state.body)}
              onClick={this.handleFormSubmit}
            >
              Submit Story
            </FormBtn>
          </form>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-6"></div>
      </div>
    );
  };
};

const authCondition = (authUser) => !!authUser

export default withAuthorization(authCondition)(CreatePost);