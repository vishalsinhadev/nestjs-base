import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GoogleLoginResponseDto } from './dto/google-login-response.dto';
import { GoogleLoginDto } from './dto/google-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);
    return { message: 'User created', user };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }

  @Post('google-login')
  
  async googleLogin(@Body() loginDto: GoogleLoginDto): Promise<GoogleLoginResponseDto> {
    const socialData = await this.authService.googleLogin(loginDto);

    return this.authService.validateSocialLogin('google', socialData);
  }
}
