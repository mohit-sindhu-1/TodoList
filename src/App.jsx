import { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)
  const editTodoId = useRef("")

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAdd = () => {
    for (const item of todos) {
      if (todo == item.todo) {
        setTodo("")
        return;
      }
    }

    setTodos([{ id: uuidv4(), todo, isCompleted: false }, ...todos])
    setTodo("")
  }

  const handleUpdate = () => {
    for (const item of todos) {
      if (todo == item.todo) {
        setTodo("")
        return;
      }
    }

    let index = todos.findIndex(item => {
      return item.id === editTodoId.current
    })
    let newTodos = [...todos]
    newTodos[index].todo = todo
    setTodos(newTodos)

    editTodoId.current = ""
    document.querySelector("#add").style = "display: inline";
    document.querySelector("#update").style = "display: node";

    setTodo("")
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => item.id == id)
    setTodo(t[0].todo)
    editTodoId.current = id
    document.querySelector("#add").style = "display: none";
    document.querySelector("#update").style = "display: inline";
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCompleted = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  return (
    <>
      <Navbar />
      <div className="lg:container mx-3 md:mx-auto my-5 rounded-xl bg-cyan-50 p-4 lg:w-2/5 md:w-1/2">
        <div className="top">
          <div className="flex justify-center">
            <h1 className='lg:text-xl font-bold text-center md:text-lg pb-3 border-b border-gray-300' >iTask - Manage your todos at one place</h1>
          </div>
          <div className='addTodo'>
            <h2 className='lg:text-lg font-bold mb-2 mt-5 sm:ml-6 md:text-base text-sm'>Add a Todo</h2>
          </div>
          <div className='mb-5 flex flex-col items-center gap-y-2'>
            <textarea onChange={handleChange} className='pt-1 px-3 outline-none sm:w-11/12 w-full h-28 resize-none' value={todo}></textarea>
            <button onClick={handleAdd} disabled={todo.length <= 3} id='add' className='disabled:bg-cyan-500 rounded-full border text-white bg-cyan-600 px-2 font-semibold text-sm py-1 w-36'>Add</button>
            <button onClick={handleUpdate} disabled={todo.length <= 3} id='update' className='disabled:bg-cyan-500 rounded-full border text-white bg-cyan-600 px-2 font-semibold text-sm py-1 w-36 hidden'>Update</button>
          </div>

          <div className='flex items-center gap-2 mb-4'>
            <input type="checkbox" onChange={toggleFinished} checked={showFinished} />
            <div className='text-xs font-bold'>Show Finished Todos</div>
          </div>
          <div className="flex justify-center">
            <div className='h-px bg-gray-300 w-11/12'></div>
          </div>
        </div>

        <div className="bottom">
          <div className='yourTodos'>
            <h2 className='lg:text-lg font-bold mt-4 mb-3 md:text-base text-sm'>Your Todos</h2>
          </div>
          <div className="todos">
            {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
            {todos.map((item) => {
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3 gap-x-4">
                <div className="flex gap-2 items-baseline">
                  <input onChange={(e) => { handleCompleted(e, item.id) }} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : "" + "md:text-sm text-xs"}>{item.todo}</div>
                </div>
                <div className="buttons flex gap-1">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='rounded-full border text-white bg-cyan-600 px-2 font-semibold text-sm py-1 h-8 hover:bg-cyan-700'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='rounded-full border text-white bg-cyan-600 px-2 font-semibold text-sm py-1 h-8  hover:bg-cyan-700'><MdDelete /></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
