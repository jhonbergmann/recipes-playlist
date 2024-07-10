import * as Collapsible from '@radix-ui/react-collapsible'
import {ChevronDown} from 'lucide-react'

import {IModuleProps} from '@/components/Module/data'
import {Lesson} from '@/components/Lesson'
import {useStore} from '@/zustand-store'

export function Module({moduleIndex, title, amountOfLessons}: IModuleProps) {
  const {currentLessonIndex, currentModuleIndex, play, lessons} = useStore((store) => {
    return {
      lessons: store.course?.modules[moduleIndex].lessons,
      currentLessonIndex: store.currentLessonIndex,
      currentModuleIndex: store.currentModuleIndex,
      play: store.play,
    }
  })

  return (
    <Collapsible.Root className="group" defaultOpen={moduleIndex === 0}>
      <Collapsible.Trigger className="flex w-full items-center gap-3 bg-orange-500 p-4">
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-orange-600 text-xs">
          {moduleIndex + 1}
        </div>
        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-xs text-orange-50">{amountOfLessons} videos</span>
        </div>
        <ChevronDown className="w-5 h-5 ml-auto text-orange-50 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <nav className="relative flex flex-col gap-4 p-6">
          {lessons &&
            lessons.map((lesson, lessonIndex) => {
              const isCurrent = currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex

              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  duration={lesson.duration}
                  isCurrent={isCurrent}
                  onPlay={() => play([moduleIndex, lessonIndex])}
                />
              )
            })}
        </nav>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
