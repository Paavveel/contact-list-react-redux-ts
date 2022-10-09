import { Alert, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AuthForm } from '../../components';
import { AuthFormValues, fetchUsers } from '../../features/user/userApi';
import { clearError, selectUserError } from '../../features/user/userSlice';
import styles from './Login.module.css';
const { Title } = Typography;

export const Login = () => {
  const error = useAppSelector(selectUserError);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const SignIn = (formValues: AuthFormValues) => {
    dispatch(fetchUsers(formValues));
  };

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [location, dispatch]);

  return (
    <div className={styles.loginFormContainer}>
      <div>
        <Title className={styles.loginFormTitle}>Авторизация</Title>
        <AuthForm buttonText='Войти' onFinish={SignIn} />
        <div>
          Или <Link to='signup'>зарегистрироваться</Link>
        </div>

        {error && (
          <Alert
            className={styles.loginError}
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
