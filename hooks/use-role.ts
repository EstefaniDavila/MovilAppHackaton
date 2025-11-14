import { useUser } from './use-user';

export type Role = 'admin' | 'member';

export function useRole(): Role {
  const user = useUser();
  return (user?.role_type as Role) ?? 'member';
}