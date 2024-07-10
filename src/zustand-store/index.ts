import {create} from 'zustand'

import {api} from '@/lib/axios'
import {IPlayerState} from '@/zustand-store/data'

export const useStore = create<IPlayerState>((set, get) => {
  return {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: false,

    /**
     * load course data.
     */
    load: async () => {
      set({isLoading: true})

      const response = await api.get('/courses/1')

      set({
        course: response.data,
        isLoading: false,
      })
    },

    /**
     * play a lesson
     * @param moduleAndLessonIndex - module and lesson index.
     */
    play: (moduleAndLessonIndex: [number, number]) => {
      const [moduleIndex, lessonIndex] = moduleAndLessonIndex

      set({
        currentModuleIndex: moduleIndex,
        currentLessonIndex: lessonIndex,
      })
    },

    /**
     * go to the next lesson.
     */
    next: () => {
      const {currentLessonIndex, currentModuleIndex, course} = get()

      const nextLessonIndex = currentLessonIndex + 1
      const nextLesson = course?.modules[currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        set({currentLessonIndex: nextLessonIndex})
      } else {
        const nextModuleIndex = currentModuleIndex + 1
        const nextModule = course?.modules[nextModuleIndex]

        if (nextModule) {
          set({
            currentModuleIndex: nextModuleIndex,
            currentLessonIndex: 0,
          })
        }
      }
    },
  }
})

/**
 * zustand hook to get the current lesson.
 * @returns {{ currentModule: ICourse | undefined, currentLesson: { id: string, title: string, duration: string } | undefined }} current lesson and module.
 */
export const useCurrentLesson = () => {
  return useStore((state) => {
    const {currentModuleIndex, currentLessonIndex} = state

    const currentModule = state.course?.modules[currentModuleIndex]
    const currentLesson = currentModule?.lessons[currentLessonIndex]

    return {currentModule, currentLesson}
  })
}
