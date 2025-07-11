import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
import { log } from 'console';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { paginate } from 'src/common/utils/paginate.util';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  create(data: any) {
    log('data123', data)
    return this.projectRepo.save(data);
  }

  findAll(query: PaginationQueryDto) {
    return paginate(this.projectRepo, query, {
      order: { id: 'DESC' },
    });
    // return this.projectRepo.find();
  }

  findOne(id: number) {
    return this.projectRepo.findOneBy({ id });
  }

  update(id: number, data) {
    return this.projectRepo.update(id, data);
  }

  remove(id: number) {
    return this.projectRepo.delete(id);
  }
}
