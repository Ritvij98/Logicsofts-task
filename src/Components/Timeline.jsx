import React, { useEffect, useState } from "react";
import Post from "./Post";
import Pagination from "./Pagination";

// TWITTER TIMELINE UI COMPONENT

export default function Timeline({ posts, selectPost, clearPost }) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  let nPages = Math.ceil(posts.length / recordsPerPage);

  useEffect(() => {
    clearPost();
  }, []);

  return (
    <div>
      <div className="timeline">
        {posts
          ? posts.slice(indexOfFirstRecord, indexOfLastRecord).map((post) => {
              return (
                <div key={post.id}>
                  <Post postData={post} selectPost={selectPost} />
                </div>
              );
            })
          : "loading..."}
      </div>{" "}
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
