import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

export const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <nav>
            <NavLink className="link" to="/">
                <img src="/images/BR.png" alt="Logo image"/>
            </NavLink>
            {isLoggedIn && (
                <NavLink className="link" to="/contacts">
                    Contacts
                </NavLink>
            )}
        </nav>
    );
};
