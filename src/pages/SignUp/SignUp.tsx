import { Alert, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { User } from '../../features/user/userApi';
import {
  selectUserError,
  selectUserStatus,
} from '../../features/user/userSlice';
import styles from './SignUp.module.css';
const { Title } = Typography;

export const SignUp = () => {
  const status = useAppSelector(selectUserStatus);
  const error = useAppSelector(selectUserError);

  const dispatch = useAppDispatch();

  const onFinish = async ({ username }: { username: User['username'] }) => {};

  return (
    <div className={styles.SignUpContainer}>
      <Title className={styles.SignUpTitle}>Регистрация</Title>

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
  );
};
