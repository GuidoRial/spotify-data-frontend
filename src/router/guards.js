import useAuth from '../store/auth';

export const beforeEnterNotLoggedIn = (to, from) => {
  const authStore = useAuth();

  if (!authStore.isLoggedIn) {
    return { name: 'login' };
  }
};

export const beforeEnterLoggedIn = (to, from) => {
  const authStore = useAuth();

  if (authStore.isLoggedIn) {
    return { name: 'dashboard' };
  }
};
