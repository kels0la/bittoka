import React from 'react'
import { Link } from 'react-router-dom'
import { UpArrowIcon } from '../../components/Widgets/UpArrowIcon'
import Paywall from './Paywall';
import renderHTML from 'react-render-html';
import UpvoteMoneyButton from '../../components/ListokaMoneyButton/UpvoteMoneyButton';
import CategoryFlair from '../../components/Widgets/CategoryFlair';
import { EditButton } from '../../components/Widgets';
import categories from '../../categories.json';
import SubNav from '../../components/subNav';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';

const ContentDetail = props => {
  const shareUrl = `https://listoka.com/posts/${props._id}`
    // http://localhost:3000/posts/${props._id}
  const title = `${props.title} by ${props.authorName}`
  
  return (
    <React.Fragment>
      
      <div className='flex flex-wrap flex-row items-center justify-center'>
        {categories.map(category => (
          <SubNav
            id={category.id}
            key={category.id}
            href={category.href}
            name={category.name}
          />
        ))}
      </div>

      <div className={`max-w-lg md:w-5/6 lg:w-4/5 mx-auto mt-0 p-4 rounded bg-darkest-gray text-light-gray`}>
        <div className='font-header text-3xl text-light-gray px-1 mb-2'>{props.title}</div>
        <div className='ml-0 mt-1 mb-5 text-xs px-1'>
          <span className='mr-1'>By: <Link className='text-brand-green no-underline' to={{ pathname: `/users/${props.author}` }}>{props.authorName}</Link></span>
          <span className='mr-1'>in <CategoryFlair categoryName={props.categoryName} /></span>
          <span className='mr-1'><UpArrowIcon />{props.voters ? props.voters.length : 0}</span>
          <span className='inline-block align-text-top mr-1'>
            <FacebookShareButton 
              url={shareUrl}
              quote={title}
            >
              <FacebookIcon 
                size={16}
                round={true}
              />
            </FacebookShareButton>
          </span>
          <span className='inline-block align-text-top'>
            <TwitterShareButton
              url={shareUrl}
              title={title}
            >
              <TwitterIcon 
                size={16}
                round={true}
              />
            </TwitterShareButton>
          </span>
          {props._id && <span className='pl-1'>
          <EditButton postId={props._id} authorId={props.author} /></span>}
        </div>

        <Paywall {...props}>
          <div className={`text-sm px-1 contentFormatting`}>
            {props.body && renderHTML(props.body)}
          </div>
          <UpvoteMoneyButton
            payeeId={props.author}
            afterUpvotePayment={props.afterUpvotePayment}
            postId={props._id}
            voters={props.voters}
          />
        </Paywall>

      </div>
    </React.Fragment>
  )
}

export default ContentDetail