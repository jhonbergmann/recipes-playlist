import {PlayCircle, Video} from 'lucide-react'

import {ILessonProps} from '@/components/Lesson/data'

export function Lesson({title, duration, onPlay, isCurrent = false}: ILessonProps) {
  return (
    <button
      onClick={onPlay}
      data-active={isCurrent}
      disabled={isCurrent}
      className="flex items-center gap-3 text-sm text-orange-300 data-[active=true]:text-emerald-300 enabled:hover:text-orange-50"
    >
      {isCurrent ? <PlayCircle className="w-4 h-4 text-emerald-300" /> : <Video className="w-4 h-4 text-orange-300" />}
      <span className="truncate">{title}</span>
      <span className="ml-auto font-mono text-xs text-orange-300">{duration}</span>
    </button>
  )
}
