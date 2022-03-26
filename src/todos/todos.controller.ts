import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './dto/todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private  todoService: TodoService) {}

  @Post('/create-todo')
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.createNewToDo(createTodoDto);
  }

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id:string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: CreateTodoDto): Promise<Todo>  {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Todo> {
    return this.todoService.remove(id);
  }
}
