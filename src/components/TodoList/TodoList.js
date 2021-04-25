import React, { Component } from "react";
import Button from "reactstrap/lib/Button";
import TodoItem from "../TodoItem/TodoItem";

export default class TodoList extends Component {
  render() {
    const {
      showTaskData,
      clearList,
      handleDelete,
      todoDeleteMsg,
      editTodo,
    } = this.props;
    let taskData = [];
    if (showTaskData.length) {
      taskData = showTaskData.map((task) => {
        return (
          <TodoItem
            key={task.id}
            title={task.title}
            description={task.description}
            handleDelete={() => {
              handleDelete(task.id);
            }}
            todoDeleteMsg={todoDeleteMsg}
            editTodo={() => {
              editTodo(task.id, task.title, task.description);
            }}
          />
        );
      });
    }
    return (
      <ul className="list-group my-2">
        <h3 className="text-capitalize">Todo List </h3>
        <div className="d-flex justify-content-between mb-5">
          Task and Description
        </div>
        {taskData}
        <Button color="danger" onClick={clearList}>
          Clear all
        </Button>
        <p className="text-danger">{todoDeleteMsg}</p>
      </ul>
    );
  }
}
