import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private UsersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // TODO: add hash function
    const user = await this.UsersService.findOne(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async googleLogin(req): Promise<string> {
    if (!req.user) {
      return 'no user'
    }

    let user = await this.UsersService.findOne(req.user.email);

    if (!user) {
      user = await this.UsersService.create(
        `${req.user.firstName} ${req.user.lastName}`,
        req.user.email,
        'googleLogin'
      )
    }

    return this.jwtService.sign(req.user);
  }

  async facebookLogin(req) {
    if (!req.user) {
      return 'no user'
    }

    let user = await this.UsersService.findOne(req.user.email);

    if (!user) {
      user = await this.UsersService.create(
        `${req.user.firstName} ${req.user.lastName}`,
        req.user.email,
        'facebookLogin'
      )
    }

    return this.jwtService.sign(req.user);
  }
}
