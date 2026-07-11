import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatYear(date: string | number): string {
  return typeof date === 'string' ? new Date(date).getFullYear().toString() : date.toString()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15)
}

export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function extractVideoId(url: string): { id: string; provider: 'youtube' | 'vimeo' | null } {
  const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/)
  if (youtubeMatch) return { id: youtubeMatch[1], provider: 'youtube' }

  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return { id: vimeoMatch[1], provider: 'vimeo' }

  return { id: '', provider: null }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
