import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContex'

const Post = ({post}) => {
  
  return (
    <article className='post'>
        <Link to={`post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className='postData'>{post.datetime}</p>
        </Link>
        <p className='postBody'>{(post.body).length <= 25?post.body:`${(post.body).slice(0,25)}...`}</p>
    </article>
  )
}

export default Post