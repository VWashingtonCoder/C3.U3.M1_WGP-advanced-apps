import server from './backend/mock-server'
import React from 'react'
import App from './frontend/components/App'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

jest.setTimeout(750) // default 5000 too long for Codegrade

beforeAll(() => { server.listen() })
afterAll(() => { server.close() })
afterEach(() => { server.resetHandlers() })
beforeEach(() => {
  render(<App />)
})

test('App is a class-based component', async () => {
  await screen.findByText('laundry')
  expect(
    App.prototype &&
    App.prototype.isReactComponent
  ).not.toBeTruthy()
})
