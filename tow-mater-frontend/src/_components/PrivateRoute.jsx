import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '_helpers';

function PrivateRoute({ children }) {
    const { user: authUser } = useSelector(x => x.auth);

    // if not logged in redirect to login page with a return url
    if (!authUser) {
        return <Navigate to='/login' state={{ from: history.location }} />
    }

    // authorize so return child components
    return children;
}

export {PrivateRoute};