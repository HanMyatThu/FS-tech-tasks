import { Response } from 'express'
import { Todo } from '../models/Todo';
import { matchedData } from 'express-validator';
import { AuthorizedInterface, TodoInterface } from '../interfaces';
import { jsonAll, jsonOne } from '../utils/general';
import HttpError from '../utils/httpError';

const createTodo = async (req: AuthorizedInterface, res: Response) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).send({
        error: "Title is required"
      })
    }
    const todo = new Todo({
      title,
      user: req.userId
    })
    await todo.save()
    return jsonOne<any>(res, 200, todo);
  } catch (e) {
    return res.status(500).send({
      error: {
        title: 'general_error',
        detail: 'An error occurred, Please retry again later',
        code: 500,
      },
    });
  }
}

const deleteTodo = async (req: AuthorizedInterface, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
      _id: id,
      user: req.userId,
    })
    if(!todo) {
      return HttpError(
        res,
        404,
        {
          title: 'Not Found',
          detail: 'Todo Not Found',
          code: 400,
        }
     );
    }
    await todo.deleteOne()
    return jsonOne<any>(res, 200, {
      error: null,
      message: "Todo is deleted"
    });

  } catch (e) {
    return res.status(500).send({
      error: {
        title: 'general_error',
        detail: 'An error occurred, Please retry again later',
        code: 500,
      },
    });
  }
}

const updateTodo = async (req: AuthorizedInterface, res: Response) => {
  try {
    const { id } = req.params
    const todo = await Todo.findOne({
      _id: id,
      user: req.userId
    })

    if(!todo) {
      return HttpError(
        res,
        404,
        {
          title: 'Not Found',
          detail: 'Todo Not Found',
          code: 400,
        }
     );
    }

    todo.status = !todo.status
    await todo.save()
    return jsonOne<any>(res, 200, todo);
  } catch (e) {
    return res.status(500).send({
      error: {
        title: 'general_error',
        detail: 'An error occurred, Please retry again later',
        code: 500,
      },
    });
  }
}

const getTodoByUser = async (req: AuthorizedInterface, res: Response) => {
  try {
    const userId = req.userId
    const todos = await Todo.find({
      user: userId
    }).select(['_id','title','status'])
  
    return jsonAll<any>(res,200, todos)
  } catch (e) {
    return res.status(500).send({
      error: {
        title: 'general_error',
        detail: 'An error occurred, Please retry again later',
        code: 500,
      },
    });
  }
}

export {
  createTodo,
  deleteTodo,
  updateTodo,
  getTodoByUser,
}