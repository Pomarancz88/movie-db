import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GoogleAuthGuard } from 'src/auth/google-auth.guards';

@Controller('google')
export class GoogleController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(GoogleAuthGuard)
  @Render('setBearer')
  async googleAuthRedirect(@Req() req) {
    return {bearer: await this.authService.googleLogin(req)}
    return this.authService.googleLogin(req)
  }
}
