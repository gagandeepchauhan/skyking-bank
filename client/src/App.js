import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Provider as AuthProvider } from './contexts/AuthContext';
import { Provider as UserDataProvider } from './contexts/UserDataContext';

import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import AccountScreen from './screens/AccountScreen';
import PageNotFoundScreen from './screens/PageNotFoundScreen';
import ResolveRoute from './ResolveRoute';

function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <Router>
          <Routes>
            <Route
              path='/'
              element={
                <ResolveRoute compliment={true} component={LoginScreen} />
              }
              compliment={true}
            />
            <Route
              path='/dashboard'
              element={
                <ResolveRoute component={DashboardScreen} />
              }
            />
            <Route
              path='/account/:userId'
              element={
                <ResolveRoute component={AccountScreen} />
              }
            />
            <Route path='*' element={<PageNotFoundScreen />} />
          </Routes>
        </Router>
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;
