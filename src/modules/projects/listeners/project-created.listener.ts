import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { ProjectCreatedEvent } from '../events/project-created.event';

@Injectable()
export class ProjectCreatedListener {
  @OnEvent('project.created', { async: true })
  async handleProjectCreatedEvent(event: ProjectCreatedEvent) {
    console.log('📢Awesome !!! Project Created Event Received:', event);
  }
}
