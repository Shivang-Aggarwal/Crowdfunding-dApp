import React, { useEffect, useState } from "react";

import UserContext from "./UserContext";

const UserState = (props) => {
  const [state, setState] = useState(() => {
    // const local = JSON.parse(localStorage.getItem("currentUser"));
    // if(local) {
    //   return {
    //     email: local.email,
    //     isLoggedIn: local.isLoggedIn,
    //     firstname: local.firstname,
    //     lastname: local.lastname,
    //     account: local.account
    //   };
    // } else {
    //   return {
    //     email: "",
    //     isLoggedIn: false,
    //     firstname: "",
    //     lastname: "",
    //     account: ""
    //   };
    // }
    return {
      email: "",
      isLoggedIn: false,
      firstname: "",
      lastname: "",
      account: ""
    };
  });

  function update(result) {
    setState({
      email: result.email,
      isLoggedIn: result.isLoggedIn,
      firstname: result.firstname,
      lastname: result.lastname,
      account: result.account
    });

    localStorage.setItem("currentUser", JSON.stringify(state));
  }

  return (
    <UserContext.Provider value={{state, update}}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserState;