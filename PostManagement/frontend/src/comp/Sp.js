import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Sp = () => {
  let [posts, setPosts] = useState([])
  useEffect(() => {
      axios.get("http://localhost:5000/posts/sports").then((res) => {
          setPosts(res.data)
      })
  }, [])

  return (
      <div className='newscon'>
          <h1>All Recent Posts</h1>
          <div className='news-grid'>
              {
                  posts.map((obj) => {
                      return (
                          <div className='newscard' key={obj.id}>
                              <h2>{obj.title.toUpperCase()}
                                  <span className='cat'>Cat: {obj.cat}</span>
                              </h2>
                              <p className='content'>{obj.text}</p>
                              <div className='foot'>
                                  <span className='date'>{obj.date}</span>
                                  <span className='uname'>{obj.uname}</span>
                              </div>
                          </div>
                      )
                  })
              }
          </div>
      </div>
  )
}

export default Sp