import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import css from './Navigation.module.css';

export const Navigation = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <nav>
            <NavLink className={css.link} to="/">
                <img src="/images/BR.png" alt="Logo image"/>
            </NavLink>
            {isLoggedIn && (
                <NavLink className={css.link} to="/contacts">
                    Contacts
                </NavLink>
            )}
        </nav>
    );
};
