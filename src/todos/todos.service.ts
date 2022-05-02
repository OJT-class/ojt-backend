import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    console.log("🚀 ~ file: todos.service.ts ~ line 13 ~ TodosService ~ create ~ createTodoDto", createTodoDto)
    const todoWithCompleted = {...createTodoDto, completed: false}
    const newTodo = new this.todoModel(todoWithCompleted);
    return await newTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoModel.find();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.todoModel.findOne({_id: id});
  }

  async update(id: string, updateTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true});
  }

  async remove(id: string): Promise<Todo> {
    return await this.todoModel.findByIdAndRemove(id);
  }
}
