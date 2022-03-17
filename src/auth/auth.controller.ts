import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDTO } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() RegisterDTO: RegisterDTO) {
    const user = await this.userService.create(RegisterDTO);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('login')
  async login(@Body() UserDTO: LoginDTO) {
    const user = await this.userService.findByLogin(UserDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
