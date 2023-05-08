import { Landing } from '../components/landing';
import type { CombinedUser } from '@util/types/common';

export default function HomePage({ user }: { user: CombinedUser }) {
  return (
    <>
      <Landing user={user} />
    </>
  );
}
