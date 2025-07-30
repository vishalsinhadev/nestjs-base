import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Project } from './projects.entity';
import { paginate } from 'src/common/utils/paginate.util';
import { ProjectQueryDto } from './dto/project-query.dto';
import { ProjectResponseDto } from './dto/project-response.dto';
import { plainToInstance } from 'class-transformer';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProjectCreatedEvent } from 'src/modules/projects/events/project-created.event';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepo: Repository<Project>,
     private eventEmitter: EventEmitter2,
  ) {}
  
  async create(data: any) {
    const project = await this.projectRepo.save(data);
    this.eventEmitter.emit(
      'project.created',
      new ProjectCreatedEvent(project.id, project.title),
    );
    return project;
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

  update(id: number, data : any) {
    return this.projectRepo.update(id, data);
  }

  remove(id: number) {
    return this.projectRepo.delete(id);
  }
}
