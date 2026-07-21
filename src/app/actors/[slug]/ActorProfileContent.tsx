'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Mail, Phone, Globe, Download, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Actor, Experience, Training } from '@/types'

export default function ActorProfileContent({ actor }: { actor: Actor }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = React.useState(false)

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % actor.photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + actor.photos.length) % actor.photos.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Photo Gallery Header */}
      <div className="relative">
        <div className="h-[40vh] md:h-[60vh] bg-muted relative overflow-hidden">
          <img
            src={actor.photos[currentPhotoIndex]?.url || actor.photos[0]?.url}
            alt={actor.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Navigation Arrows */}
          {actor.photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Photo Indicators */}
          {actor.photos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {actor.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPhotoIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentPhotoIndex ? 'bg-white w-6' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Actor Name Overlay */}
          <div className="absolute bottom-8 left-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{actor.name}</h1>
            <p className="text-lg text-white/80">{actor.headline}</p>
          </div>

          {/* Gallery Button */}
          {actor.photos.length > 1 && (
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Play className="h-4 w-4" />
              View Gallery
            </button>
          )}
        </div>

        {/* Quick Info Bar */}
        <div className="bg-muted/50 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-6 text-sm">
              {actor.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {actor.location}
                </div>
              )}
              {actor.availability && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className={actor.availability.status === 'available' ? 'text-green-600' : 'text-muted-foreground'}>
                    {actor.availability.status === 'available' ? 'Available' : actor.availability.status === 'limited' ? 'Limited Availability' : 'Unavailable'}
                  </span>
                </div>
              )}
              {actor.unions && actor.unions.length > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{actor.unions.join(', ')}</Badge>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs Section */}
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="training">Training</TabsTrigger>
                <TabsTrigger value="resume">Resume</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {actor.bio && (
                      <div>
                        <h3 className="font-semibold mb-2">Biography</h3>
                        <p className="text-muted-foreground whitespace-pre-line">{actor.bio}</p>
                      </div>
                    )}

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {actor.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>

                    {actor.languages && actor.languages.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-3">Languages</h3>
                          <div className="space-y-2">
                            {actor.languages.map((lang) => (
                              <div key={lang.language} className="flex items-center justify-between">
                                <span>{lang.language}</span>
                                <Badge variant="outline">{lang.level}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {actor.accents && actor.accents.length > 0 && (
                      <>
                        <Separator />
                        <div>
                          <h3 className="font-semibold mb-3">Accents</h3>
                          <div className="flex flex-wrap gap-2">
                            {actor.accents.map((accent) => (
                              <Badge key={accent} variant="outline">{accent}</Badge>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {/* Physical Attributes */}
                {actor.physicalAttributes && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Physical Attributes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {actor.physicalAttributes.height && (
                          <div>
                            <div className="text-sm text-muted-foreground">Height</div>
                            <div className="font-medium">{actor.physicalAttributes.height}</div>
                          </div>
                        )}
                        {actor.physicalAttributes.eyeColor && (
                          <div>
                            <div className="text-sm text-muted-foreground">Eyes</div>
                            <div className="font-medium">{actor.physicalAttributes.eyeColor}</div>
                          </div>
                        )}
                        {actor.physicalAttributes.hairColor && (
                          <div>
                            <div className="text-sm text-muted-foreground">Hair</div>
                            <div className="font-medium">{actor.physicalAttributes.hairColor}</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="experience" className="space-y-4">
                {actor.experience.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No experience listed yet
                    </CardContent>
                  </Card>
                ) : (
                  actor.experience.map((item, index) => (
                    <ExperienceCard key={index} item={item} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="training" className="space-y-4">
                {actor.training.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No training listed yet
                    </CardContent>
                  </Card>
                ) : (
                  actor.training.map((item, index) => (
                    <TrainingCard key={index} item={item} />
                  ))
                )}
              </TabsContent>

              <TabsContent value="resume">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {actor.resume && actor.resume.pdfUrl ? (
                      [actor.resume].map((resume, index) => (
                        <a
                          key={index}
                          href={resume.pdfUrl || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <div className="font-medium">Resume</div>
                            <div className="text-sm text-muted-foreground">PDF Document</div>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </a>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No resume available
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Videos Section */}
            {actor.videos && actor.videos.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Showreels & Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {actor.videos.map((video, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-video bg-black">
                        {video.source === 'youtube' && (
                          <iframe
                            src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}`}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        )}
                        {video.source === 'vimeo' && (
                          <iframe
                            src={`https://player.vimeo.com/video/${video.url.split('/').pop()}`}
                            className="w-full h-full"
                            allowFullScreen
                          />
                        )}
                        {video.source === 'uploaded' && (
                          <video src={video.url} controls className="w-full h-full" />
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="font-medium">{video.title || `Video ${index + 1}`}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {actor.contact?.email && (
                  <a href={`mailto:${actor.contact.email}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    {actor.contact.email}
                  </a>
                )}
                {actor.contact?.phone && (
                  <a href={`tel:${actor.contact.phone}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    {actor.contact.phone}
                  </a>
                )}
                {actor.contact?.website && (
                  <a href={actor.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
                {actor.contact?.representation && (
                  <>
                    <Separator />
                    <div>
                      <div className="text-sm font-medium mb-2">Representation</div>
                      <div className="text-sm text-muted-foreground">
                        {actor.contact.representation.agency && (
                          <div>{actor.contact.representation.agency}</div>
                        )}
                        {actor.contact.representation.agent && (
                          <div>{actor.contact.representation.agent}</div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Availability */}
            {actor.availability && (
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant={actor.availability.status === 'available' ? 'default' : 'secondary'}>
                      {actor.availability.status === 'available' ? 'Available' : actor.availability.status === 'limited' ? 'Limited' : 'Unavailable'}
                    </Badge>
                  </div>
                  {actor.availability.startDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">From</span>
                      <span>{new Date(actor.availability.startDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {actor.availability.endDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">To</span>
                      <span>{new Date(actor.availability.endDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Genres */}
            <Card>
              <CardHeader>
                <CardTitle>Genres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {actor.genres.map((genre) => (
                    <Badge key={genre} variant="outline">{genre}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={() => setIsGalleryOpen(false)}>
          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-12 w-12" />
          </button>
          <img
            src={actor.photos[currentPhotoIndex]?.url}
            alt={actor.name}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
          >
            <ChevronRight className="h-12 w-12" />
          </button>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
            {currentPhotoIndex + 1} / {actor.photos.length}
          </div>
        </div>
      )}
    </motion.div>
  )
}

function ExperienceCard({ item }: { item: Experience }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.role}</h3>
            <div className="text-muted-foreground">{item.production}</div>
            {item.director && (
              <div className="text-sm text-muted-foreground mt-1">Dir. {item.director}</div>
            )}
            {item.description && (
              <p className="text-sm mt-2">{item.description}</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-medium">{item.year}</div>
            {item.type && (
              <Badge variant="outline" className="mt-1">{item.type}</Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function TrainingCard({ item }: { item: Training }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.institution}</h3>
            {item.focus && (
              <div className="text-muted-foreground">{item.focus}</div>
            )}
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-medium">{item.year}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
