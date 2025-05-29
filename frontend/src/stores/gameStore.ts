import type { Ref } from 'vue'
import type Answer from '@/types/Answer'
import type Level from '@/types/Level'
import type Teammate from '@/types/Teammate'
import type User from '@/types/User'
import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGame = defineStore('gameStore', () => {
  // User
  const user: Ref<User> = ref({
    id: nanoid(),
    name: 'Robert',
    avatar: '/images/emptyPfp.png',
  })

  // Stats
  const correctAnswers = ref(0)

  function initStats() {
    correctAnswers.value = 0
  }

  // Team
  const team: Ref<Teammate[]> = ref([
    { user: user.value, isAlive: true, selectedAnswer: null, score: 0 },
  ])

  function selectAnswer(answer: Answer) {
    for (const teammate of team.value) {
      if (teammate.user === user.value) {
        teammate.selectedAnswer = answer
        if (answer.isCorrect) {
          teammate.score += 5
        }
        break
      }
    }
  }

  function getChosenAnswer() {
    const selectedAnswers: any = {}
    for (const teammate of team.value) {
      if (teammate.selectedAnswer === null) {
        continue
      }
      if (teammate.selectedAnswer.text in selectedAnswers) {
        selectedAnswers[teammate.selectedAnswer.text].votes += 1
      }
      else {
        selectedAnswers[teammate.selectedAnswer.text] = {
          answer: teammate.selectedAnswer,
          votes: 1,
        }
      }
    }

    let maxVotes = 0
    for (const key in selectedAnswers) {
      if (maxVotes < selectedAnswers[key].votes) {
        maxVotes = selectedAnswers[key].votes
      }
    }

    if (maxVotes === 0) {
      return null
    }

    const chosenAnswers = []
    for (const key in selectedAnswers) {
      if (selectedAnswers[key].votes === maxVotes) {
        chosenAnswers.push(selectedAnswers[key].answer)
      }
    }

    const chosenAnswer: Answer = chosenAnswers[Math.floor(Math.random() * chosenAnswers.length)]

    for (const teammate of team.value) {
      if (teammate.selectedAnswer === chosenAnswer) {
        teammate.score += 3
      }
    }

    if (chosenAnswer.isCorrect) {
      correctAnswers.value += 1
    }

    return chosenAnswers[Math.floor(Math.random() * chosenAnswers.length)]
  }

  function removeSelectedAnswers() {
    for (let i = 0; i < team.value.length; i++) {
      team.value[i].selectedAnswer = null
    }
  }

  function killRandom() {
    const aliveTeammates = team.value.filter((teammate: Teammate) => teammate.isAlive)
    const randomAliveTeammate = aliveTeammates[Math.floor(Math.random() * aliveTeammates.length)]

    for (let i = 0; i < team.value.length; i++) {
      if (team.value[i] === randomAliveTeammate) {
        team.value[i].isAlive = false
        break
      }
    }

    return randomAliveTeammate
  }

  function initTeam() {
    for (let i = 0; i < team.value.length; i++) {
      team.value[i].selectedAnswer = null
      team.value[i].isAlive = true
      team.value[i].score = 0
    }
  }

  // Level
  const levels: Ref<Level[]> = ref([
    {
      title: 'Variables and Data Types',
      orderNumber: 1,
      questions: [
        {
          title: 'Constants in Code',
          text: 'Which keyword is used to declare a constant in JavaScript?',
          answers: [
            { text: 'let', isCorrect: false },
            { text: 'const', isCorrect: true },
            { text: 'var', isCorrect: false },
            { text: 'static', isCorrect: false },
          ],
        },
        {
          title: 'Primitive Pick',
          text: 'Which of the following is a primitive data type in JavaScript?',
          answers: [
            { text: 'Object', isCorrect: false },
            { text: 'Array', isCorrect: false },
            { text: 'String', isCorrect: true },
            { text: 'Function', isCorrect: false },
          ],
        },
        {
          title: 'The null Mystery',
          text: 'What is the result of typeof null in JavaScript?',
          answers: [
            { text: '"null"', isCorrect: false },
            { text: '"undefined"', isCorrect: false },
            { text: '"object"', isCorrect: true },
            { text: '"boolean"', isCorrect: false },
          ],
        },
        {
          title: 'Single Line Secrets',
          text: 'Which symbol is used for single-line comments in JavaScript?',
          answers: [
            { text: '#', isCorrect: false },
            { text: '//', isCorrect: true },
            { text: '/*', isCorrect: false },
            { text: '<!--', isCorrect: false },
          ],
        },
        {
          title: 'Reassign Me!',
          text: 'Which type of variable can be reassigned in JavaScript?',
          answers: [
            { text: 'const', isCorrect: false },
            { text: 'define', isCorrect: false },
            { text: 'let', isCorrect: true },
            { text: 'var static', isCorrect: false },
          ],
        },
      ],
      state: 'passed',
    },
    {
      title: 'Functions',
      orderNumber: 2,
      questions: [
        {
          title: 'Declare It Right',
          text: 'Which keyword defines a function in JavaScript?',
          answers: [
            { text: 'func', isCorrect: false },
            { text: 'function', isCorrect: true },
            { text: 'define', isCorrect: false },
            { text: 'def', isCorrect: false },
          ],
        },
        {
          title: 'Simple Return',
          text: 'What will this return? function test() { return 5 + 3; }',
          answers: [
            { text: 'undefined', isCorrect: false },
            { text: '8', isCorrect: true },
            { text: '"5 + 3"', isCorrect: false },
            { text: 'NaN', isCorrect: false },
          ],
        },
        {
          title: 'ES6 Upgrade',
          text: 'Arrow functions were introduced in which version of JavaScript?',
          answers: [
            { text: 'ES5', isCorrect: false },
            { text: 'ES6', isCorrect: true },
            { text: 'ES3', isCorrect: false },
            { text: 'ES2019', isCorrect: false },
          ],
        },
        {
          title: 'Arrow Syntax',
          text: 'Which syntax correctly defines an arrow function?',
          answers: [
            { text: 'function => () {}', isCorrect: false },
            { text: '() -> {}', isCorrect: false },
            { text: '() => {}', isCorrect: true },
            { text: '{} => ()', isCorrect: false },
          ],
        },
        {
          title: 'Higher-Order Power',
          text: 'What is a higher-order function?',
          answers: [
            { text: 'A function that returns a string', isCorrect: false },
            { text: 'A function that returns or accepts another function', isCorrect: true },
            { text: 'A function inside a class', isCorrect: false },
            { text: 'A function used in HTML', isCorrect: false },
          ],
        },
      ],
      state: 'passed',
    },
    {
      title: 'Control Flow',
      orderNumber: 3,
      questions: [
        {
          title: 'Branching Basics',
          text: 'Which keyword is used for conditional branching in JavaScript?',
          answers: [
            { text: 'loop', isCorrect: false },
            { text: 'if', isCorrect: true },
            { text: 'switch', isCorrect: false },
            { text: 'branch', isCorrect: false },
          ],
        },
        {
          title: 'Endless Loops?',
          text: 'Which loop continues as long as its condition is true?',
          answers: [
            { text: 'for', isCorrect: false },
            { text: 'while', isCorrect: true },
            { text: 'do...until', isCorrect: false },
            { text: 'loop', isCorrect: false },
          ],
        },
        {
          title: 'First Output',
          text: 'What does this output? for (let i = 0; i < 2; i++) { console.log(i); }',
          answers: [
            { text: '1 2', isCorrect: false },
            { text: '0 1', isCorrect: true },
            { text: '0 1 2', isCorrect: false },
            { text: 'undefined', isCorrect: false },
          ],
        },
        {
          title: 'One-Time Guarantee',
          text: 'Which loop always runs its block at least once?',
          answers: [
            { text: 'for', isCorrect: false },
            { text: 'while', isCorrect: false },
            { text: 'do...while', isCorrect: true },
            { text: 'each', isCorrect: false },
          ],
        },
        {
          title: 'Breaking Free',
          text: 'What does the "break" keyword do in a loop?',
          answers: [
            { text: 'Skips current iteration', isCorrect: false },
            { text: 'Ends loop entirely', isCorrect: true },
            { text: 'Restarts loop', isCorrect: false },
            { text: 'Delays loop', isCorrect: false },
          ],
        },
      ],
      state: 'locked',
    },
    {
      title: 'Object-Oriented Programming',
      orderNumber: 4,
      questions: [
        {
          title: 'OOP Decoded',
          text: 'What does OOP stand for?',
          answers: [
            { text: 'Object-On-Program', isCorrect: false },
            { text: 'Object-Oriented Programming', isCorrect: true },
            { text: 'Operational Output Process', isCorrect: false },
            { text: 'Object-Only Paradigm', isCorrect: false },
          ],
        },
        {
          title: 'Pillars of OOP',
          text: 'Which of the following is a core concept of OOP?',
          answers: [
            { text: 'Encapsulation', isCorrect: true },
            { text: 'Event Bubbling', isCorrect: false },
            { text: 'Hoisting', isCorrect: false },
            { text: 'Closure', isCorrect: false },
          ],
        },
        {
          title: 'Classy Definition',
          text: 'What is a class in JavaScript?',
          answers: [
            { text: 'A loop wrapper', isCorrect: false },
            { text: 'A blueprint for objects', isCorrect: true },
            { text: 'A built-in module', isCorrect: false },
            { text: 'A type of array', isCorrect: false },
          ],
        },
        {
          title: 'Creating Objects',
          text: 'How do you create an instance of a class?',
          answers: [
            { text: 'class.create()', isCorrect: false },
            { text: 'new ClassName()', isCorrect: true },
            { text: 'ClassName()', isCorrect: false },
            { text: 'instantiate ClassName', isCorrect: false },
          ],
        },
        {
          title: 'Inheritance Time',
          text: 'Which keyword is used for inheritance in JavaScript classes?',
          answers: [
            { text: 'extends', isCorrect: true },
            { text: 'inherits', isCorrect: false },
            { text: 'superclass', isCorrect: false },
            { text: 'prototype', isCorrect: false },
          ],
        },
      ],
      state: 'locked',
    },
    {
      title: 'Asynchronous JavaScript',
      orderNumber: 5,
      questions: [
        {
          title: 'Set It Later',
          text: 'Which function is used to delay execution in JavaScript?',
          answers: [
            { text: 'delay()', isCorrect: false },
            { text: 'setTimeout()', isCorrect: true },
            { text: 'sleep()', isCorrect: false },
            { text: 'wait()', isCorrect: false },
          ],
        },
        {
          title: 'Promise Land',
          text: 'What does a Promise represent in JavaScript?',
          answers: [
            { text: 'A synchronous block of code', isCorrect: false },
            { text: 'An eventual value from an async operation', isCorrect: true },
            { text: 'A browser event', isCorrect: false },
            { text: 'A failed function call', isCorrect: false },
          ],
        },
        {
          title: 'Async Keyword',
          text: 'What does the "async" keyword do before a function?',
          answers: [
            { text: 'Makes it synchronous', isCorrect: false },
            { text: 'Wraps it in a Promise', isCorrect: true },
            { text: 'Delays execution', isCorrect: false },
            { text: 'Declares it global', isCorrect: false },
          ],
        },
        {
          title: 'Await Me',
          text: 'What is the purpose of the "await" keyword?',
          answers: [
            { text: 'Waits for a condition to be true', isCorrect: false },
            { text: 'Blocks execution forever', isCorrect: false },
            { text: 'Pauses execution until a Promise resolves', isCorrect: true },
            { text: 'Throws an error', isCorrect: false },
          ],
        },
        {
          title: 'Error Handling',
          text: 'Which block is used with async/await to catch errors?',
          answers: [
            { text: 'catchError', isCorrect: false },
            { text: 'try/catch', isCorrect: true },
            { text: 'then/error', isCorrect: false },
            { text: 'resolve/reject', isCorrect: false },
          ],
        },
      ],
      state: 'locked',
    },
  ])
  const currentLevel: Ref<Level | null> = ref(null)

  return {
    user,
    team,
    selectAnswer,
    getChosenAnswer,
    removeSelectedAnswers,
    killRandom,
    initTeam,
    currentLevel,
    levels,
    initStats,
    correctAnswers,
  }
})
