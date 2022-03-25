import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { RegisterDTO } from 'src/user/dto/register.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { IUserResponse } from 'src/user/interfaces/userResponse.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // exmaple for sensitive route that we get only with token
  @Get('/onlyauth')
  @UseGuards(AuthGuard('jwt'))
  async hiddenInformation() {
    return 'hidden information';
  }

  @Post('register')
  async register(@Body() RegisterDTO: RegisterDTO): Promise<IUserResponse> {
    const user = await this.userService.createNewUser(RegisterDTO);
    const payload = {
      email: user.email,
    };

    const token = await this.authService.signPayload(payload);
    return {
      idUser: user._id,
      email: user.email,
      token,
    };
  }

  @Post('login')
  async login(@Body() UserDTO: LoginDTO): Promise<IUserResponse> {
    const user = await this.userService.login(UserDTO);
    const payload = {
      email: user.email,
    };
    const token = await this.authService.signPayload(payload);
    return {
      idUser: user._id,
      email: user.email,
      token,
    };
  }
}
