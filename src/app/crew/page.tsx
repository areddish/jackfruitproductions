"use client"

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllCrewMembers } from '@/lib/data'
import { CrewMember, CrewDepartment } from '@/types'

const allDepartments: CrewDepartment[] = [
  'Directing', 'Production', 'Camera', 'Sound', 'Art',
  'Editing', 'Costume & Makeup', 'Lighting & Grip', 'Music', 'VFX',
]

export default function CrewPage() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedDepartments, setSelectedDepartments] = React.useState<CrewDepartment[]>([])
  const [sortBy, setSortBy] = React.useState<string>('name')
  const [showFilters, setShowFilters] = React.useState(false)

  const filteredCrew = React.useMemo(() => {
    let crew = getAllCrewMembers()

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      crew = crew.filter(member =>
        member.name.toLowerCase().includes(query) ||
        member.title.toLowerCase().includes(query) ||
        member.skills.some(skill => skill.toLowerCase().includes(query))
      )
    }

    if (selectedDepartments.length > 0) {
      crew = crew.filter(member => selectedDepartments.includes(member.department))
    }

    crew = [...crew].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'experience') return b.credits.length - a.credits.length
      return 0
    })

    return crew
  }, [searchQuery, selectedDepartments, sortBy])

  const toggleDepartment = (department: CrewDepartment) => {
    setSelectedDepartments(prev =>
      prev.includes(department) ? prev.filter(d => d !== department) : [...prev, department]
    )
  }

  const clearFilters = () => {
    setSelectedDepartments([])
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
                placeholder="Search crew by name, title, or skills..."
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
                <SelectItem value="experience">Sort by Credits</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedDepartments.length > 0 && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedDepartments.map(department => (
                <Badge key={department} variant="secondary" className="cursor-pointer" onClick={() => toggleDepartment(department)}>
                  {department} <X className="h-3 w-3 ml-1" />
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
                  <h3 className="font-semibold mb-3">Department</h3>
                  <div className="space-y-2">
                    {allDepartments.map(department => (
                      <label key={department} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedDepartments.includes(department)}
                          onChange={() => toggleDepartment(department)}
                          className="rounded border-muted"
                        />
                        <span className="text-sm">{department}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Crew Grid */}
          <main className="flex-1">
            <div className="mb-4 text-sm text-muted-foreground">
              {filteredCrew.length} crew member{filteredCrew.length !== 1 ? 's' : ''} found
            </div>

            {filteredCrew.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No crew members found</h3>
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
                {filteredCrew.map((member) => (
                  <motion.div
                    key={member.slug}
                    layoutId={member.slug}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CrewCard member={member} />
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

function CrewCard({ member }: { member: CrewMember }) {
  return (
    <Link href={`/crew/${member.slug}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer h-full">
        <div className="aspect-[3/4] overflow-hidden bg-muted relative">
          <img
            src={member.headshotUrl || '/placeholder.jpg'}
            alt={member.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="text-sm line-clamp-2">{member.headline}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">{member.department}</Badge>
            <Badge variant="secondary" className="text-xs">{member.title}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
