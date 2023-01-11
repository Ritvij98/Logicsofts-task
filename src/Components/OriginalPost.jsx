import React, { useEffect, useState } from "react";

// SEPERATE POST PAGE COMPONENT
export default function OriginalPost({ postData }) {
  const [comments, setComments] = useState(null);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`),
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${postData.userId}/comments`
      ),
    ])
      .then(([resUsers, resComments]) =>
        Promise.all([resUsers.json(), resComments.json()])
      )
      .then(([jsonUsers, jsonComments]) => {
        setUserData(jsonUsers);
        setComments(jsonComments);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="og-post">
      <div className="post">
        <div className="post-avatar">
          <img src="images/static-image-tb.png" alt="" />
        </div>
        {userData && (
          <div className="post-body">
            <p className="username">{userData.username}</p>
            <p className="title">{postData.title}</p>
            <p className="text">{postData.body}</p>
            <br />
            <div className="post-image">
              <img src="images/static-image.png" alt="" />
            </div>
            <br />
            <div className="post-commments">
              <p>
                <strong>Comments</strong>
              </p>
              {comments &&
                comments.map((comment) => {
                  return (
                    <div className="comment" key={comment.id}>
                      <p className="comment-name">{comment.name}</p>
                      <p className="comment-body">{comment.body}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
