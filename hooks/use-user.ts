import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';

export type User = {
  id: string;
  email: string;
  document_number: string;
  full_name: string;
  role_type: string;
  role_id: string;
};

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const raw = await SecureStore.getItemAsync("user");
      if (raw) setUser(JSON.parse(raw));
    })();
  }, []);

  return user;
}