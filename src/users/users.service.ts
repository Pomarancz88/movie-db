import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

// export type User = any;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {

    // truncate and create some default users

    this.userRepository.clear()
    .then(()=>this.create('test1', 'test1@localhost'))
    .then((u)=>{
      u.addFavorite('tt0363390');
      this.userRepository.save(u);
      this.create('test2', 'test2@localhost')
    })
    .then(()=>this.create('test3', 'test3@localhost'));
  }

  async create(name: string, email: string, password: string = 'bbbb'): Promise<User> {
    const u = new User();
    u.username = name;
    u.email = email;
    u.password = password;
    await this.userRepository.save(u);
    return u;
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      email
    });
  }

  async addFavorite(user: User, movieId: string): Promise<User | undefined> {

    user.addFavorite(movieId);
    await this.update(user);

    return user;
  }

  async removeFavorite(user: User, movieId: string): Promise<User | undefined> {

    user.removeFavorite(movieId);
    await this.update(user);

    return user;
  }

  async update(user: User): Promise<User | undefined> {
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
