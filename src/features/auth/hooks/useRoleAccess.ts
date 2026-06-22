import { useUser } from '@clerk/nextjs';

export const useRoleAccess = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  const isAdmin = user?.publicMetadata?.role === 'ADMIN';

  return {
    isLoaded,
    isSignedIn,
    isAdmin,
    user
  };
};
