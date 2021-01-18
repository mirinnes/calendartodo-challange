import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './todoList.scss';
function TodoList({ onClose, todos, setTodos, day }) {
  const handleKeyPress = (e) => {
    let newTodoList;
    if (e.key === 'Enter') {
      if (day in todos) {
        let index = todos[day].todos.findIndex((t) => t === e.target.value);
        if (index === -1) {
          todos[day].todos.push(e.target.value);
          newTodoList = { ...todos };
        } else {
          newTodoList = { ...todos };
        }
      } else {
        newTodoList = {
          ...todos,
          [day]: { todos: [e.target.value], check: false },
        };
        console.log(newTodoList);
      }
      setTodos(newTodoList);
      console.log(todos);
    }
  };

  const toggleCheckedTodo = (e) => {
    console.log('e.target', e.target);
    console.log('i', Number(e.target.id));
  };

  return (
    <div className='container todoList'>
      <h1>
        Todo List
        <FontAwesomeIcon
          onClick={() => onClose()}
          icon={faTimes}
          className='icon todo'
        />
      </h1>
      <input
        defaultValue=''
        placeholder='Add your Todo here!'
        type='text'
        className='new-todo-item'
        onKeyPress={(e) => handleKeyPress(e)}
      />
      <p className='subtitle'>{day}</p>
      {todos[day] &&
        todos[day].todos.map((todo, i) => {
          return (
            <label
              key={todo.replaceAll(' ', '-')}
              id={todo.replaceAll(' ', '-')}
            >
              <input
                id={i}
                name={todo.replaceAll(' ', '-')}
                type='checkbox'
                className='checkbox-todo-item'
                value=''
                onClick={(e) => toggleCheckedTodo(e)}
              />
              <p>{todo}</p>
            </label>
          );
        })}
    </div>
  );
}

export default TodoList;
