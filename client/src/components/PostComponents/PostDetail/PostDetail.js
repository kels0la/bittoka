import React, { Component } from "react";
import CommentBox from '../../CommentBox';
import TipButton from '../../../components/TipButton';
import  { Input, FormBtn } from '../PostForm';
import { Link } from 'react-router-dom';

const minTipAmt = .05

export class PostDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categoryName: props.categoryName,
            body: props.body,
            _id: props._id,
            title: props.title,
            teaser: props.teaser, 
            authorName: props.authorName, 
            categoryName: props.categoryName,
            tipAmt: 0,
            tipState: 0
        };
    }

    afterPayment = () => {
        alert("Payment Successful!")
    }

    handleTipChange = (evt) => {
        this.setState( { tipState: evt.target.value })
    }

    handleTipSubmit = (evt) => {
        evt.preventDefault()
        this.setState( { tipAmt: this.state.tipState })
    }

    render() {
        return (
            <div>
                <br />
                <Link to={{pathname:'/editpage', state:{categoryName: this.state.categoryName, body: this.state.body, _id: this.state._id, title: this.state.title, teaser: this.state.teaser, authorName: this.state.authorName, categoryName: this.state.categoryName}}}><i className="far fa-edit"> Edit Post</i></Link>
                <p>{this.props.title}</p>
                <p>By: {this.props.authorName}</p>
                <p>{this.props.body}</p>
                {(this.state.tipAmt >= minTipAmt ?
                    <TipButton
                        payeeId={this.props.author}
                        paymentAmt={this.state.tipAmt}
                        label='Tip to Upvote'
                        paymentSuccessCbk={this.afterPayment}
                    />
                    :
                    <div>
                    <p>To upvote, enter tip amount (minimum {minTipAmt}): </p>
                    <Input
                        onChange={this.handleTipChange} 
                        className='form-control'
                        />
                    <FormBtn
                        onClick={this.handleTipSubmit}
                    >
                    Submit Tip Amount
                    </FormBtn>
                    </div>
                )}
                <hr />
                <CommentBox />
            </div>
        )
    }
}