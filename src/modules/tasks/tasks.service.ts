import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Task } from './tasks.entity';
import { log } from 'console';
import { paginate } from 'src/common/utils/paginate.util';
import { TaskQueryDto } from './dto/task-query.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  create(data: any) {
    return this.taskRepo.save(data);
  }

  findAll(query: TaskQueryDto) {
    return paginate(this.taskRepo, query, {
      where: {
        title: ILike(`%${query.search || ''}%`)
      },
      order: { id: 'DESC' },
    });
  }

  findOne(id: number) {
    return this.taskRepo.findOneBy({ id });
  }

  update(id: number, data) {
    return this.taskRepo.update(id, data);
  }

  remove(id: number) {
    return this.taskRepo.delete(id);
  }
}
