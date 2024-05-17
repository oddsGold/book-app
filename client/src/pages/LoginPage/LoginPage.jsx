import DocumentTitle from '../../components/DocumentTitle';
import { LoginForm } from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
    return (
        <div>
            <DocumentTitle>Login</DocumentTitle>
            <div className="form-container sign-in-container">
                <LoginForm />
            </div>
        </div>
    );
}
