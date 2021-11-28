import {Route, Redirect} from 'react-router-dom';
import Auth from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render={props => (Auth.haveToken() || Auth.getAuth()) ? ( <Component {...props} />) : (
    <Redirect to={{ pathname: "/login" }} />)
    }
    />
);

export default PrivateRoute;