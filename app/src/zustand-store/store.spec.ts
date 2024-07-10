import {beforeEach, describe, expect, it} from 'vitest'

import {useStore as store} from '.'

// define the course data.
const course = {
  id: 1,
  modules: [
    {
      id: 1,
      title: 'Bebidas',
      lessons: [
        {id: 'D1mwooEpCGE', title: 'Cappuccino ', duration: '01:06'},
        {id: '48Y7D96fRSk', title: 'Frozen de morango', duration: '0:39'},
      ],
    },
    {
      id: 2,
      title: 'Ceia de Natal',
      lessons: [
        {id: 'XxC_2Gh9-cI', title: 'Tender de Natal', duration: '01:45'},
        {id: 'MXMpd-G6ayc', title: 'Lombo recheado', duration: '01:12'},
      ],
    },
  ],
}

// get the initial state of the store.
const initialState = store.getState()

/**
 * test suite for the zustand store.
 */
describe('zustand store', () => {
  /**
   * before each test, reset the store state to the initial state.
   */
  beforeEach(() => {
    store.setState(initialState)
  })

  /**
   * test case: play a video.
   */
  it('should be able to play', () => {
    const {play} = store.getState()

    // play the second video of the second module.
    play([1, 2])

    const {currentModuleIndex, currentLessonIndex} = store.getState()

    // check if the current module and lesson indices are correct.
    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(2)
  })

  /**
   * test case: play the next video automatically.
   */
  it('should be able to play next video automatically', () => {
    store.setState({course})

    const {next} = store.getState()

    // call the next function to play the next video.
    next()

    const {currentModuleIndex, currentLessonIndex} = store.getState()

    // Check if the current module and lesson indices are correct
    expect(currentModuleIndex).toEqual(0)
    expect(currentLessonIndex).toEqual(1)
  })

  /**
   * test case: jump to the next module automatically.
   */
  it('should be able to jump to the next module automatically', () => {
    store.setState({course})

    const {next} = store.getState()

    // set the current lesson index to 1.
    store.setState({currentLessonIndex: 1})

    // call the next function to jump to the next module.
    next()

    const {currentModuleIndex, currentLessonIndex} = store.getState()

    // check if the current module and lesson indices are correct.
    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(0)
  })

  /**
   * test case: do not update the current module and lesson index if there is not next lesson available.
   */
  it('should not update the current module and lesson index if there is not next lesson available', () => {
    store.setState({course})

    const {next} = store.getState()

    // set the current module index and lesson index to the last lesson.
    store.setState({
      currentModuleIndex: 1,
      currentLessonIndex: 1,
    })

    // call the next function.
    next()

    const {currentModuleIndex, currentLessonIndex} = store.getState()

    // check if the current module and lesson indices are correct.
    expect(currentModuleIndex).toEqual(1)
    expect(currentLessonIndex).toEqual(1)
  })
})
