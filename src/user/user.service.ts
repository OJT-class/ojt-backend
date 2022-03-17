import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user';
import { Model } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>,){}

    // create user route
    async create(RegisterDTO: RegisterDTO){
        const { email } = RegisterDTO; // destructuring
        const user = await this.userModel.findOne({email});
        if(user){
            throw new HttpException('user already exists', HttpStatus.BAD_REQUEST); // return 404
        }
        const createdUser = new this.userModel(RegisterDTO); // create user
        await createdUser.save();
        // return user without pass
        return this.cleanUser(createdUser);
    }

    // clean password from user obj
    cleanUser(user: User) {
        const sanitizedUser = user.toObject();
        delete sanitizedUser['password'];
        return sanitizedUser;
      }
}
