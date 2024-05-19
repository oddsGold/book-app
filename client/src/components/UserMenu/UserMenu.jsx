import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import {NavLink} from "react-router-dom";

export const UserMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    return (
        <>
            <div className="user-name">
                <p>
                    <span className="first-letter">
                        {user.name[0].toUpperCase()}
                    </span>
                    {user.name}
                </p>
            </div>
            <div className="logout-b">
                <NavLink to="/library">
                    <img src="/images/icon_library.png" alt="icon_library"/>
                </NavLink>
                <NavLink to="/" className="icon_home">
                    <img src="/images/icon_home.png" alt="icon_home"/>
                </NavLink>
                <span className="logout" onClick={() => dispatch(logOut())}>Logout</span>
            </div>
        </>
    );
};
