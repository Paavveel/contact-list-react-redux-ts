import { Alert, Modal, Typography } from 'antd';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AuthForm } from '../../components';
import { AuthFormValues, createUser } from '../../features/user/userApi';
import { clearError, selectUserError } from '../../features/user/userSlice';
import styles from './SignUp.module.css';
const { Title } = Typography;

export const SignUp = () => {
  const error = useAppSelector(selectUserError);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createAccount = async (formValues: AuthFormValues) => {
    try {
      const newUser = await dispatch(createUser(formValues)).unwrap();
      if (newUser) {
        Modal.success({
          title: 'Вы успешно зарегистрировались!',
          onOk() {
            navigate('/', { replace: true });
          },
        });
      }
    } catch {}
  };

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
