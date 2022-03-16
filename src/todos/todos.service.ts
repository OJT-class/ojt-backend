import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './interfaces/todo.interface';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo = new this.todoModel(createTodoDto)
    return await newTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoModel.find();
  }

  async findOne(id: string): Promise<Todo> {
    return await this.todoModel.findOne({_id: id});
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  async remove(id: string): Promise<Todo> {
    return await this.todoModel.findByIdAndRemove(id);
  }
}
