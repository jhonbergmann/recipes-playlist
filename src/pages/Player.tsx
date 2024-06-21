import {useEffect} from 'react'
import {MessageCircle} from 'lucide-react'

import {Header, Video, Module} from '@/components'
import {useCurrentLesson, useStore} from '@/zustand-store'

export function Player() {
  const {course, load} = useStore((store) => {
    return {
      course: store.course,
      load: store.load,
    }
  })

  const {currentLesson} = useCurrentLesson()

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson])

  return (
    <div className="h-screen bg-orange-600 text-orange-50 flex justify-center items-center shadow-xl">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <button className="flex items-center gap-2 rounded bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>
        <main className="relative flex overflow-hidden rounded-lg border border-orange-500 bg-orange-600 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-orange-600 border-orange-500 bg-orange-600 overflow-y-scroll scrollbar scrollbar-thin scrollbar-track-orange-500 scrollbar-thumb-orange-600">
            {course?.modules &&
              course?.modules.map((module, index) => {
                return (
                  <Module
                    key={module.id}
                    moduleIndex={index}
                    title={module.title}
                    amountOfLessons={module.lessons.length}
                  />
                )
              })}
          </aside>
        </main>
      </div>
    </div>
  )
}
