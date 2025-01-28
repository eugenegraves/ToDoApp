import React from 'react'
import TodoList from './components/TodoList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <TodoList />
      </div>
    </div>
  )
}

export default App