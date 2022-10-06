import { LogoutOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logOut } from '../../features/auth/authSlice';
import { selectUser } from '../../features/user/userSlice';

export const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <PageHeader
      title={user && user.username}
      className='site-page-header'
      extra={[
        <Button
          key='1'
          type='primary'
          icon={<LogoutOutlined />}
          onClick={handleLogOut}
        >
          Выйти
        </Button>,
      ]}
      avatar={{
        src: user && user.avatar,
      }}
    />
  );
};
