import React, { useEffect, useState } from "react";
import { auth, provider } from './config';
import { signInWithPopup } from "firebase/auth";
import TodoApp from "../TodoPage/todoPage";

function SignIn() {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(localStorage.getItem("email"));
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem("email", data.user.email);
    });
  };

  return (
    <div>
      {value ? <TodoApp email={value} /> : <button onClick={handleClick}>Sign In With Google</button>}
    </div>
  );
}

export default SignIn;
