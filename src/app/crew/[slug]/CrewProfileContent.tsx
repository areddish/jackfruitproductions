'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Mail, Phone, Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { CrewMember, CrewCredit } from '@/types'

export default function CrewProfileContent({ member }: { member: CrewMember }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <div className="relative">
        <div className="h-[40vh] md:h-[50vh] bg-muted relative overflow-hidden">
          <img
            src={member.headshotUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute bottom-8 left-8">
            <Badge className="mb-3">{member.department}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{member.name}</h1>
            <p className="text-lg text-white/80">{member.title}</p>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="bg-muted/50 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-wrap gap-6 text-sm">
              {member.location && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {member.location}
                </div>
              )}
              {member.availability && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className={member.availability.status === 'available' ? 'text-green-600' : 'text-muted-foreground'}>
                    {member.availability.status === 'available' ? 'Available' : member.availability.status === 'limited' ? 'Limited Availability' : member.availability.status === 'booked' ? 'Booked' : 'Unavailable'}
                  </span>
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
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="credits">Credits</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {member.bio && (
                      <div>
                        <h3 className="font-semibold mb-2">Biography</h3>
                        <p className="text-muted-foreground whitespace-pre-line">{member.bio}</p>
                      </div>
                    )}

                    <Separator />

                    <div>
                      <h3 className="font-semibold mb-3">Skills & Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="credits" className="space-y-4">
                {member.credits.length === 0 ? (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No credits listed yet
                    </CardContent>
                  </Card>
                ) : (
                  member.credits.map((item, index) => (
                    <CreditCard key={index} item={item} />
                  ))
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {member.contact?.email && (
                  <a href={`mailto:${member.contact.email}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    {member.contact.email}
                  </a>
                )}
                {member.contact?.phone && (
                  <a href={`tel:${member.contact.phone}`} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    {member.contact.phone}
                  </a>
                )}
                {member.contact?.website && (
                  <a href={member.contact.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                )}
                {!member.contact && (
                  <p className="text-sm text-muted-foreground">No contact info available</p>
                )}
              </CardContent>
            </Card>

            {member.availability && (
              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Status</span>
                    <Badge variant={member.availability.status === 'available' ? 'default' : 'secondary'}>
                      {member.availability.status === 'available' ? 'Available' : member.availability.status === 'limited' ? 'Limited' : member.availability.status === 'booked' ? 'Booked' : 'Unavailable'}
                    </Badge>
                  </div>
                  {member.availability.startDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">From</span>
                      <span>{new Date(member.availability.startDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {member.availability.endDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">To</span>
                      <span>{new Date(member.availability.endDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {member.availability.notes && (
                    <p className="text-sm text-muted-foreground pt-2">{member.availability.notes}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CreditCard({ item }: { item: CrewCredit }) {
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
