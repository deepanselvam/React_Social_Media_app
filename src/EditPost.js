import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import DataContext from './context/DataContex';

const EditPost = () => {
    const{  posts, handleEdit, editbody,edittitle,setEditBody,setEditTitle}=useContext(DataContext)
    const {id}=useParams();
    const post=posts.find(post=>(post.id).toString()===id)

    useEffect(()=>{
        if(post){
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    },[post,setEditBody,setEditTitle])
  return (
     <main className='NewPost'>
        {<>
        <h2>edit post</h2>
        <form className='newPostForm'
        onSubmit={(e)=>e.preventDefault()}>
             <label htmlFor="postTitle">Title:</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            value={edittitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="postBody">Post:</label>
                        <textarea
                            id="postBody"
                            required
                            value={editbody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button className="editButton" type='button' onClick={()=>handleEdit(post.id)}>submit</button>
                    </form>
                </>
            }
            {/* {!edittitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Visit Our Homepage</Link>
                    </p>
                </>
            } */}
            
     </main>
  )
}

export default EditPost