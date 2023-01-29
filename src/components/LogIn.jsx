import React from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useEffect } from "react";

export default function LogIn() {
  const [activeUser, setActiveUser] = useState(getAuth());

  // useEffect(() => {
  //   console.log(getAuth().currentUser?.displayName);
  // }, []);

  //!! Something is going on with login where the login error keeps firing
  function logIn() {
    // Initialize GoogleAuth
    const provider = new GoogleAuthProvider();

    // Signin with popup
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Google access token**
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // Google user info
        const user = result.user.split("")[0];
        console.log(user);
        setActiveUser(user.displayName);
      })
      .catch((error) => {
        // Error handling
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("STILL NOT WORKING");
        // Email of the user's account used
        // const email = error.customData.email;
        // The AuthCredential type that was used
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  function logOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Successful
        console.log("Signed out");
      })
      .catch((error) => {
        console.error(`${error.errorCode}: ${error.errorMessage}`);
      });

    console.log(getAuth().currentUser.displayName);
  }

  return (
    <div id="login-buttons">
      <button onClick={logIn}>Log In</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}
