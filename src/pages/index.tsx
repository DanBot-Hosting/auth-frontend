import { Landing } from '../components/landing';

export default function HomePage({ user, isMobile }: { user: CombinedUser; isMobile: boolean }) {
  return (
    <>
      <Landing user={user} isMobile={isMobile} />
    </>
  );
}
