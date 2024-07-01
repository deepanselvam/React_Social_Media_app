import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import DataContext from './context/DataContex'

const PostPage = () => {
const{posts,handleDelete}=useContext(DataContext)
    const{id}=useParams()
    const post=posts.find(post=>(post.id).toString()===id)
  return (
    <main className='PostPage'>
        <article className='post'>
            {post &&
            <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
           <Link to={`/edit/${post.id}`}><button className='editButton'>Edit</button>
           </Link> 
            <button className='deleteButton' onClick={()=> handleDelete(post.id)}>
                delete post
            </button>
            </>}
            {!post &&
            <>
             <h2>page not found</h2>
             <p>Well, that's disappointing.</p>
               <p ><Link to='/'>Visit our HomePage </Link>
               </p>
            </> }
        </article>
        
        <Link></Link>
        
    </main>
  )
}

export default PostPage