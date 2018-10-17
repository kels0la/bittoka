import React from "react";
import './NestedComments.css';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export const NestedComments = (props) => {
    const createdDate = props.createdAt && props.createdAt.slice(0, 10)
    return (
        <React.Fragment>
            <div className="subComment rounded">
                <hr />
                <p>Subcomments</p>
                <p className='smallPostCommentText'><Link to={{ pathname: `/user/${props.author}` }}>{props.authorName}</Link>&nbsp;&nbsp;<i className="fas fa-calendar-alt"></i>&nbsp;&nbsp;<Moment fromNow>{props.createdAt}</Moment>&nbsp;&nbsp;<i className="fab fa-bitcoin"></i>&nbsp;&nbsp;[earned $x.xx]</p>
                <br></br>
                <p className='mediumPostText'> {props.body}</p>
            </div>
        </React.Fragment>
    );
};