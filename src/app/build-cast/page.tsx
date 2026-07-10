"use client"

import * as React from 'react'
import { motion } from 'framer-motion'
import { DndContext, closestCenter, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Plus, Trash2, GripVertical, Users, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCastStore } from '@/store/cast-store'
import { getAllActors } from '@/lib/data'
import { Actor, CastRole } from '@/types'

export default function BuildCastPage() {
  const casts = useCastStore((state) => state.casts)
  //const activeCast = useCastStore((state) => state.activeCast)
  const roles = useCastStore((state) => state.roles)
  const addRole = useCastStore((state) => state.addRole)
  const removeRole = useCastStore((state) => state.removeRole)
  const assignActorToRole = useCastStore((state) => state.assignActorToRole)
  const reorderRoles = useCastStore((state) => state.reorderRoles)
  
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedRoleId, setSelectedRoleId] = React.useState<string | null>(null)
  const [allActors] = React.useState<Actor[]>(getAllActors())
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const filteredActors = React.useMemo(() => {
    if (!searchQuery) return allActors
    return allActors.filter(actor => 
      actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      actor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [allActors, searchQuery])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    
    if (over && active.id !== over.id) {
      const oldIndex = roles.findIndex(r => r.id === active.id)
      const newIndex = roles.findIndex(r => r.id === over.id)
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(roles, oldIndex, newIndex)
        reorderRoles(newOrder)
      }
    }
  }

  const handleAddRole = () => {
    const newRole: CastRole = {
      id: `role-${Date.now()}`,
      title: 'New Role',
      description: '',
      actorId: null,
    }
    addRole(newRole)
  }

  const handleAssignActor = (actorId: string) => {
    if (selectedRoleId) {
      assignActorToRole(selectedRoleId, actorId)
      setSelectedRoleId(null)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const getActorById = (id: string) => allActors.find(a => a.id === id)

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Build a Cast</h1>
              <p className="text-muted-foreground mt-1">Assemble your dream cast by assigning actors to roles</p>
            </div>
            <Button onClick={handleAddRole}>
              <Plus className="h-4 w-4 mr-2" />
              Add Role
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {roles.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-16 text-center">
              <Users className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Roles Yet</h3>
              <p className="text-muted-foreground mb-6">Start building your cast by adding roles</p>
              <Button onClick={handleAddRole} size="lg">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Role
              </Button>
            </CardContent>
          </Card>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={roles.map(r => r.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {roles.map((role, index) => (
                  <SortableRoleCard
                    key={role.id}
                    role={role}
                    index={index}
                    assignedActor={role.actorId ? getActorById(role.actorId) : null}
                    onAssignClick={() => {
                      setSelectedRoleId(role.id)
                      setSearchOpen(true)
                    }}
                    onRemoveClick={() => removeRole(role.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Summary Card */}
        {roles.length > 0 && (
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Cast Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    {roles.filter(r => r.actorId).length} of {roles.length} roles filled
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    Preview Cast
                  </Button>
                  <Button disabled={roles.filter(r => r.actorId).length === 0}>
                    Export Cast Package
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Actor Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assign Actor</DialogTitle>
          </DialogHeader>
          
          <div className="relative my-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search actors by name or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            {filteredActors.map(actor => (
              <button
                key={actor.id}
                onClick={() => handleAssignActor(actor.id)}
                className="w-full flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors text-left"
              >
                <img
                  src={actor.photos[0]?.url || '/placeholder.jpg'}
                  alt={actor.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="font-semibold">{actor.name}</div>
                  <div className="text-sm text-muted-foreground">{actor.headline}</div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {actor.skills.slice(0, 3).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                    ))}
                    {actor.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">+{actor.skills.length - 3} more</Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

function SortableRoleCard({ 
  role, 
  index, 
  assignedActor, 
  onAssignClick, 
  onRemoveClick 
}: { 
  role: CastRole
  index: number
  assignedActor: Actor | null
  onAssignClick: () => void
  onRemoveClick: () => void
}) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: role.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={isDragging ? 'shadow-lg ring-2 ring-primary/50' : ''}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            {/* Drag Handle */}
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-2 hover:bg-muted rounded-lg"
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>

            {/* Role Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
                <h3 className="font-semibold text-lg">{role.title}</h3>
                {assignedActor && (
                  <Badge variant="default" className="bg-green-600">Filled</Badge>
                )}
              </div>
              {role.description && (
                <p className="text-sm text-muted-foreground mt-1">{role.description}</p>
              )}
              
              {assignedActor ? (
                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={assignedActor.photos[0]?.url || '/placeholder.jpg'}
                    alt={assignedActor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-sm">
                    <span className="font-medium">{assignedActor.name}</span>
                    <span className="text-muted-foreground ml-2">{assignedActor.headline}</span>
                  </div>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={onAssignClick} className="mt-3">
                  <Users className="h-4 w-4 mr-2" />
                  Assign Actor
                </Button>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              {assignedActor && (
                <Button variant="outline" size="sm" onClick={onAssignClick}>
                  Change
                </Button>
              )}
              <Button variant="ghost" size="icon" onClick={onRemoveClick}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
