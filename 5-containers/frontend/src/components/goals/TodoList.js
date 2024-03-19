import React from 'react';

import './TodoList.css'; // Promenjeno ime CSS fajla
import Card from '../UI/Card';
import TodoItem from './TodoItem.js'; // Promenjen naziv komponente

function TodoList(props) {
  const nemaTodos = !props.todos || props.todos.length === 0;

  return (
    <section id='course-todos'> {/* Promenjeno ID */}
      <Card>
        <h2> <i>Tvoja današnja To-Do lista</i></h2> {/* Promenjen naslov */}
        {nemaTodos && <h2>Nema pronađenih To-Do stavki. Počni dodavati neke!</h2>} {/* Promenjen tekst */}
        <ul>
          {props.todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              onDelete={props.onDeleteTodo}
            />
          ))}
        </ul>
      </Card>
    </section>
  );
}

export default TodoList;
