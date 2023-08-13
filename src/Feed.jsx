import React, { useEffect, useState } from "react";
import "./Feed.css";
import TweetBox from "./TweetBox.jsx";
import Post from "./Post";
import { db } from "./firebase";
import { getDocs, collection } from "firebase/firestore";
import FlipMove from "react-flip-move";
import {useFirebase} from './context/Firebase'

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const postCollectionRef = collection(db, "posts");
  const firebase = useFirebase()

  

  

  const getPost = async () => {
    try {
      const data = await getDocs(postCollectionRef);
      const filteredData = data.docs.map((doc) => doc.data());
      setPosts(filteredData);
    } catch (error) {
      console.log(error);
    }
    
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>
      <TweetBox postCollectionRef={postCollectionRef} getPost={getPost} />
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.displayName}
            username={post.username}
            verified
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default Feed;
