import React from 'react';
import { Link } from 'react-router-dom';
import './postListItem.css';

export const PostListItem = props => {
    return (
        <div className='card listItem' id={props._id}>
            <div className="card-body">
                <h4 className='card-title'><Link to={'/api/posts/' + props._id}>{props.title}</Link></h4>
                <span className="delete-btn" onClick={(event) => props.handleDeleteButton(event, props._id)}>
                    ✗
                </span>
                <h6 className='card-subtitle'>Posted by: {props.authorName}</h6>
                <p className='card-text'>{props.body}</p>
            </div>
        </div>
    );
};