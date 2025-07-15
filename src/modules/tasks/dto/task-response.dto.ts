import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TaskResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  // add more fields as needed
}
