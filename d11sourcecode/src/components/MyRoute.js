// src/components/MyRoute.js
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

export const MyRoute = ({ component: Component, path, isPrivate, ...rest }) => {
    let isUserLogged = useSelector((state) => state.User.isLoggedIn);
    const tokenData = useSelector((state) => state.User.token);
    if (tokenData != null) {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const decoded = jwt_decode(user.token);
            const expDate = new Date(decoded.exp * 1000);
            console.log("expDate: ", expDate);
            const currentTime = new Date();
            if (expDate < currentTime) {
                isUserLogged = false;
            }
        } catch{
            isUserLogged = false;
        }
    }
    
    return (
        <Route
            path={path}
            render={(props) =>
                isPrivate && !isUserLogged
                    ? (
                        <Redirect to={{ pathname: '/login' }} />
                    ) : (
                        <Component {...props} />
                    )
            }
            {...rest}
        />
    )
}