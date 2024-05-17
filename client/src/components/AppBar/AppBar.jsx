import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../redux/auth/selectors.js";
import {Navigation} from "../Navigation/Navigation.jsx";
import {UserMenu} from "../UserMenu/UserMenu.jsx";


export const AppBar = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <header className="header">
            <Navigation />
            {isLoggedIn ? <UserMenu /> : ""}
        </header>
    );
};