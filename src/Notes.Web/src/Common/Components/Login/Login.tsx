import React from "react";

import { useAuth0 } from "../../../utils/hooks";

export default function Login() {
  const { loginWithRedirect } = useAuth0();

  const loginHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (loginWithRedirect) {
      return loginWithRedirect();
    }
  };

  return (
    <div>
      <button onClick={loginHandler}>Login</button>
    </div>
  );
}
