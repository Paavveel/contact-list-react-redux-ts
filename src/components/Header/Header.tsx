import { LogoutOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';
import { useAppDispatch } from '../../app/hooks';
import { logOut } from '../../features/auth/authSlice';

export const Header = () => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => dispatch(logOut());

  return (
    <PageHeader
      title='Имя'
      className='site-page-header'
      subTitle='subtitle'
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
        src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4',
      }}
    ></PageHeader>
  );
};
