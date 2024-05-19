import DocumentTitle from '../../components/DocumentTitle';
import {useSelector} from "react-redux";
import {selectLoading} from "../../redux/contacts/selectors.js";
export default function HomePage() {
    return (
        <div className="home-page">
            <DocumentTitle>Home Page</DocumentTitle>

            <div className="home-page-container">
                <h1 className="home-page-title">
                    Welcome to contact page
                </h1>
            </div>
        </div>
    );
}
