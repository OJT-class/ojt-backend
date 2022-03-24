import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = new this.todoModel(createTodoDto);
    return await newTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoModel.find({});
  }

  async findOne(_id: string): Promise<Todo> {
    return await this.todoModel.findOne({_id});
  }

  async update(_id: string, updateTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(_id, updateTodoDto, { new: true});
  }

  async remove(_id: string): Promise<Todo> {
    return await this.todoModel.findByIdAndRemove(_id);
  }
}
