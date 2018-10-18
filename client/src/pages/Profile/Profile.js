import React, { Component } from "react";
import {PostList, PostListItem} from '../../components/PostComponents/PostListDisplay';
import { Input, FormBtn } from "../../components/PostComponents/PostForm";
import API from '../../utils/API';
import './profile.css';
import MoneyButton from '@moneybutton/react-money-button'

const listokaCut = .01
const listokaAcctNum = '588' // FIXME: Put in secure place (read from db?)

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userPosts: [],
        authorName: "",
        displayedBio: "",
        author: this.props.match.params.id,
        payees: [{
            to: listokaAcctNum,
            amount: listokaCut,
            currency: 'USD'
          },
          {
            to: 783,
            amount: .09,
            currency: 'USD'
          }],
        tipAmt: 0,
        labelAmount: .10
    };
  };

  componentDidMount() {
    console.log(this.props)
    this.getPayees(this.props.match.params.id)
    let promises = [this.getPostsAndBio(this.props.match.params.id)]
    Promise.all(promises)
      .then(results => {
          console.log(results)
        this.setState({
          userPosts: results[0].posts,
          displayedBio: results[0].user.bio,
          authorName: results[0].user.username,
          // payees: [{
          //   to: listokaAcctNum,
          //   amount: listokaCut,
          //   currency: 'USD'
          // },
          // {
          //   to: 783,
          //   amount: .09,
          //   currency: 'USD'
          // }
        // ]
        });
      })
  };

  getPostsAndBio = (id) => {
    return API.getPostsAndBio(id).then(results => results.data);
  };

  getPayees = (id) => {
    API.getMoneyButton(id).then(results => {
      this.setState({
        payees: [{
            to: listokaAcctNum,
            amount: this.state.labelAmount - listokaCut,
            currency: 'USD'
        },
        {
            to: listokaAcctNum,
            amount: listokaCut,
            currency: 'USD'
        }]
    });
    console.log(results.data)
    console.log('payees: ' + JSON.stringify(this.state.payees))
    });
  };

  afterPayment = () => {
    alert("Payment Successful!")
  };

  handleError = err => {
    alert(`MoneyButton transaction failed. Error: ${err}`)
  };

  handleTipSubmit = (event) => {
    event.preventDefault();
    this.getPayees(this.props.match.params.id)
    this.setState({tipAmt: 0})
  };
  
  handleTipChange = (event) => {
    this.setState({ tipAmt: event.target.value })
  } ;

  render() {
      return (
        <div className='pagebody'>
            <div className='row'>
            <div className='col-lg-2'></div>
            <div className='col-lg-8'>
              <div className="categoryDetail">
              <div><h3>Profile of: {this.state.authorName}</h3></div>
              <div>
                Enter Tip Amount
                <Input
                  onChange={this.handleTipChange}
                  className='form-control'
                  type='text'
                  style={{ width: 80 + 'px' }}
                  value={this.state.tipAmt}
                  placeholder='.00'
                  name='tipAmt'
              />
              <FormBtn
                  onClick={this.handleTipSubmit}
              >Submit</FormBtn>
              </div>
                <div>
                  <MoneyButton
                    outputs={this.state.payees}
                    type='tip'
                    labelAmount={this.state.labelAmount}
                    label={`Tip to ${this.state.authorName}`}
                    onPayment={this.afterPayment}
                    onError={this.handleError}
                  />
                  {/* <MoneyButtonDonate display="input"
                  devMode={this.state.devMode} labelMoneyButton={this.state.labelMoneyButton}
                  labelAmount = {this.state.labelAmount} labelReference = {this.state.labelReference}
                  showTransaction = {this.state.configTransactionAfterPayment} showSocialMedia = {this.state.configSocialMediaAfterPayment}
                  buttonId={this.state.buttonId} buttonData={buttonData} clientIdentifier={this.state.clientIdentifier}
                  type={this.state.type} to={this.state.to} defaultAmount={this.state.defaultAmount}
                /> */}
                </div>
              <div>Bio of {this.state.authorName}: {this.state.displayedBio} </div>
                <PostList>
                {this.state.userPosts.map(userPosts => (
                    <PostListItem
                    key={userPosts._id}
                    authorName={userPosts.authorName}
                    body={userPosts.body}
                    categoryName={userPosts.categoryName}
                    comments={userPosts.comments}
                    purchasers={userPosts.purchasers}
                    tags={userPosts.tags}
                    teaser={userPosts.teaser}
                    title={userPosts.title}
                    _id={userPosts._id}
                    author={userPosts.author}
                    handleDeleteButton={this.handleDeleteButton}
                    />
                ))}
                </PostList>
              </div>
            </div>
            <div className='col-lg-2'></div>
            </div>
        </div>
      );
  };
};

export default Profile;