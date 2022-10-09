import { AuthFormValues } from '../../features/user/userApi';

export interface AuthFormProps {
  onFinish: (formValues: AuthFormValues) => void;
  buttonText: string;
}
