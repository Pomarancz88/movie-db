import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { FacebookAuthGuard } from 'src/auth/facebook-auth.guards';

@Controller('facebook')
export class FacebookController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(FacebookAuthGuard)
  async facebookAuth(@Req() req) {}

  @Get('redirect')
  @UseGuards(FacebookAuthGuard)
  facebookAuthRedirect(@Req() req) {
    return this.authService.facebookLogin(req)
  }
}
