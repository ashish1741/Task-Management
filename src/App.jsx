import React, { useState } from 'react'
import Header from './components/Header'
import Center from './components/Center'

function App() {
  const [taskModelOpen, setTaskModelOpen] = useState(false)


  return (
    <div>
      <Header taskModelOpen={taskModelOpen} setTaskModelOpen = {setTaskModelOpen}  />
      <Center />
    </div>
  )
}

export default App