import express from 'express';
import {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoByUser
} from '../controllers/TodoController';
import auth from '../middlewares/auth';

const _router: express.Router = express.Router({
  mergeParams: true,
})

_router.get('/todos', auth, getTodoByUser);
_router.post('/todos', auth, createTodo);
_router.delete('/todos/:id', auth, deleteTodo);
_router.put('/todos/:id', auth, updateTodo);

export const router = _router;