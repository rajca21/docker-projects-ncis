import React from 'react';

import './TodoItem.css';

function TodoItem(props) {
  return <li className="goal-item" onClick={props.onDelete.bind(null, props.id)}>{props.text}</li>;
}

export default TodoItem;
