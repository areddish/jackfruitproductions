export interface Actor {
  id: string;
  name: string;
  slug: string;
  playingAge: [number, number];
  gender: 'Male' | 'Female' | 'Non-Binary' | 'Other';
  location: string;
  bio: string;
  headshotUrl: string;
  photos: Photo[];
  videos: Video[];
  resume: Resume;
  skills: string[];
  languages: LanguageLevel[];
  accents: string[];
  physicalAttributes: PhysicalAttributes;
  experience: Experience[];
  specialSkills: string[];
  availability: Availability;
  unions?: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  // Manually fixed
  headline?: string;
  training: Training[];
  contact?: any;
  genres: string[];
}

export interface Availability {
  status: 'available' | 'limited' | 'booked' | 'on-hold' | 'unavailable';
  startDate?: string;
  endDate?: string;
  notes?: string;
}

export interface Photo {
  id: string;
  url: string;
  category: PhotoCategory;
  alt: string;
  isPrimary?: boolean;
  // Manually fixed
  width?: number;
  height?: number;
  caption?: string;
}

export type PhotoCategory =
  | 'headshot'
  | 'lifestyle'
  | 'business'
  | 'athleisure'
  | 'party';

export interface Video {
  id: string;
  url: string;
  title: string;
  type: 'drama' | 'comedy' | 'other';
  source: 'youtube' | 'vimeo' | 'uploaded';
  thumbnail?: string;
}

export interface Resume {
  pdfUrl?: string;
  markdownContent?: string;
  parsedContent?: ParsedResume;
}

export interface ParsedResume {
  skills: string[];
  languages: LanguageLevel[];
  accents: string[];
  experience: Experience[];
  specialAbilities: string[];
  education: Education[];
  training: Training[];
}

export interface PhysicalAttributes {
  height: string;
  weight?: string;
  eyeColor: string;
  hairColor: string;
  bodyType?: string;
}

export interface Experience {
  id: string;
  production: string;
  role: string;
  type: 'film' | 'tv' | 'theatre' | 'commercial' | 'short';
  year: number;
  director?: string;
  description?: string;
}

export interface Education {
  institution: string;
  degree: string;
  year: number;
}

export interface Training {
  institution: string;
  focus: string;
  year: number;
}

export interface LanguageLevel {
  language: string;
  level: string; //'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export interface Cast {
  id: string;
  name: string;
  description?: string;
  roles: CastRole[];
  crewRoles: CrewRole[];
  createdAt: string;
  updatedAt: string;
}

export interface CastRole {
  id: string;
  roleName: string;
  title?: string;
  actorId?: string;
  description?: string;
  requirements?: string[];
  notes?: string;
  order: number;
}

export type CrewDepartment =
  | 'Directing'
  | 'Production'
  | 'Camera'
  | 'Sound'
  | 'Art'
  | 'Editing'
  | 'Costume & Makeup'
  | 'Lighting & Grip'
  | 'Music'
  | 'VFX';

export interface CrewMember {
  id: string;
  name: string;
  slug: string;
  department: CrewDepartment;
  title: string;
  headline?: string;
  location: string;
  bio: string;
  headshotUrl: string;
  skills: string[];
  credits: CrewCredit[];
  availability: Availability;
  contact?: any;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CrewCredit {
  id: string;
  production: string;
  role: string;
  type: 'film' | 'tv' | 'theatre' | 'commercial' | 'short';
  year: number;
  director?: string;
}

export interface CrewRole {
  id: string;
  positionName: string;
  department?: CrewDepartment;
  crewMemberId?: string;
  description?: string;
  notes?: string;
  order: number;
}

export interface FilterState {
  gender?: string[];
  ageRange?: [number, number];
  location?: string;
  skills?: string[];
  languages?: string[];
  availability?: string;
  experience?: string[];
  searchQuery?: string;
}

export interface ActorSearchResult {
  id: string;
  name: string;
  slug: string;
  text: string;
  headshotUrl: string;
  location: string;
  playingAge: [number, number];
  gender: 'Male' | 'Female' | 'Non-Binary' | 'Other';
  skills: string[];
  languages: LanguageLevel[];
  accents: string[];
}

export interface SearchIndex {
  actors: ActorSearchEntry[];
  skills: Set<string>;
  languages: Set<string>;
  locations: Set<string>;
  experiences: Set<string>;
}

export interface ActorSearchEntry {
  id: string;
  name: string;
  searchableText: string;
  skills: string[];
  languages: string[];
  locations: string[];
}
