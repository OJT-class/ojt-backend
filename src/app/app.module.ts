import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from '../todos/todos.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import keys from 'src/config/keys';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TodosModule,
    MongooseModule.forRoot(keys.MONGO_URI),
    UserModule,
    AuthModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

