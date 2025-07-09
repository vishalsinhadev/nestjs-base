import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from '../auth/dto/login.dto';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() body: LoginDto) {
    const user = await this.usersService.create(body.email, body.password);
    return { message: 'User created', user };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) return { message: 'Invalid credentials' };
    return this.authService.login(user);
  }
}
