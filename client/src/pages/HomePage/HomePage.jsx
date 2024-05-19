import DocumentTitle from '../../components/DocumentTitle';
import {useSelector} from "react-redux";
import {selectLoading} from "../../redux/contacts/selectors.js";
export default function HomePage() {
    return (
        <div className="home-page">
            <DocumentTitle>Home Page</DocumentTitle>

            <div className="home-page-container">
                <h1 className="home-page-title">
                    Books Reading
                </h1>
                <div className="home-page-list">
                    <p>
                        Will help you
                    </p>
                    <ul>
                        <li>&#10004; Formulate your goal faster and start reading</li>
                        <li>&#10004; Proportionately distribute the load for each day</li>
                        <li>&#10004; Track personal success</li>
                    </ul>
                </div>
                <div className="home-page-list">
                    <p>
                        You can also
                    </p>
                    <ul>
                        <li>&#10004; Form a personal opinion independent of others</li>
                        <li>&#10004; Improve your professional qualities based on new knowledge</li>
                        <li>&#10004; Become an interesting interlocutor</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
