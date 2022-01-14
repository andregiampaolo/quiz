import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import LoginPage from './pages/login/Login';
import HomePage from './pages/home/Home';

import { AuthContext, AuthProvider } from './contexts/auth';
import DashboardPage from './pages/dashboard/Dashboard';
import QuizPage from './pages/quiz/Quiz';
import QuizResultPage from './pages/quiz/QuizResult';
import ErrorPage from './pages/error/Error';
import SignUpPage from './pages/sign-up/SignUp';

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>
    }

    if (!authenticated) {
      return <Navigate to="/" />;
    }

    return children;
  }

  return (

    <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/sign-up" element={<SignUpPage />}></Route>
          <Route exact path="/login" element={<LoginPage />}></Route>
          <Route exact path="/dashboard" element={
            <Private>
              <DashboardPage />
            </Private>
          } />

          <Route exact path="/quiz/:id/:name" element={
            <Private>
              <QuizPage />
            </Private>
          } />

          <Route exact path="/quiz-result" element={
            <Private>
              <QuizResultPage />
            </Private>
          } />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default AppRoutes;