import { Dispatch, SetStateAction } from 'react';
import { CombinedUser } from '@util/types/common';

export * from './GeneralSettings';
export * from './PasswordSettings';
export * from './DangerZoneSettings';

export interface PageProps {
  user: CombinedUser;
  inputsDisabled: boolean;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
