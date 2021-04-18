import { Controller, Get, Post, Render, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guards';
import { LocalAuthGuard } from './auth/local-auth.guards';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Render('setBearer')
  async login(@Request() req) {
    return {bearer: await this.authService.login(req.user)}
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }

  @Get()
  @Render('selectLogin')
  selectLogin() {
    return {};
  }

  @Get('movies')
  @Render('movies')
  moviesList() {
    return {};
  }
}
