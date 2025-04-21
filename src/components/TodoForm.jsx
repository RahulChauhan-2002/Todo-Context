import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

const TodoForm = () => {

    const [Todo, setTodo]=useState("")
    const {addTodo}=useTodo()

    const add=(e)=>{
        e.preventDefault();
        if(!Todo) return 
        addTodo({id:Date.now(), todo:Todo, completed:false})
        setTodo("");
    }

  return (
    <form onSubmit={add} className='flex'>
        <input 
          type="text" 
          value={Todo}
          onChange={(e)=>setTodo(e.target.value)}
          placeholder='Write Todo . . .' 
          className='rounded-l-lg bg-white/20 w-full px-3 py-2 border-black/10 outline-none duration-150'
        />
        <button 
          type='submit'
          className='bg-green-600 px-3 shrink-0 rounded-r-lg cursor-pointer text-white'
        >Add</button>
    </form>
  )
}

export default TodoForm