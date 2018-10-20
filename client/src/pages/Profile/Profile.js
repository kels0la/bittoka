import React, { Component } from "react";
import { PostList, PostListItem } from '../../components/PostComponents/PostListDisplay';
import { Input, FormBtn } from "../../components/PostComponents/PostForm";
import API from '../../utils/API';
import './profile.css';
import ListokaMoneyButton from "../../components/ListokaMoneyButton";
import AuthUserContext from "../../components/AuthUserSession/AuthUserContext";


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
      labelAmount: .10,
      payVal: .10
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
      console.log(results)
      this.setState({
        payees: [{
          to: results.data.user.moneyBtnId,
          amount: this.state.labelAmount - listokaCut,
          currency: 'USD'
        },
        {
          to: listokaAcctNum,
          amount: listokaCut,
          currency: 'USD'
        }]
      });
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
    //this.getPayees(this.props.match.params.id)
    this.setState({ tipAmt: 0, payVal: this.state.labelAmount })
  };

  handleTipChange = (event) => {
    this.setState({ tipAmt: event.target.value, labelAmount: event.target.value })
  };

  render() {
    return (
      <div className='pagebody'>
        <div className='row'>
          <div className='col-md-2'>
            <div className='profileWrapper rounded'>
              <img className="img-fluid" src="/images/tipjar.png " alt="tip jar"></img>
              <h6 className='profileSidebarHeader'>Leave {this.state.authorName} a tip!</h6>
              <hr></hr>
              <div className='profileSidebarWrapper'>
                Custom Tip Amount
                <Input
                  onChange={this.handleTipChange}
                  type='number'
                  step='0.01'
                  min='0.10'
                  className='form-control customTipField'
                  style={{ width: 180 + 'px' }}
                  value={this.state.tipAmt}
                  placeholder='.00'
                  name='tipAmt'
                />
                <FormBtn
                  onClick={this.handleTipSubmit}
                  className='customTipButton'
                >Update Tip Amount</FormBtn>
                <div className='tipButton'>
                  <AuthUserContext.Consumer>
                    {authUser => {
                      if (authUser) {
                        return (
                          <ListokaMoneyButton
                            payVal={this.state.payVal}
                            payeeId={this.state.author}
                            userId={authUser.dbUser._id}
                            txType='tip'
                            label={`Tip`}
                            paymentSuccessCbk={this.afterPayment}
                            onError={this.handleError}
                          />
                        )
                      }
                    }
                    }
                  </AuthUserContext.Consumer>
                </div>
              </div>
            </div>
          </div>

          <div className='col-lg-8'>
            <div className='profileContainer rounded'>
              <div className='bioContainer'>
                  <div className='profileHeader'>
                    <h2>{this.state.authorName}</h2>
                    <p>{this.state.displayedBio}</p>
                  </div>
                  <hr></hr>
              </div>
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
                    voters={userPosts.voters}
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