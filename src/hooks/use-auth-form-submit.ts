import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { AppRoutes } from '@/services';
import { useAppDispatch } from '@/store';
import { addUser } from '@/store/users';
import { createFormSchema } from '@/utils';

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

export function useAuthFormSubmit() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (formData: FormData) => {
    dispatch(addUser(formData));
    navigate(AppRoutes.HOME);
  };
}
