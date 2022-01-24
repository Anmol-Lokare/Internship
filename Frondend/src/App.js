import React, { useState, useEffect } from 'react';
import './App.css';
import APIHelper from './APIHelper.js';
import { Button, Checkbox } from '@material-ui/core';

import moment from 'moment';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const d = new Date(1552261496289).toDateString(); // to add date in short form ex. (Sat Jan 08 2022)
  //// Remove the numbers inside Date() to get the current date

  useEffect(() => {
    const fetchTodoAndSetTodos = async () => {
      const todos = await APIHelper.getAllTodos();
      setTodos(todos);
    };
    fetchTodoAndSetTodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    if (!todo) {
      alert('please enter something');
      return;
    }
    if (todos.some(({ task }) => task === todo)) {
      alert(`Task: ${todo} already exists`);
      return;
    }
    const newTodo = await APIHelper.createTodo(todo);
    setTodo('');
    console.log(newTodo);
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (e, id) => {
    try {
      e.stopPropagation();
      await APIHelper.deleteTodo(id);
      setTodos(todos.filter(({ _id: i }) => id !== i));
    } catch (err) {}
  };

  const updateTodo = async (e, id) => {
    e.stopPropagation();
    const payload = {
      completed: !todos.find((todo) => todo._id === id).completed,
    };
    const updatedTodo = await APIHelper.updateTodo(id, payload);
    setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
  };

  return (
    <>
      <div className='container'>
        <h2>Todo List</h2>
        <form className='form' onSubmit={createTodo}>
          <input
            type='text'
            required
            value={todo}
            onChange={({ target }) => setTodo(target.value)}
            placeholder='Enter a todo'
          />
          <Button Button size='small' variant='contained' type='submit'>
            Add
          </Button>
        </form>

        <div>
          {todos.length ? (
            todos.map(({ _id, task, Today, completed }, i) => (
              <div className='item' key={i}>
                <Checkbox
                  checked={completed}
                  onClick={(e) => updateTodo(e, _id)}
                  color='primary'
                />
                <h4 className={completed ? 'completed' : ''}>{task} </h4>
                <p className={completed ? 'completed' : ''}>
                  {moment(Today).format('ll')}
                </p>
                <p>
                  <Button
                    variant='contained'
                    onClick={(e) => deleteTodo(e, _id)}
                  >
                    delete
                  </Button>
                </p>
              </div>
            ))
          ) : (
            <p>No Todos Yet :(</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
