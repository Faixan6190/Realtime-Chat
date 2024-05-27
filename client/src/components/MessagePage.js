import React from "react";
import { useParams } from "react-router-dom";

const MessagePage = () => {
  const params = useParams();
  console.log("params", params);
  return <div></div>;
};

export default MessagePage;
