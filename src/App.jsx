import {TodoProvider} from './contexts/TodoContext'
import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, settodos] = useState([])
  const addTodo=(todo)=>{
    settodos((prev)=>{
      return [{id:Date.now(),...todo},...prev];
    });
  };

  const updateTodo = (id, updatedTodo) => {
    settodos((previousTodos) => {
      return previousTodos.map((todoItem) => {
        if (todoItem.id === id) {
          return updatedTodo; // Replace with updated todo
        } else {
          return todoItem; // Keep the same
        }
      });
    });
  };

  const deleteTodo=(id)=>{
    settodos((prev)=>{
      return prev.filter((prevItem)=>{
        return prevItem.id!=id;
      });
    });
  };

  const toggleTodo = (id) => {
    settodos((prev) => {
      return prev.map((prevItem) => {
        if (prevItem.id === id) {
          return {
            ...prevItem,
            completed: !prevItem.completed, // toggling (true to false or vice versa)
          };
        } else {
          return prevItem;
        }
      });
    });
  };

  useEffect(() => {
    const todos= JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length>0)
    {
      settodos(todos);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos))
  }, [todos])
  
  
  
  
  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleTodo}}>
      <div className='bg-[#172842] min-h-screen p-3'>
         <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white'>
            <h1 className='font-bold text-2xl text-center mb-8 mt-2'>Manage Your Todos </h1>
            <div className='mb-4'>
              {/* Add todos */}
              <TodoForm/>
            </div>
            <div className='flex flex-wrap gap-y-3'>
              {/* display todos */}
              {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
            </div>
         </div>
      </div>

    </TodoProvider>
  )
}

export default App
