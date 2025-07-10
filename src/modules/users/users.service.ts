import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  // create(data: any) {
  //   return this.usersRepo.save(data);
  // }

  findAll() {
    return this.usersRepo.find();
  }

  findOne(id: number) {
    return this.usersRepo.findOneBy({ id });
  }

  update(id: number, data) {
    return this.usersRepo.update(id, data);
  }

  remove(id: number) {
    return this.usersRepo.delete(id);
  }

  async create(name: string, email: string, password: string): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ name, email, password: hashed });
    return this.usersRepo.save(user);
  }

 async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
