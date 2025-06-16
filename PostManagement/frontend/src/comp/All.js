import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Ct from './Ct'


const All = () => {
    let [posts, setPosts] = useState([])
    let [f,setF]=useState(true)
    useEffect(() => {
        axios.get("http://localhost:5000/").then((res) => {
            setPosts(res.data)
        })
    }, [f])
    let cobj=useContext(Ct)
    let addlike=(pid)=>{
        if(cobj.state.token!="")
        {
            axios.post("http://localhost:5000/addlike",{"_id":pid,"uid":cobj.state._id}).then(()=>{
                setF(!f)
            })
        }

    }

    let adddlike=(pid)=>{
        if(cobj.state.token!="")
        {
            axios.post("http://localhost:5000/adddlike",{"_id":pid,"uid":cobj.state._id}).then(()=>{
                setF(!f)
            })
        }

    }

    return (
        <div className='newscon'>
            <h1>All Recent Posts</h1>
            <div className='news-grid'>
                {
                    posts.map((obj) => {
                        return (
                            <div className='newscard' key={obj._id}>
                                <h2>{obj.title.toUpperCase()}
                                    <span className='cat'>Cat: {obj.cat}</span>
                                </h2>
                                <p className='content'>{obj.text}</p>
                                <button onClick={()=>addlike(obj._id)}>Like:{obj.likes.length}</button>
                                <button onClick={()=>adddlike(obj._id)}>DLike:{obj.dlikes.length}</button>
                             
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

export default All