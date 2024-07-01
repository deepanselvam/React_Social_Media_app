import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import api from '../api/posts'
import{format} from 'date-fns'
import { useNavigate } from 'react-router-dom';
import usewindowSize from '../hooks/usewindowSize';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [posts,setPosts]=useState([])
  

    const [searchresult,setSearchResult]=useState([])
      const[search ,setSearch]=useState('')
      const[postTitle,setPostTitle]=useState('')
      const[postBody,setPostBody]=useState('') 
      const[edittitle,setEditTitle]=useState('')
      const[editbody,setEditBody]=useState('') 
      const {width}=usewindowSize()
      const {data, fetchError, isLoading}=useAxiosFetch('http://localhost:3500/posts')
    
      const navigate=useNavigate ()
      // fetching data from server
     useEffect(()=>{
      setPosts(data)
     },[data]
    )
    
    // searching function
      useEffect(()=>{
        const filteredResults = posts.filter((post) =>
          ((post.body).toLowerCase()).includes(search.toLowerCase())
          || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    
        setSearchResult(filteredResults.reverse())
      
      } ,[posts,search])
    
      // new post adding function
      const handleSubmit= async(e)=>{
         e.preventDefault()
         const id=posts.length?posts[posts.length -1].id +1:1
         const datetime= format(new Date(),'MMM dd, yyyy pp')
         const newPost={id,title:postTitle,datetime,body:postBody}
    
         try{
         const responce= await api.post('/posts',newPost)
         const allPosts=[...posts,newPost]
         setPosts(allPosts)
         setPostTitle('')
         setPostBody('')
         navigate('/')
        }catch(err){
          console.log(`Error ${err.message}`);
    
        }
      }
    
      // edit data
      const handleEdit=async(id)=>{
        const dateTime=format(new Date(),'MMM dd,yyyy pp')
        const updatePost={id,title:edittitle,dateTime,body:editbody}
        try{
          const responce=await api.put(`/posts/${id}`,updatePost)
          setPosts(posts.map(post=>post.id===id?{...responce.data}:post))
          setEditTitle('')
          setEditBody('')
          navigate('/')
          
        }
        catch(err){
          console.log(`Error ${err.message}`);
        }
    
      }
    
      // delete function 
      const handleDelete=async(id)=>{
        try {
          await api.delete(`/posts/${id}`);
          const postsList = posts.filter(post => post.id !== id);
          setPosts(postsList);
          navigate('/');
      } catch (err) {
          console.log(`Error: ${err.message}`);
      }
    }
    
    return (
        <DataContext.Provider value={{
            width,posts,search,setSearch,
            searchresult, fetchError, isLoading,
            handleSubmit,postBody,setPostBody,postTitle,setPostTitle,handleDelete, handleEdit, editbody,edittitle,setEditBody,setEditTitle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;