import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { IsOptional, IsString } from 'class-validator';

export class ProjectQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;
}
