import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState("")
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinish = (e) => {
    setShowFinished(!showFinished)
  }
  

  const handleAdd = () => {
    if (editingId) {
      setTodos(todos.map(item => {
        console.log(item.todo)
        return item.id === editingId ? { ...item, todo } : item
      }))
      setEditingId("")
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    }
    setTodo("")
    saveToLS()
  }

  const handleEdit = async (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    setEditingId(id)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let a = confirm('Are you sure you want to delete this Todo')
    if (a) {
      let newTodos = todos.filter(item => {
        return item.id !== id
      })
      setTodos(newTodos)
    }
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="md:container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-1/2">
      <h1 className='font-bold text-center sm:text-3xl text-2xl mb-3'>iTask - Manage your todos at one place</h1>
        <div className="addTodo">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className='flex gap-2'>
          <input onChange={handleChange} value={todo} className='w-full rounded-md px-2' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-700 disabled:bg-violet-700 hover:bg-violet-950 p-2 py-1 sm:mr-6 mr-2 text-sm font-bold text-white rounded-md '>Save</button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinish} checked={showFinished} className='my-4' /> Show Finished
        <div className='h-[1px] bg-black opacity-15 my-2 mx-auto w-[90%]'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-7'>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="flex justify-between sm:w-3/4 2xl:w-1/2 w-full mt-3 ">
                    <div className='flex gap-3'>
                      <input onChange={handleCheckbox} name={item.id} type="checkbox" checked={item.isCompleted} />
                      <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                    </div>
                    <div className="flex h-full">
                      <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 mx-1 text-sm font-bold text-white rounded-md '><FaEdit /></button>
                      <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 hover:bg-violet-950 p-2 py-1 mx-1 text-sm font-bold text-white rounded-md '><AiFillDelete /></button>
                    </div>
                  </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App

