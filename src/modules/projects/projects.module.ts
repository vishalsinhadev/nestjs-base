import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.entity';
import { ProjectCreatedListener } from 'src/listeners/project-created.listener';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectsService, ProjectCreatedListener ],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
