import {useSelector} from "react-redux";
import css from './AppBar.module.css';
import {selectIsLoggedIn} from "../../redux/auth/selectors.js";
import {Navigation} from "../Navigation/Navigation.jsx";
import {UserMenu} from "../UserMenu/UserMenu.jsx";
import {AuthNav} from "../AuthNav/AuthNav.jsx";


export const AppBar = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <header className={css.header}>
            <Navigation />
            {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </header>
    );
};