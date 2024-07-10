export interface ILessonProps {
  title: string
  duration: string
  isCurrent?: boolean
  onPlay: () => void
}
