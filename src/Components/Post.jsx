import React, { useState, useEffect } from "react";

// SINGLE POST COMPONENT
export default function Post({ postData, selectPost }) {
  const [userData, setUserData] = useState(null);
  // FETCHING USER DATA
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/" + postData.userId)
      .then((response) => response.json())
      .then((json) => {
        setUserData(json);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="post">
      <div className="post-avatar">
      <img src="images/static-image-tb.png" alt="" />
      </div>
      {userData && (
        <div className="post-body" onClick={() => selectPost(postData)}>
            <p className="username">{userData.username}</p>
            <p className="title">{postData.title}</p>
            <p className="text">{postData.body}</p>
        </div>
      )}
    </div>
  );
}
