import { Landing } from '../components/landing';

export default function HomePage({ user }: { user: CombinedUser }) {
  return (
    <>
      <Landing user={user} />
    </>
  );
}
