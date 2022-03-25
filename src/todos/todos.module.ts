import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TodosController } from './todos.controller';
import { TodoSchema } from './schemas/todo.schema';
import { TodoService } from './todo.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Todo', schema: TodoSchema }])],
  controllers: [TodosController],
  providers: [TodoService]
})
export class TodosModule {}
