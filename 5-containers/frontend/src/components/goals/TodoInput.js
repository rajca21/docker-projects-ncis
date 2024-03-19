import React, { useState } from 'react';

import './TodoInput.css'; // Promenjeno ime CSS fajla
import Card from '../UI/Card';

function TodoInput(props) {
  const [enteredTodoText, setEnteredTodoText] = useState(''); // Promenjene promenljive

  function updateTodoTextHandler(event) {
    setEnteredTodoText(event.target.value);
  }

  function todoSubmitHandler(event) {
    event.preventDefault();

    if (enteredTodoText.trim().length === 0) {
      alert('Nevažeći tekst - unesite duži tekst!');
      return;
    }

    props.onAddTodo(enteredTodoText);

    setEnteredTodoText('');
  }

  return (
    <section id='todo-input'>
      <Card>
        <form onSubmit={todoSubmitHandler}>
          <label htmlFor='text'>Nova To-Do stavka</label>
          <input
            type='text'
            id='text'
            value={enteredTodoText}
            onChange={updateTodoTextHandler}
          />
          <button>Dodaj To-Do stavku za danas!</button>
        </form>
      </Card>
    </section>
  );
}

export default TodoInput;
