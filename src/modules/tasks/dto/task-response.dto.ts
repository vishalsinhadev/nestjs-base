import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TaskResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  created_at: Date;
}
