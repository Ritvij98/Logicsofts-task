import React from "react";
import { NavLink } from "react-router-dom";

export default function Header({ selectedPost }) {
  return (
    <div className="header">
      {selectedPost ? (
        <>
          <NavLink to="/home">
            <i className="fa-solid fa-left-long"></i>
          </NavLink>
          <h3>Post</h3>
        </>
      ) : (
        <div>
          <h3>Home</h3>
        </div>
      )}
    </div>
  );
}
