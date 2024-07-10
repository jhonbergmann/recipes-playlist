export interface ICourse {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface IPlayerState {
  course: ICourse | null
  currentModuleIndex: number
  currentLessonIndex: number
  isLoading: boolean
  play: (moduleAndLessonIndex: [number, number]) => void
  next: () => void
  load: () => Promise<void>
}
