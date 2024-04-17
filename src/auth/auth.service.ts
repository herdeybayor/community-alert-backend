import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async register(registerDto: RegisterDto) {
    const password = await bcrypt.hash(registerDto.password, 10);
    registerDto.password = password;
    const user = await this.usersService.create(registerDto);
    return {
      user,
      tokens: {
        access_token: this.generateAccessToken(user),
        refresh_token: this.generateRefreshToken(user),
      },
    };
  }

  async login(user: User) {
    const access_token = this.generateAccessToken(user);
    const refresh_token = this.generateRefreshToken(user);
    return {
      user,
      tokens: {
        access_token,
        refresh_token,
      },
    };
  }

  async refresh({ id }: User) {
    const user = await this.usersService.findOne(id);
    return {
      user,
      tokens: {
        access_token: this.generateAccessToken(user),
      },
    };
  }

  async getProfile(userId: number) {
    return await this.usersService.findOne(userId);
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  generateAccessToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.access_token_expiration'),
      secret: this.configService.get('jwt.access_token_secret'),
    });
  }

  generateRefreshToken(user: User) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('jwt.refresh_token_expiration'),
      secret: this.configService.get('jwt.refresh_token_secret'),
    });
  }

  async sendEmail(email: string, subject: string, html: string, context: any) {
    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
      context,
    });
  }
}
