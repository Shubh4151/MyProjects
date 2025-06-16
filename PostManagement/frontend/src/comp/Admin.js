import { useEffect, useContext, useState } from "react";
import Ct from "./Ct";
import Cookies from "js-cookie";
import axios from "axios";

const Admin = () => {
let obj = useContext(Ct);
  let [posts, setPosts] = useState([]);
  let [msg, setMsg] = useState("");
  let [f, setF] = useState(true);
  useEffect(() => {
    let x = Cookies.get("con");
    if (x != undefined) {
      obj.updstate(JSON.parse(x));
      axios.get("http://localhost:5000/admin").then((res) => {
        setPosts(res.data);
      });
    }
  }, [f]);
  let fun = (e) => {
    setMsg(e.target.value);
  };
  let upd = (str, id) => {
    axios
      .put("http://localhost:5000/updpost", { _id: id, status: str, comm: msg })
      .then(() => {
        setF(!f);
      });
  };
  return (
    <div className="newscon">
      <h1> Posts need to Review</h1>
      <div className="news-grid">
        {posts.map((objs) => {
          return (
            <>
              {objs.status == "pending" && (
                <div className="newscard" key={obj.id}>
                  <h2>
                    {objs.title.toUpperCase()}
                    <span className="cat">Cat: {objs.cat}</span>
                  </h2>
                  <p className="content">{objs.text}</p>
                  <button onClick={() => upd("approved", objs._id)}>
                    Accept
                  </button>
                  <button onClick={() => upd("reject", objs._id)}>
                    Reject
                  </button>
                  <input type="text" onChange={fun} />
                  <button onClick={() => upd("review", objs._id)}>
                    Send for revision
                  </button>
                  <div className="foot">
                    <span className="date">{objs.date}</span>
                    <span className="uname">{objs.uname}</span>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>

      <h1> Posts acepted</h1>
      <div className="news-grid">
        {posts.map((objs) => {
          return (
            <>
              {objs.status == "approved" && (
                <div className="newscard" key={obj.id}>
                  <h2>
                    {objs.title.toUpperCase()}
                    <span className="cat">Cat: {objs.cat}</span>
                  </h2>
                  <p className="content">{objs.text}</p>
                  <div className="foot">
                    <span className="date">{objs.date}</span>
                    <span className="uname">{objs.uname}</span>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
