import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { sign } from 'jsonwebtoken';
import { Payload } from 'src/user/interfaces/payload';
import keys from 'src/config/keys';

@Injectable()
export class AuthService {
    constructor( private userService: UserService){}

    async signPayload(payload: Payload){
        return sign(payload, keys.SECRET_KEY, { expiresIn: '7d' });
    }

    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload);
      }
}
