export class ProjectCreatedEvent {
  constructor(
    public readonly projectId: string,
    public readonly title: string,
  ) {}
}
