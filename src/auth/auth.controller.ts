import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RequestEmailDto } from './dto/request-email.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { RefreshDto } from './dto/refresh.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';

@Controller('auth')
@ApiTags('Authentication')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req: Request & { user: User }) {
    return this.authService.login(req.user);
  }

  @Post('refresh')
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiBody({ type: RefreshDto })
  async refresh(@Request() req: Request & { user: User }) {
    return this.authService.refresh(req.user);
  }

  @Post('request-email-verification')
  @ApiOperation({ summary: 'Request email verification' })
  @ApiBody({ type: RequestEmailDto })
  async requestEmailVerification(@Body() { email }: RequestEmailDto) {
    return this.authService.requestEmailVerification(email);
  }

  @Post('verify-email')
  @ApiOperation({ summary: 'Verify email' })
  @ApiBody({ type: VerifyEmailDto })
  async verifyEmail(@Body() { token }: { token: string }) {
    return this.authService.verifyEmail(token);
  }

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, type: User, description: 'User profile' })
  async getProfile(@Request() req: Request & { user: User }) {
    return await this.authService.getProfile(req.user.id);
  }
}
