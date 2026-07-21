import { notFound } from 'next/navigation';
import { getCrewMemberBySlug, getAllCrewMembers } from '@/lib/data';
import CrewProfileContent from './CrewProfileContent';

export async function generateStaticParams() {
  const crewMembers = getAllCrewMembers();
  return crewMembers.map(member => ({ slug: member.slug }));
}

export default async function CrewProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getCrewMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return <CrewProfileContent member={member} />;
}
