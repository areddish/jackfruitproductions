import type { Actor, SearchIndex } from '@/types'
import { actors } from '@/lib/data'

function buildSearchIndex(actorList: Actor[]): SearchIndex[] {
  return actorList.map((actor) => {
    const textParts = [
      actor.name,
      actor.bio,
      actor.location,
      actor.skills?.join(' ') || '',
      actor.languages?.map((l) => `${l.language} ${l.level}`).join(' ') || '',
      actor.accents?.join(' ') || '',
      actor.specialSkills?.join(' ') || '',
      actor.experience?.map((e) => `${e.production} ${e.role}`).join(' ') || '',
      actor.resume.parsedContent?.skills?.join(' ') || '',
      actor.resume.parsedContent?.specialAbilities?.join(' ') || '',
    ]

    return {
      id: actor.id,
      name: actor.name,
      slug: actor.slug,
      text: textParts.filter(Boolean).join(' ').toLowerCase(),
      headshotUrl: actor.headshotUrl,
      location: actor.location,
      playingAge: actor.playingAge,
      gender: actor.gender,
      skills: actor.skills || [],
      languages: actor.languages || [],
      accents: actor.accents || [],
    }
  })
}

const searchIndex = buildSearchIndex(actors)

export function searchActors(query: string): SearchIndex[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)

  return searchIndex.filter((entry) => {
    return terms.every((term) => entry.text.includes(term))
  })
}

export function getSearchSuggestions(query: string, limit = 5): SearchIndex[] {
  if (!query || query.trim().length < 2) {
    return []
  }

  const results = searchActors(query)
  return results.slice(0, limit)
}
