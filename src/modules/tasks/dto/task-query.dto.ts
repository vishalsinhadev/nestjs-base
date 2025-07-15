import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { IsOptional, IsString } from 'class-validator';

export class TaskQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
