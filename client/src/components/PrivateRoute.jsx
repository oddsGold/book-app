import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectIsInitialized, selectIsLoggedIn} from '../redux/auth/selectors';

/**- If the route is private and the user is logged in, render the component
 - Otherwise render <Navigate> to redirectTo

 */

export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isInitialized = useSelector(selectIsInitialized);

    if (!isInitialized) {
        return null;
    }

    return isLoggedIn ? Component : <Navigate to={redirectTo} />;
};
