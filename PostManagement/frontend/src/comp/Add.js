import axios from "axios"
import React, { useState, useEffect, useContext } from "react"
import Cookies from "js-cookie"
import Ct from "./Ct"

const Add = () => {
let [msg, setMsg] = useState("")
  let [artical, setArt] = useState({ title: "", text: "", cat: "" });
  let obj = useContext(Ct);
  useEffect(() => {
    let x = Cookies.get("con");
    if (x != undefined) {
      obj.updstate(JSON.parse(x));
    }
  }, []);

  let fun = (e) => {
    setArt({ ...artical, [e.target.name]: e.target.value });
  };
  let add = () => {
    axios
      .post("http://localhost:5000/add", {
        ...artical,
        date: new Date().toLocaleDateString(),
        uid: obj.state._id,
        uname: obj.state.name,
      })
      .then((res) => {
        setMsg(res.data.msg);
      });
  };

  return (
    <div className="add-con">
      <div className="add-box">
        <h2>🚀 CREATE YOUR POST</h2>
        <p>Share your thoughts with the world! 🌍</p>
        <h3 className="msg">{msg}</h3>
        <input type="text" placeholder="Title" value={artical.title} name="title" onChange={fun} />
        <textarea
        value={artical.text}
          placeholder="Details..."
          name="text"
          onChange={fun}
        ></textarea>
        <select name="cat" onChange={fun} value={artical.cat}>
          <option selected disabled value="">
            Category
          </option>
          <option value="sports">Sports</option>
          <option value="news">News</option>
          <option value="bs">Business</option>
          <option value="edu">Education</option>
          <option value="others">Others</option>
        </select>
        <button onClick={add}>🔥 ADD POST</button>
      </div>
    </div>
  );
};

export default Add;
