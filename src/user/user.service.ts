import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user';
import { Model } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
import { Payload } from './interfaces/payload';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  // create user route
  async create(RegisterDTO: RegisterDTO) {
    const { email } = RegisterDTO; // destructuring
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST); // return 404
    }
    const createdUser = new this.userModel(RegisterDTO); // create user
    await createdUser.save();
    // return user without pass
    return this.cleanUser(createdUser);
  }

  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user does not exists, pls register first', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.cleanUser(user);
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }

  // clean password from user obj
  cleanUser(user: User) {
    const sanitizedUser = user.toObject();
    delete sanitizedUser['password'];
    return sanitizedUser;
  }

  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }
}
