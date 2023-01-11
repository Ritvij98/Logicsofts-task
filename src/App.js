import React, { useState, useEffect } from "react";
import "./App.css";
import Timeline from "./Components/Timeline";
import OriginalPost from "./Components/OriginalPost";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Search from "./Components/Search";

import { Redirect, Route, Switch, useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        // to randomize post display order
        for (var a = 0; a < json.length; a++) {
          var x = json[a];
          var y = Math.floor(Math.random() * (a + 1));
          json[a] = json[y];
          json[y] = x;
        }
        setPosts(json);
        setPostsToDisplay(json);
      })
      .catch((err) => console.log(err));
  }, []);

  // FILTERING POSTS BY SEARCH TERM
  const search = (searchInput) => {
    console.log(searchInput);
    setPostsToDisplay(
      posts.filter((post) =>
        Object.values(post).some((value) =>
          value.toString().includes(searchInput)
        )
      )
    );
  };

  // SELECTING POST TO DISPLAY SINGLE POST
  const selectPost = (post) => {
    setSelectedPost(post);
    let path = post.id;
    history.push(`/${path}`);
  };
  const clearPost = () => {
    setSelectedPost(null);
  };

  return (
    <div className="App">
      <Sidebar />
      <div className="timeline-container">
        <Header selectedPost={selectedPost} />
        <div className="wrapper">
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route
              path="/home"
              children={
                <Timeline
                  posts={postsToDisplay}
                  selectPost={selectPost}
                  clearPost={clearPost}
                />
              }
            />
            <Route
              path="/:id"
              children={<OriginalPost postData={selectedPost} />}
            />
          </Switch>
        </div>
      </div>
      <Search search={search} />
    </div>
  );
}

export default App;
