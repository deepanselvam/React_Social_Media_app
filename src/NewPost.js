import React, { useContext } from 'react'
import DataContext from './context/DataContex'

const NewPost = () => {
  const{handleSubmit,postBody,setPostBody,postTitle,setPostTitle}=useContext(DataContext)
  return (
    <main className='NewPost'>
        <h2>New post</h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
            <label htmlFor="postTitle">Title:</label>
            <input
            id='postTitle'
             type="text"
             required
             
             value={postTitle}
             onChange={(e)=> setPostTitle(e.target.value)}/>

             <label htmlFor="postBody">Post:</label>
             <textarea id="postBody"
             required
             value={postBody}
             onChange={(e)=>setPostBody(e.target.value)}>
             </textarea>
             <button type='submit'>submit</button>
        </form>
    </main>
  )
}

export default NewPost