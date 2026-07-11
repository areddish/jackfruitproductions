"use client"

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Filter, Sparkles, Film, Users, Star, ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getFeaturedActors } from '@/lib/data'

export default function LandingPage() {
  const featuredActors = React.useMemo(() => getFeaturedActors(), [])
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Navigate to actors page with search query
    window.location.href = `/actors?q=${encodeURIComponent(searchQuery)}`
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              Premium Casting Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
              Find the Perfect Cast
              <br />
              <span className="text-primary">for Your Vision</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
              Professional casting platform where directors browse talent and assemble dream casts.
              Browse verified actor profiles with photos, reels, resumes, and availability.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mx-auto max-w-xl mb-8">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search actors by name, skill, accent, or genre..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button type="submit" size="lg" className="px-8">
                  Search
                </Button>
              </div>
            </form>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 sm:gap-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Verified Actors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Genres</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">200+</div>
                <div className="text-sm text-muted-foreground">Productions</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="h-6 w-6 text-muted-foreground animate-bounce" />
        </motion.div>
      </section>

      {/* Featured Actors Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Featured Talent</h2>
            <p className="text-lg text-muted-foreground">
              Discover our handpicked selection of exceptional actors
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredActors.map((actor, index) => (
              <motion.div
                key={actor.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/actors/${actor.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                    <div className="aspect-[3/4] overflow-hidden bg-muted">
                      <img
                        src={actor.photos[0]?.url || '/placeholder.jpg'}
                        alt={actor.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{actor.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {actor.headline}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {actor.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {actor.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{actor.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/actors">
                Browse All Actors
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose JackFruit Studios</h2>
            <p className="text-lg text-muted-foreground">
              Everything you need for professional casting
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Film className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Profiles</h3>
              <p className="text-muted-foreground">
                Comprehensive actor profiles with photos, showreels, resumes, and detailed credits.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
              <p className="text-muted-foreground">
                Advanced filtering by skills, experience, availability, and physical attributes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cast Builder</h3>
              <p className="text-muted-foreground">
                Assemble your perfect cast with drag-and-drop role assignment and export tools.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/20 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Cast?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start exploring our talent database and find the perfect actors for your next production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/actors">
                <Star className="h-4 w-4" />
                Browse Talent
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/build-cast">
                <Film className="h-4 w-4" />
                Build a Cast
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
