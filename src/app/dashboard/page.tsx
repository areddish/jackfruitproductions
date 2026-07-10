"use client"

import * as React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, Users, FileText, TrendingUp, Star, Eye, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

const stats = [
  { label: 'Total Actors', value: '524', change: '+12%', icon: Users },
  { label: 'Active Casts', value: '18', change: '+3', icon: FileText },
  { label: 'Viewed Profiles', value: '1,247', change: '+23%', icon: Eye },
  { label: 'Avg. Fill Rate', value: '87%', change: '+5%', icon: TrendingUp },
]

const recentCasts = [
  { id: 1, title: 'The Last Horizon', roles: 12, filled: 9, status: 'In Progress' },
  { id: 2, title: 'Midnight in Paris', roles: 8, filled: 8, status: 'Complete' },
  { id: 3, title: 'Summer Dreams', roles: 15, filled: 6, status: 'In Progress' },
]

const upcomingAuditions = [
  { id: 1, title: 'Lead Role - Drama', date: 'Dec 20, 2024', time: '2:00 PM', actors: 24 },
  { id: 2, title: 'Supporting Cast - Comedy', date: 'Dec 22, 2024', time: '10:00 AM', actors: 18 },
  { id: 3, title: 'Voice Over - Animation', date: 'Dec 25, 2024', time: '3:00 PM', actors: 12 },
]

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Director Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your casting projects and track progress</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-500 mt-1">{stat.change} from last month</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="casts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="casts">Active Casts</TabsTrigger>
            <TabsTrigger value="auditions">Upcoming Auditions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="casts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recentCasts.map((cast) => (
                <Card key={cast.id}>
                  <CardHeader>
                    <CardTitle>{cast.title}</CardTitle>
                    <CardDescription>
                      {cast.filled} of {cast.roles} roles filled
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant={cast.status === 'Complete' ? 'default' : 'secondary'}>
                          {cast.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {Math.round((cast.filled / cast.roles) * 100)}% complete
                        </div>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-500"
                          style={{ width: `${(cast.filled / cast.roles) * 100}%` }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          View Cast
                        </Button>
                        <Button size="sm" className="flex-1">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="auditions" className="space-y-4">
            <div className="space-y-4">
              {upcomingAuditions.map((audition) => (
                <Card key={audition.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Calendar className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{audition.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {audition.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {audition.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {audition.actors} actors
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm">Manage</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardContent className="p-6">
                <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Analytics dashboard coming soon</p>
                    <p className="text-sm mt-2">Track profile views, search trends, and casting metrics</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  )
}
