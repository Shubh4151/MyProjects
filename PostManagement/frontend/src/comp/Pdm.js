import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Ct from "./Ct";
import Cookies from "js-cookie"

const Pdm = () => {
  let obj = useContext(Ct);
  let [posts, setPosts] = useState([]);
  let x = Cookies.get("con");
  x = JSON.parse(x);
  useEffect(() => {
    axios.get(`http://localhost:5000/postsbyme/${x._id}`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div className="newscon">
      <h1>All Recent Posts</h1>
      <div className="news-grid">
        {posts.map((obj) => {
          return (
            <div className="newscard" key={obj.id}>
              <h2>
                {obj.title.toUpperCase()}
                <span className="cat">Cat: {obj.cat}</span>
              </h2>
              <p className="content">{obj.text}</p>
              
              <div className="foot">
                {obj.status == "review" && <span className="date">MSG:{obj.comm}</span>}

                <span className="uname">Status:{obj.status}</span>
              </div>

              <div className="foot">
                <span className="date">{obj.date}</span>

                <span className="uname">{obj.uname}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Pdm;
