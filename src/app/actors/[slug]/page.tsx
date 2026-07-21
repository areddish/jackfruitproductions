import { notFound } from 'next/navigation';
import { getActorBySlug, getAllActors } from '@/lib/data';
import ActorProfileContent from './ActorProfileContent';

export async function generateStaticParams() {
  const actors = getAllActors();
  return actors.map(actor => ({ slug: actor.slug }));
}

export default async function ActorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const actor = getActorBySlug(slug);
  
  if (!actor) {
    notFound();
  }

  return <ActorProfileContent actor={actor} />;
}
