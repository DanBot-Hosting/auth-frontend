import { Dispatch, SetStateAction } from 'react';

export * from './GeneralSettings';
export * from './PasswordSettings';
export * from './DangerZoneSettings';

export interface PageProps {
  user: CombinedUser;
  inputsDisabled: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
