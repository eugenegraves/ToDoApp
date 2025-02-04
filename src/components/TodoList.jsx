// Import necessary dependencies from React
// useState is a Hook that lets us add state to functional components
import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

import HorizontalProgressBar from './HorizontalProgressBar'

// Define the TodoList component as a functional component
const TodoList = () => {
  // State Declarations using useState Hook
  // todos: array to store all todo items
  // setTodos: function to update the todos array
  const [todos, setTodos] = useState([])

  //This makes it so that whenever todos changes we update the number of elements that have completed as true
  const [completedCount, setCompletedCount] = useState(0)
  useEffect(() => {
    const numCompleted = todos.filter((item) => item.completed).length
    setCompletedCount(numCompleted)
  }, [todos])

  //This rerenders the component to give the progress bar effect
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10
        return newProgress > 100 ? 0 : newProgress
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  // inputValue: stores the current text in the input field
  // setInputValue: function to update the input field text
  const [inputValue, setInputValue] = useState('')

  // Function that handles form submission when adding a new todo
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault()

    // If the input is empty or only contains whitespace, don't add the todo
    if (!inputValue.trim()) return

    // Add new todo to the todos array
    // ...todos spreads the existing todos array
    setTodos([
      ...todos,
      {
        id: Date.now(), // Create unique ID using current timestamp
        text: inputValue, // The todo text from input
        completed: false, // Initial completion status
      },
    ])

    // Clear the input field after adding todo
    setInputValue('')
  }

  // Function to toggle the completed status of a todo
  const toggleTodo = (id) => {
    // Map through all todos and update the matched one
    setTodos(
      todos.map((todo) =>
        // If this todo matches the id we're looking for...
        todo.id === id
          ? // Create a new object with all properties of the todo (...todo)
            // but flip the completed status
            { ...todo, completed: !todo.completed }
          : // If it's not the todo we're looking for, keep it unchanged
            todo
      )
    )
  }

  // Function to delete a todo by filtering it out of the array
  const deleteTodo = (id) => {
    // Filter out the todo with the matching id
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  //GSAP Animations
  /*Title Fade In*/
  const textRef = useRef(null)
  useEffect(() => {
    gsap.set(textRef.current, { opacity: 0 })

    gsap.to(textRef.current, {
      duration: 2,
      opacity: 1,
      ease: 'power1.out',
      delay: 0.25,
    })
  }, [])
  /*Input Box Fadein/Float Up*/
  const inputBoxRef = useRef(null)
  useEffect(() => {
    if (inputBoxRef.current) {
      const naturalPos = inputBoxRef.current.offsetTop
      gsap.set(inputBoxRef.current, {
        opacity: 0,
        y: naturalPos - 76,
      })

      gsap.to(inputBoxRef.current, {
        duration: 1,
        opacity: 1,
        y: naturalPos - 96,
        ease: 'power1.out',
        delay: 1,
      })
    }
  }, [])
  /*Add Button Fadein/Float Left*/
  const addButtonRef = useRef(null)
  useEffect(() => {
    if (addButtonRef.current) {
      gsap.set(addButtonRef.current, {
        opacity: 0,
      })

      gsap.to(addButtonRef.current, {
        duration: 1,
        opacity: 1,
        ease: 'power1.out',
        delay: 2,
      })
    }
  }, [])

  // The JSX that will be rendered
  return (
    // Main container with Tailwind CSS classes for styling
    <div className="max-w-md mx-auto p-4">
      {/* Title of the todo list */}
      <h1 id="title" className="text-2xl font-bold mb-4" ref={textRef}>
        Todo List
      </h1>

      {/* Form for adding new todos */}
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        {/* Input field for new todo text */}
        <input
          type="text"
          value={inputValue} // Controlled input - value comes from state
          onChange={(e) => setInputValue(e.target.value)} // Update state on change
          placeholder="Add a new todo..."
          className="flex-1 p-2 border rounded"
          ref={inputBoxRef}
        />
        {/* Submit button to add new todo */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          ref={addButtonRef}
        >
          Add
        </button>
      </form>

      {/* List of todos */}
      <ul className="space-y-2">
        {/* Map through todos array to create list items */}
        {todos.map((todo) => (
          <li
            key={todo.id} // Unique key required by React for list items
            className="flex items-center justify-between p-2 border rounded"
          >
            {/* Left side: checkbox and todo text */}
            <div className="flex items-center gap-2">
              {/* Checkbox for marking todo as complete */}
              <input
                type="checkbox"
                checked={todo.completed} // Controlled checkbox
                onChange={() => toggleTodo(todo.id)} // Toggle on change
                className="h-4 w-4"
              />
              {/* Todo text - applies strike-through style if completed */}
              <span
                className={todo.completed ? 'line-through text-gray-500' : ''}
              >
                {todo.text}
              </span>
            </div>
            {/* Delete button */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <HorizontalProgressBar
        progress={
          todos.length > 0
            ? (completedCount / todos.length) * 100
            : (0 / 1) * 100
        }
      />
    </div>
  )
}

// Export the component so it can be imported elsewhere
export default TodoList
