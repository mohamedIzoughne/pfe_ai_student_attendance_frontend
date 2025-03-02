import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const generateWeeks = () => {
  const today = new Date()
  const currentYear = today.getFullYear()

  // Get January 1st of the current year
  const firstDayOfYear = new Date(currentYear, 0, 1)

  // Ensure weeks start on Monday (aligning with Python's weekday handling)
  const firstMonday = new Date(firstDayOfYear)
  firstMonday.setDate(
    firstDayOfYear.getDate() +
      (firstDayOfYear.getDay() === 0 ? 6 : firstDayOfYear.getDay() - 1) * -1
  )

  // Find last completed Monday
  const lastCompletedMonday = new Date(today)
  lastCompletedMonday.setDate(today.getDate() - today.getDay() - 6) // Move to last Monday

  // Calculate total completed weeks
  const totalWeeks = Math.ceil(
    (lastCompletedMonday - firstMonday) / (7 * 24 * 60 * 60 * 1000)
  )

  // Generate weeks in reverse order
  return Array.from({ length: totalWeeks }, (_, i) => ({
    name: i === 0 ? 'Last week' : `Week ${totalWeeks - i}`,
    id: totalWeeks - i,
  }))
}
