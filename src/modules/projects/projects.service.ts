import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Project } from './projects.entity';
import { paginate } from 'src/common/utils/paginate.util';
import { ProjectQueryDto } from './dto/project-query.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { plainToInstance } from 'class-transformer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
  ) {}
  
  create(data: any) {
    return this.projectRepo.save(data);
  }

  async findAll(query: ProjectQueryDto) {
    const result = await paginate(this.projectRepo, query, {
      where: {
        title: ILike(`%${query.search || ''}%`)
      },
      relations: ['tasks'],
      order: { id: 'DESC' },
    });
    return {
    ...result,
    data: plainToInstance(ProjectResponseDto, result.data, {
      excludeExtraneousValues: true,
    }),
  };
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
