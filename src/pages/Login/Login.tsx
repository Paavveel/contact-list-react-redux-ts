import { Alert, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AuthForm } from '../../components';
import { AuthFormValues, fetchUsers } from '../../features/user/userApi';
import { selectUserError } from '../../features/user/userSlice';
import styles from './Login.module.css';
const { Title } = Typography;

export const Login = () => {
  const error = useAppSelector(selectUserError);

  const dispatch = useAppDispatch();

  const SignIn = async (formValues: AuthFormValues) => {
    dispatch(fetchUsers(formValues));
  };

  return (
    <div className={styles.loginFormContainer}>
      <div>
        <Title className={styles.loginFormTitle}>Авторизация</Title>
        <AuthForm onFinish={SignIn} />
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
