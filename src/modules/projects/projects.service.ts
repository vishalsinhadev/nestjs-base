import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Project } from './projects.entity';
import { paginate } from 'src/common/utils/paginate.util';
import { ProjectQueryDto } from './dto/project-query.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}

  create(data: any) {
    return this.projectRepo.save(data);
  }

  findAll(query: ProjectQueryDto) {
    return paginate(this.projectRepo, query, {
      where: {
        title: ILike(`%${query.search || ''}%`)
      },
      relations: ['tasks'],
      order: { id: 'DESC' },
    });
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
