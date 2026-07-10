import * as pdfjs from 'pdfjs-dist'
import type { ParsedResume } from '@/types'

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface RawExtractedData {
  text: string
}

async function extractTextFromPdf(pdfBuffer: ArrayBuffer): Promise<string> {
  try {
    const pdf = await pdfjs.getDocument({ data: pdfBuffer }).promise
    const pages = pdf.numPages
    let fullText = ''

    for (let i = 1; i <= pages; i++) {
      const page = await pdf.getPage(i)
      const textContent = await page.getTextContent()
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ')
      
      fullText += pageText + '\n'
    }

    return fullText
  } catch (error) {
    console.error('Error extracting PDF text:', error)
    return ''
  }
}

function parseSkills(text: string): string[] {
  const skillsSection = extractSection(text, /skills|abilities|core competencies/i)
  if (!skillsSection) return []

  // Split by commas, newlines, or bullets
  const items = skillsSection
    .split(/[,\n•\-]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length < 50) // Filter out overly long items
  
  return [...new Set(items)] // Remove duplicates
}

function parseLanguages(text: string): { language: string; level: string }[] {
  const langSection = extractSection(text, /languages|language proficiency|bilingual/i)
  if (!langSection) return []

  const languages: { language: string; level: string }[] = []
  
  // Pattern: "English - Native" or "Spanish (Fluent)" or "French, Advanced"
  const lines = langSection.split(/\n/).filter(Boolean)
  
  for (const line of lines) {
    const match = line.match(/^(.+?)[\s\-:,]+(.+)$/)
    if (match) {
      const [, language, level] = match
      languages.push({
        language: language.trim(),
        level: level.trim(),
      })
    }
  }

  return languages
}

function parseExperience(text: string): { production?: string; role?: string; type?: string; year?: number }[] {
  const expSection = extractSection(text, /experience|credits|employment|work history/i)
  if (!expSection) return []

  const lines = expSection.split(/\n/).filter(Boolean)
  const experience: { production?: string; role?: string; type?: string; year?: number }[] = []

  for (const line of lines) {
    // Try to extract year
    const yearMatch = line.match(/(?:\b19|20)\d{2}\b/)
    const year = yearMatch ? parseInt(yearMatch[0], 10) : undefined

    experience.push({
      production: line.length < 100 ? line : undefined,
      year,
    })
  }

  return experience.filter((e) => e.production)
}

function parseEducation(text: string): { institution?: string; degree?: string; year?: number }[] {
  const eduSection = extractSection(text, /education|training|academic/i)
  if (!eduSection) return []

  const lines = eduSection.split(/\n/).filter(Boolean)
  const education: { institution?: string; degree?: string; year?: number }[] = []

  for (const line of lines) {
    const yearMatch = line.match(/(?:\b19|20)\d{2}\b/)
    const year = yearMatch ? parseInt(yearMatch[0], 10) : undefined

    // Split by common separators to get institution and degree
    const parts = line.split(/[,\-–]+/).map((p) => p.trim())
    
    education.push({
      institution: parts[0],
      degree: parts[1],
      year,
    })
  }

  return education.filter((e) => e.institution)
}

function parseAccents(text: string): string[] {
  const accentSection = extractSection(text, /accents|voice work|dialects/i)
  if (!accentSection) return []

  const items = accentSection
    .split(/[,\n•\-]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && s.length < 30)
  
  return [...new Set(items)]
}

function extractSection(text: string, pattern: RegExp): string | null {
  // Normalize text - convert to single line for easier matching
  const normalized = text.replace(/\r\n/g, '\n')
  
  const match = normalized.match(pattern)
  if (!match) return null

  // Find the section header
  const headerIndex = match.index!
  const afterHeader = normalized.substring(headerIndex)
  
  // Find next section or take next N lines
  const lines = afterHeader.split('\n').slice(0, 15) // Take up to 15 lines
  
  return lines.join('\n')
}

export async function parseResume(pdfBuffer: ArrayBuffer): Promise<ParsedResume> {
  const text = await extractTextFromPdf(pdfBuffer)
  
  if (!text) {
    return {
      skills: [],
      languages: [],
      accents: [],
      experience: [],
      specialAbilities: [],
      education: [],
      training: [],
    }
  }

  const skills = parseSkills(text)
  const languages = parseLanguages(text)
  const accents = parseAccents(text)
  const experience = parseExperience(text)
  const education = parseEducation(text)

  // Training can be merged with education or extracted separately
  const trainingSection = extractSection(text, /training|workshops|masterclasses/i)
  const training = trainingSection 
    ? trainingSection.split(/\n/).filter(Boolean).map((line) => ({ institution: line }))
    : []

  // Special abilities - look for specific keywords
  const specialAbilities: string[] = []
  const abilityPatterns = [
    /martial\s*arts/i,
    /swimming/i,
    /driving|driver's? ?license/i,
    /fencing/i,
    /singing|vocal/i,
    /dancing|dance/i,
    /musical\s*instrument/i,
    /stunt/i,
  ]

  for (const pattern of abilityPatterns) {
    const match = text.match(pattern)
    if (match) {
      specialAbilities.push(match[0].trim())
    }
  }

  return {
    skills,
    languages,
    accents,
    experience,
    specialAbilities: [...new Set(specialAbilities)],
    education,
    training,
  }
}
