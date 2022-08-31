import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import { history } from '_helpers';
import { Nav, PrivateRoute } from '_components';
import { Home } from 'home';
import { Login } from 'login';
import './App.css';

function App() {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <div className='app-container bg-light'>
      <Nav />
      <div className='container pt-4 pb-4'>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
