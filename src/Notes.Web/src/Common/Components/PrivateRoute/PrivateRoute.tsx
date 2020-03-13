import React, { useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useAuth0 } from "../../../utils/hooks";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType;
}

export default function PrivateRoute({
  component: Component,
  path,
  ...rest
}: PrivateRouteProps) {
  const { loading, isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        if (loginWithRedirect) {
          await loginWithRedirect({
            appState: { targetUrl: path }
          });
        }
      }
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = (props: RouteProps) =>
    isAuthenticated === true ? <Component {...props} /> : null;

  return <Route path={path} render={render} {...rest} />;
}
