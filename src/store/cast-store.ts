import { create } from 'zustand'
import type { Cast, CastRole, FilterState } from '@/types'
import { initialCasts } from '@/lib/data'

interface CastStore {
  casts: Cast[]
  selectedCastId: string | null
  filters: FilterState
  actions: {
    setCasts: (casts: Cast[]) => void
    addCast: (cast: Cast) => void
    updateCast: (id: string, updates: Partial<Cast>) => void
    deleteCast: (id: string) => void
    selectCast: (id: string | null) => void
    addRole: (castId: string, role: Omit<CastRole, 'id'>) => void
    updateRole: (castId: string, roleId: string, updates: Partial<CastRole>) => void
    removeRole: (castId: string, roleId: string) => void
    assignActorToRole: (castId: string, roleId: string, actorId?: string) => void
    reorderRoles: (castId: string, roleIds: string[]) => void
    setFilters: (filters: Partial<FilterState>) => void
    clearFilters: () => void
  }
}

export const useCastStore = create<CastStore>()((set) => ({
  casts: initialCasts,
  selectedCastId: null,
  filters: {},
  actions: {
    setCasts: (casts) => set({ casts }),
    
    addCast: (cast) =>
      set((state) => ({
        casts: [...state.casts, cast],
      })),

    updateCast: (id, updates) =>
      set((state) => ({
        casts: state.casts.map((cast) =>
          cast.id === id ? { ...cast, ...updates, updatedAt: new Date().toISOString() } : cast
        ),
      })),

    deleteCast: (id) =>
      set((state) => ({
        casts: state.casts.filter((cast) => cast.id !== id),
        selectedCastId: state.selectedCastId === id ? null : state.selectedCastId,
      })),

    selectCast: (id) => set({ selectedCastId: id }),

    addRole: (castId, role) =>
      set((state) => ({
        casts: state.casts.map((cast) => {
          if (cast.id !== castId) return cast
          const newRole: CastRole = {
            ...role,
            id: Math.random().toString(36).substring(2, 15),
          }
          return {
            ...cast,
            roles: [...cast.roles, newRole],
            updatedAt: new Date().toISOString(),
          }
        }),
      })),

    updateRole: (castId, roleId, updates) =>
      set((state) => ({
        casts: state.casts.map((cast) => {
          if (cast.id !== castId) return cast
          return {
            ...cast,
            roles: cast.roles.map((role) =>
              role.id === roleId ? { ...role, ...updates } : role
            ),
            updatedAt: new Date().toISOString(),
          }
        }),
      })),

    removeRole: (castId, roleId) =>
      set((state) => ({
        casts: state.casts.map((cast) => {
          if (cast.id !== castId) return cast
          return {
            ...cast,
            roles: cast.roles.filter((role) => role.id !== roleId),
            updatedAt: new Date().toISOString(),
          }
        }),
      })),

    assignActorToRole: (castId, roleId, actorId) =>
      set((state) => ({
        casts: state.casts.map((cast) => {
          if (cast.id !== castId) return cast
          return {
            ...cast,
            roles: cast.roles.map((role) =>
              role.id === roleId ? { ...role, actorId } : role
            ),
            updatedAt: new Date().toISOString(),
          }
        }),
      })),

    reorderRoles: (castId, roleIds) =>
      set((state) => ({
        casts: state.casts.map((cast) => {
          if (cast.id !== castId) return cast
          const roleMap = new Map(cast.roles.map((r) => [r.id, r]))
          const newRoles = roleIds.map((id, index) => {
            const role = roleMap.get(id)
            return role ? { ...role, order: index } : null
          }).filter(Boolean) as CastRole[]
          return {
            ...cast,
            roles: newRoles,
            updatedAt: new Date().toISOString(),
          }
        }),
      })),

    setFilters: (filters) =>
      set((state) => ({
        filters: { ...state.filters, ...filters },
      })),

    clearFilters: () => set({ filters: {} }),
  },
}))
