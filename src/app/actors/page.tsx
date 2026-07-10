"use client"

import * as React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { getAllActors } from '@/lib/data'
import { Actor } from '@/types'
import { cn } from '@/lib/utils'

const allSkills = ['Drama', 'Comedy', 'Action', 'Musical', 'Voiceover', 'Stunt Work', 'Improv', 'Period Drama', 'Noir', 'Sci-Fi']
const allGenres = ['Film', 'Television', 'Theatre', 'Commercial', 'Voiceover', 'Short Film']
const sortOptions = ['name', 'experience', 'recent']

export default function ActorsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = React.useState(initialQuery)
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>([])
  const [sortBy, setSortBy] = React.useState<string>('name')
  const [showFilters, setShowFilters] = React.useState(false)

  // Debounced search to update URL
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams()
      if (searchQuery) params.set('q', searchQuery)
      router.push(`/actors?${params.toString()}`)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, router])

  // Filter and sort actors
  const filteredActors = React.useMemo(() => {
    let actors = getAllActors()

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      actors = actors.filter(actor => 
        actor.name.toLowerCase().includes(query) ||
        actor.headline?.toLowerCase().includes(query) ||
        actor.skills.some(skill => skill.toLowerCase().includes(query))
      )
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      actors = actors.filter(actor => 
        selectedSkills.some(skill => actor.skills.includes(skill))
      )
    }

    // Genres filter
    if (selectedGenres.length > 0) {
      actors = actors.filter(actor => 
        selectedGenres.some(genre => actor.genres.includes(genre))
      )
    }

    // Sort
    actors.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'experience') return b.experience.length - a.experience.length
      return 0
    })

    return actors
  }, [searchQuery, selectedSkills, selectedGenres, sortBy])

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    )
  }

  const clearFilters = () => {
    setSelectedSkills([])
    setSelectedGenres([])
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search actors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" />
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="experience">Sort by Experience</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters */}
          {(selectedSkills.length > 0 || selectedGenres.length > 0) && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedSkills.map(skill => (
                <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => toggleSkill(skill)}>
                  {skill} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
              {selectedGenres.map(genre => (
                <Badge key={genre} variant="secondary" className="cursor-pointer" onClick={() => toggleGenre(genre)}>
                  {genre} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-6 px-2">
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-64 shrink-0 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Skills</h3>
                  <div className="space-y-2">
                    {allSkills.map(skill => (
                      <label key={skill} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSkills.includes(skill)}
                          onChange={() => toggleSkill(skill)}
                          className="rounded border-muted"
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold mb-3">Genres</h3>
                  <div className="space-y-2">
                    {allGenres.map(genre => (
                      <label key={genre} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedGenres.includes(genre)}
                          onChange={() => toggleGenre(genre)}
                          className="rounded border-muted"
                        />
                        <span className="text-sm">{genre}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Actors Grid */}
          <main className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredActors.length} actor{filteredActors.length !== 1 ? 's' : ''} found
            </div>

            {filteredActors.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No actors found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredActors.map((actor) => (
                  <motion.div
                    key={actor.slug}
                    layoutId={actor.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ActorCard actor={actor} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function ActorCard({ actor }: { actor: Actor }) {
  return (
    <Link href={`/actors/${actor.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer h-full">
        <div className="aspect-[3/4] overflow-hidden bg-muted relative">
          <img
            src={actor.photos[0]?.url || '/placeholder.jpg'}
            alt={actor.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-sm line-clamp-2">{actor.headline}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{actor.name}</h3>
          <div className="flex flex-wrap gap-1">
            {actor.skills.slice(0, 2).map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {actor.skills.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{actor.skills.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

import Link from 'next/link'
