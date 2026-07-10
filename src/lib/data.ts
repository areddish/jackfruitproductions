import type { Actor, Cast } from '@/types'

export const actors: Actor[] = [
  {
    id: '1',
    name: 'Maya Chen',
    slug: 'maya-chen',
    playingAge: [25, 35],
    gender: 'Female',
    location: 'Los Angeles, CA',
    bio: 'Versatile actress with 8 years of professional experience in film, television, and theatre. Known for her ability to embody complex characters with emotional depth and authenticity. Trained at Juilliard with additional work in method acting techniques.',
    headshotUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop', category: 'headshot', alt: 'Maya Chen professional headshot', isPrimary: true },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop', category: 'lifestyle', alt: 'Maya Chen lifestyle photo' },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=800&fit=crop', category: 'business', alt: 'Maya Chen business attire' },
      { id: 'p4', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=800&fit=crop', category: 'athleisure', alt: 'Maya Chen athleisure wear' },
      { id: 'p5', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=800&fit=crop', category: 'party', alt: 'Maya Chen party photo' },
    ],
    videos: [
      { id: 'v1', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Drama Showreel 2024', type: 'drama', source: 'youtube' },
      { id: 'v2', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Comedy Scenes Compilation', type: 'comedy', source: 'youtube' },
    ],
    resume: {
      pdfUrl: '/resumes/maya-chen.pdf',
      parsedContent: {
        skills: ['Emotional Range', 'Improvisation', 'Stage Combat', 'Dialects', 'Script Analysis'],
        languages: [{ language: 'English', level: 'Native' }, { language: 'Mandarin', level: 'Fluent' }, { language: 'Spanish', level: 'Intermediate' }],
        accents: ['American Standard', 'British RP', 'Cantonese'],
        experience: [
          { id: 'e1', production: 'The Last Summer', role: 'Lead - Sarah Chen', type: 'film', year: 2024, director: 'James Cameron' },
          { id: 'e2', production: 'Breaking Point', role: 'Supporting - Detective Liu', type: 'tv', year: 2023, director: 'Vince Gilligan' },
          { id: 'e3', production: 'Hamlet', role: 'Ophelia', type: 'theatre', year: 2022, director: 'Kenneth Branagh' },
        ],
        specialAbilities: ['Piano (Advanced)', 'Ballet', 'Archery', 'Swimming'],
        education: [{ institution: 'Juilliard School', degree: 'BFA Acting', year: 2016 }],
        training: [
          { institution: 'The Actors Studio', focus: 'Method Acting', year: 2018 },
          { institution: 'RADA London', focus: 'Classical Theatre', year: 2020 },
        ],
      },
    },
    skills: ['Emotional Range', 'Improvisation', 'Stage Combat', 'Dialects', 'Script Analysis', 'Piano', 'Ballet', 'Archery'],
    languages: [{ language: 'English', level: 'Native' }, { language: 'Mandarin', level: 'Fluent' }, { language: 'Spanish', level: 'Intermediate' }],
    accents: ['American Standard', 'British RP', 'Cantonese'],
    physicalAttributes: { height: "5'6\"", eyeColor: 'Brown', hairColor: 'Black', bodyType: 'Slim' },
    experience: [
      { id: 'e1', production: 'The Last Summer', role: 'Lead - Sarah Chen', type: 'film', year: 2024, director: 'James Cameron' },
      { id: 'e2', production: 'Breaking Point', role: 'Supporting - Detective Liu', type: 'tv', year: 2023, director: 'Vince Gilligan' },
      { id: 'e3', production: 'Hamlet', role: 'Ophelia', type: 'theatre', year: 2022, director: 'Kenneth Branagh' },
    ],
    specialSkills: ['Piano (Advanced)', 'Ballet (10 years)', 'Archery', 'Swimming', 'Mandarin Translation'],
    availability: { status: 'available', startDate: '2025-01-15', notes: 'Available for auditions and bookings' },
    featured: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    slug: 'marcus-johnson',
    playingAge: [30, 40],
    gender: 'Male',
    location: 'New York, NY',
    bio: 'Award-winning actor with a commanding screen presence. Specializes in dramatic roles with a strong background in Shakespearean theatre. Brings intensity and vulnerability to every performance.',
    headshotUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop', category: 'headshot', alt: 'Marcus Johnson professional headshot', isPrimary: true },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=800&fit=crop', category: 'lifestyle', alt: 'Marcus Johnson lifestyle photo' },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=800&fit=crop', category: 'business', alt: 'Marcus Johnson business attire' },
      { id: 'p4', url: 'https://images.unsplash.com/photo-1567-10-15-08-00-00-gettyimages-1234567890?w=800&h=800&fit=crop', category: 'athleisure', alt: 'Marcus Johnson athleisure' },
    ],
    videos: [
      { id: 'v1', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Drama Reel 2024', type: 'drama', source: 'youtube' },
    ],
    resume: {
      pdfUrl: '/resumes/marcus-johnson.pdf',
      parsedContent: {
        skills: ['Shakespearean Acting', 'Voice Projection', 'Character Development', 'Physical Comedy'],
        languages: [{ language: 'English', level: 'Native' }, { language: 'French', level: 'Advanced' }],
        accents: ['American Standard', 'British RP', 'Southern American', 'Scottish'],
        experience: [
          { id: 'e1', production: 'King Lear', role: 'King Lear', type: 'theatre', year: 2024, director: 'Sam Mendes' },
          { id: 'e2', production: 'The Wire', role: 'Detective Williams', type: 'tv', year: 2023 },
        ],
        specialAbilities: ['Singing (Baritone)', 'Fencing', 'Public Speaking'],
        education: [{ institution: 'Yale School of Drama', degree: 'MFA Acting', year: 2015 }],
        training: [
          { institution: 'The Globe London', focus: 'Shakespearean Performance', year: 2017 },
        ],
      },
    },
    skills: ['Shakespearean Acting', 'Voice Projection', 'Character Development', 'Physical Comedy', 'Singing', 'Fencing'],
    languages: [{ language: 'English', level: 'Native' }, { language: 'French', level: 'Advanced' }],
    accents: ['American Standard', 'British RP', 'Southern American', 'Scottish'],
    physicalAttributes: { height: "6'1\"", eyeColor: 'Brown', hairColor: 'Black', bodyType: 'Athletic' },
    experience: [
      { id: 'e1', production: 'King Lear', role: 'King Lear', type: 'theatre', year: 2024, director: 'Sam Mendes' },
      { id: 'e2', production: 'The Wire', role: 'Detective Williams', type: 'tv', year: 2023 },
    ],
    specialSkills: ['Singing (Baritone)', 'Fencing', 'Public Speaking', 'Martial Arts'],
    availability: { status: 'available', startDate: '2025-02-01' },
    featured: true,
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    slug: 'sofia-rodriguez',
    playingAge: [20, 30],
    gender: 'Female',
    location: 'Miami, FL',
    bio: 'Dynamic and expressive actress with a passion for comedy and drama. Bilingual in English and Spanish with authentic Latin American background. Brings warmth and energy to every role.',
    headshotUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=800&fit=crop', category: 'headshot', alt: 'Sofia Rodriguez professional headshot', isPrimary: true },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=800&fit=crop', category: 'lifestyle', alt: 'Sofia Rodriguez lifestyle' },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop', category: 'party', alt: 'Sofia Rodriguez party photo' },
    ],
    videos: [
      { id: 'v1', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Comedy Showreel', type: 'comedy', source: 'youtube' },
      { id: 'v2', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Drama Scenes', type: 'drama', source: 'youtube' },
    ],
    resume: {
      parsedContent: {
        skills: ['Comedic Timing', 'Physical Comedy', 'Improvisation', 'Dance', 'Singing'],
        languages: [{ language: 'Spanish', level: 'Native' }, { language: 'English', level: 'Fluent' }],
        accents: ['Latin American', 'American Standard', 'Mexican'],
        experience: [
          { id: 'e1', production: 'Crazy Ex-Girlfriend', role: 'Val - Guest Star', type: 'tv', year: 2023 },
          { id: 'e2', production: 'West Side Story', role: 'Anita', type: 'theatre', year: 2022 },
        ],
        specialAbilities: ['Salsa Dancing', 'Bachata', 'Flamenco', 'Guitar'],
        education: [{ institution: 'New School Tisch', degree: 'BFA Musical Theatre', year: 2019 }],
        training: [],
      },
    },
    skills: ['Comedic Timing', 'Physical Comedy', 'Improvisation', 'Dance', 'Singing', 'Salsa', 'Guitar'],
    languages: [{ language: 'Spanish', level: 'Native' }, { language: 'English', level: 'Fluent' }],
    accents: ['Latin American', 'American Standard', 'Mexican'],
    physicalAttributes: { height: "5'4\"", eyeColor: 'Brown', hairColor: 'Brunette', bodyType: 'Curvy' },
    experience: [
      { id: 'e1', production: 'Crazy Ex-Girlfriend', role: 'Val - Guest Star', type: 'tv', year: 2023 },
      { id: 'e2', production: 'West Side Story', role: 'Anita', type: 'theatre', year: 2022 },
    ],
    specialSkills: ['Salsa Dancing (Expert)', 'Bachata', 'Flamenco', 'Guitar', 'Cooking'],
    availability: { status: 'available', startDate: '2025-01-20' },
    featured: false,
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-11-15T10:00:00Z',
  },
  {
    id: '4',
    name: 'James O\'Brien',
    slug: 'james-obrien',
    playingAge: [35, 45],
    gender: 'Male',
    location: 'Chicago, IL',
    bio: 'Character actor with extensive theatre and film credits. Known for playing complex antagonists and morally ambiguous characters. Strong voice work and accent capabilities.',
    headshotUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop', category: 'headshot', alt: 'James O\'Brien professional headshot', isPrimary: true },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop', category: 'lifestyle', alt: 'James O\'Brien lifestyle' },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop', category: 'business', alt: 'James O\'Brien business' },
    ],
    videos: [
      { id: 'v1', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Character Acting Reel', type: 'drama', source: 'youtube' },
    ],
    resume: {
      parsedContent: {
        skills: ['Character Acting', 'Voice Work', 'Accents', 'Intense Dramatics', 'Monologue'],
        languages: [{ language: 'English', level: 'Native' }, { language: 'German', level: 'Intermediate' }],
        accents: ['Irish', 'American Standard', 'British RP', 'German', 'Russian'],
        experience: [
          { id: 'e1', production: 'The Godfather', role: 'Corleone - Stage', type: 'theatre', year: 2024 },
          { id: 'e2', production: 'Narcos', role: 'Cartel Member', type: 'tv', year: 2022 },
        ],
        specialAbilities: ['Fire Fighting', 'Stunt Work', 'Weapon Handling'],
        education: [{ institution: 'DePaul University', degree: 'BFA Theatre', year: 2010 }],
        training: [{ institution: 'Stunt Academy LA', focus: 'Stunt Performance', year: 2016 }],
      },
    },
    skills: ['Character Acting', 'Voice Work', 'Accents', 'Intense Dramatics', 'Stunt Work'],
    languages: [{ language: 'English', level: 'Native' }, { language: 'German', level: 'Intermediate' }],
    accents: ['Irish', 'American Standard', 'British RP', 'German', 'Russian'],
    physicalAttributes: { height: "5'10\"", eyeColor: 'Blue', hairColor: 'Red', bodyType: 'Stocky' },
    experience: [
      { id: 'e1', production: 'The Godfather', role: 'Corleone - Stage', type: 'theatre', year: 2024 },
      { id: 'e2', production: 'Narcos', role: 'Cartel Member', type: 'tv', year: 2022 },
    ],
    specialSkills: ['Stunt Work Certified', 'Weapon Handling', 'Fire Fighting', 'Driving (Manual)'],
    availability: { status: 'booked', endDate: '2025-03-01', notes: 'Currently filming, available after March' },
    featured: false,
    createdAt: '2024-04-05T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
  },
  {
    id: '5',
    name: 'Aisha Patel',
    slug: 'aisha-patel',
    playingAge: [22, 32],
    gender: 'Female',
    location: 'Atlanta, GA',
    bio: 'Rising star in independent film with a powerful screen presence. Specializes in dramatic roles and social issue films. Strong background in improv and comedy as well.',
    headshotUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop',
    photos: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=800&fit=crop', category: 'headshot', alt: 'Aisha Patel professional headshot', isPrimary: true },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop', category: 'lifestyle', alt: 'Aisha Patel lifestyle' },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=800&h=800&fit=crop', category: 'athleisure', alt: 'Aisha Patel athleisure' },
    ],
    videos: [
      { id: 'v1', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Drama Reel 2024', type: 'drama', source: 'youtube' },
    ],
    resume: {
      parsedContent: {
        skills: ['Dramatic Intensity', 'Improvisation', 'Emotional Vulnerability', 'Script Writing'],
        languages: [{ language: 'English', level: 'Native' }, { language: 'Hindi', level: 'Fluent' }, { language: 'Gujarati', level: 'Advanced' }],
        accents: ['American Standard', 'Indian (Bombay)', 'British RP'],
        experience: [
          { id: 'e1', production: 'The Namesake', role: 'Supporting - Stage', type: 'theatre', year: 2023 },
          { id: 'e2', production: 'Short Film Festival Winner', role: 'Lead', type: 'short', year: 2024 },
        ],
        specialAbilities: ['Yoga Instructor', 'Meditation', 'Creative Writing'],
        education: [{ institution: 'Atlanta School of Acting', degree: 'Certificate', year: 2020 }],
        training: [],
      },
    },
    skills: ['Dramatic Intensity', 'Improvisation', 'Emotional Vulnerability', 'Yoga', 'Creative Writing'],
    languages: [{ language: 'English', level: 'Native' }, { language: 'Hindi', level: 'Fluent' }, { language: 'Gujarati', level: 'Advanced' }],
    accents: ['American Standard', 'Indian (Bombay)', 'British RP'],
    physicalAttributes: { height: "5'5\"", eyeColor: 'Brown', hairColor: 'Black', bodyType: 'Slim' },
    experience: [
      { id: 'e1', production: 'The Namesake', role: 'Supporting - Stage', type: 'theatre', year: 2023 },
      { id: 'e2', production: 'Short Film Festival Winner', role: 'Lead', type: 'short', year: 2024 },
    ],
    specialSkills: ['Yoga (Certified)', 'Meditation', 'Creative Writing', 'Photography'],
    availability: { status: 'available', startDate: '2025-01-10' },
    featured: true,
    createdAt: '2024-05-12T10:00:00Z',
    updatedAt: '2024-11-20T10:00:00Z',
  },
]

export const initialCasts: Cast[] = [
  {
    id: 'cast-1',
    name: 'Summer Drama Project',
    description: 'A dramatic film set in coastal Maine during summer 2025',
    roles: [
      { id: 'r1', roleName: 'Lead Female - Sarah', actorId: '1', order: 0, description: '30s, introspective, strong-willed' },
      { id: 'r2', roleName: 'Lead Male - David', order: 1, description: '40s, weathered, complex antagonist' },
      { id: 'r3', roleName: 'Supporting - Maria', order: 2, description: '20s, energetic, comic relief' },
    ],
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z',
  },
]

export function getActorBySlug(slug: string): Actor | undefined {
  return actors.find((actor) => actor.slug === slug)
}

export function getActorById(id: string): Actor | undefined {
  return actors.find((actor) => actor.id === id)
}

export function getFeaturedActors(): Actor[] {
  return actors.filter((actor) => actor.featured)
}

export function getAllActors(): Actor[] {
    return actors;
}