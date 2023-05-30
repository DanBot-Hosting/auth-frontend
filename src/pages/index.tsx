import { Landing } from '../components/landing';
import type { CombinedUser } from '@util/types/common';

export default function HomePage({ user, isMobile }: { user: CombinedUser; isMobile: boolean }) {
  return (
    <>
      <Landing user={user} isMobile={isMobile} />
    </>
  );
}
