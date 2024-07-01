import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContex'

const Home = () => {
  const{searchresult,fetchError,isLoading}=useContext(DataContext)
    
  return (
    <main className='Home'>
      {isLoading &&
      <p className='statusMsg'>Loading post...</p>
      }
      {
        !isLoading && fetchError &&
        <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>
      }
      {
        !isLoading&& !fetchError&&
        (searchresult.length?(<Feed posts={searchresult}/>):(<p style={{marginTop:'2rem'}}>No Post Display</p>))

      }
        
    </main>
  )
}

export default Home