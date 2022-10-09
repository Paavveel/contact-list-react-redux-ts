import { Alert, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AuthForm } from '../../components';
import { clearError, selectUserError } from '../../features/user/userSlice';
import styles from './SignUp.module.css';
const { Title } = Typography;

export const SignUp = () => {
  const error = useAppSelector(selectUserError);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const createAccount = () => {};

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [location, dispatch]);

  return (
    <div className={styles.SignUpContainer}>
      <div>
        <Title className={styles.SignUpTitle}>Регистрация</Title>
        <AuthForm
          confirmPassword
          buttonText='Зарегистрироваться'
          onFinish={createAccount}
        />
        <div>
          Или <Link to='/'>войти</Link>
        </div>
        {error && (
          <Alert
            className={styles.SignUpError}
            message={error}
            type='error'
            showIcon
            closable
          />
        )}
      </div>
    </div>
  );
};
