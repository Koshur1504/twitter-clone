import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import { addDoc } from "firebase/firestore";
import { useFirebase } from "./context/Firebase";

const TweetBox = ({ postCollectionRef, getPost }) => {
  const [tweetMessage, setTweetMessage] = useState("");
  const firebase = useFirebase();
  const user = firebase.user;

  console.log(user.photoURL);

  const sendTweet = async (e) => {
    e.preventDefault();

    await addDoc(postCollectionRef, {
      id: new Date(),
      displayName: user.displayName,
      // image:
      //   "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      photoURL: user.photoURL,
      text: tweetMessage,
      username: `${user.email.substring(0, user.email.indexOf(`@`))}`,
      verified: "",
    });

    setTweetMessage("");
    getPost();
  };

  return (
    <div className="tweetBox">
      <form onSubmit={(e) => sendTweet(e)}>
        <div className="tweetBox__input">
          <Avatar src={user.photoURL} />
          <input
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
            type="text"
            placeholder={`Hey ${user && user.displayName} What's happening?`}
          />
        </div>
        <Button type="submit" className="tweetBox__tweeetButton">
          Tweet
        </Button>
      </form>
    </div>
  );
};

export default TweetBox;
