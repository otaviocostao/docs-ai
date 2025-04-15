import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import LoginModal from '../../components/LoginModal/LoginModal';

const Login = () => {

  return (
    <div className="login-container">
        <LoginModal />
    </div>
  );
};

export default Login;