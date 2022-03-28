import React from 'react'

export default function Form(props) {
  const {
    nameInput,
    postTodoToApi,
    inputChange,
    shouldShowCompleteds,
    toggleShowCompleteds,
  } = props

  const onSubmit = evt => {
    evt.preventDefault()
    postTodoToApi(nameInput)
  }

  const onChange = evt => {
    const { value } = evt.target
    inputChange(value)
  }

  return (
    <>
      <form id="todoForm" onSubmit={onSubmit}>
        <input
          value={nameInput}
          onChange={onChange}
          placeholder="Type todo"
          type="text"
        />
        <input data-testid="theSubmit" type="submit" disabled={!nameInput.length} />
      </form>

      <button onClick={toggleShowCompleteds}>
        {shouldShowCompleteds ? 'Hide' : 'Show'} Completed
      </button>
    </>
  )
}
