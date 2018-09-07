const TodoItem = require('../models').TodoItem;

module.exports = {
  create(req, res){
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      })
      .then(TodoItem => res.status(201).send(TodoItem))
      .catch(error => res.status(400).send(error));
  },

  list(req, res){
    return TodoItem
      .all()
      .then(todoItems => res.status(200).send(todoItems))
      .catch(error => res.status(400).send(error));
  },

  update(req, res){
    const {todoId, todoItemId} = req.params;
    return TodoItem
      .find({
        where: {
          id: todoItemId,
          todoId: todoId,
        },
      })
      .then(todoItem => {
        if(!todoItem){
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }

        return todoItem
          .update(req.body, {fields: Object.keys(req.body)})
          ////The above ^ method will only take fields that contain items and update
          ////The below method sets an OR default value, not scalable for many fields
            // {content: req.body.content || todoItem.content,
            // complete: req.body.complete || todoItem.complete,})
          .then(updatedTodoItem => res.status(200).send(updatedTodoItem))
          .catch(error => res.status(400).send(error));
      })
  },

  destroy(req, res){
    const {todoId, todoItemId} = req.params;
    return TodoItem
      .find({
        where: {
          id: todoItemId,
          todoId: todoId,
        }
      })
      .then(todoItem => {
        if(!todoItem) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }

        return todoItem
          .destroy()
          .then(() => res.status(200).send({message: "todoItem successfully deleted!"}))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },


};