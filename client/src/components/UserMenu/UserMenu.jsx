import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';

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
            <div>
                <button type="button" onClick={() => dispatch(logOut())}>
                    Logout
                </button>
            </div>
        </>
    );
};
