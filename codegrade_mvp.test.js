// mock server imports
import server from './backend/mock-server'
import { resetTodos } from './backend/helpers'
// we are going use JSX so we need React
import React from 'react'
// components to test
import App from './frontend/components/App'
import Todo from './frontend/components/Todo'
// imports from the testing libraries
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// not needed for module project, START
beforeAll(() => { server.listen() })
afterAll(() => { server.close() })
afterEach(() => { server.resetHandlers() })
beforeEach(() => { resetTodos() })
// not needed for module project, END

test('App renders without crashing', async () => {
  render(<App />)
  // findyText will retry for a while and fail the test if not found
  await screen.findByText('laundry') // only findEtc works with async/await
  // screen.debug()
})
test('Todo component renders uncompleted todos correctly', () => {
  render(<Todo
    todo={{ id: 'xyz', name: 'doit', completed: false }}
    toggleStatus={Function.prototype}
  />)
  const todo = screen.queryByText('doit')

  // NOOOOO! WE SHOULD ONLY QUERY BY THINGS THE USER CAN READ
  const todoAnotherWay = document.querySelector('.todo')

  expect(todo).toBeInTheDocument()
  expect(todo).toBeVisible()

  // sometimes we need to check that something is NOT there
  // the queryBy queries put a null value in the variable if the node is not there
  const todoNotThere = screen.queryByText('not here')
  expect(todoNotThere).toBe(null)
  expect(todoNotThere).not.toBeInTheDocument()
})
test('Todo component renders completed todos correctly', () => {
  render(
    <Todo
      todo={{ id: 'abc', name: 'check test', completed: true }}
      toggleStatus={Function.prototype}
    />
  )
  // if you want to make the search text more lenient (capitalization, length...)
  const todoCheck = screen.queryByText('✔️', { exact: false })
  expect(todoCheck).toBeInTheDocument()
})
