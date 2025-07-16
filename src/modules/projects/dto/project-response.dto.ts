import { Exclude, Expose, Type } from 'class-transformer';
import { TaskResponseDto } from 'src/modules/tasks/dto/task-response.dto';

@Exclude()
export class ProjectResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  created_at: Date;

  @Expose()
  @Type(() => TaskResponseDto)
  tasks: TaskResponseDto[];
}
