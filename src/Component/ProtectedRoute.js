import React from 'react';
import {Route, Redirect} from 'react-router-dom'

export const ProtectedRoute = ({
                                   component: Component,
                                   ...rest
                               }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (true) {
                    console.log("props",props);
                    console.log("rest",rest);
                    console.log("comp",Component);
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};
