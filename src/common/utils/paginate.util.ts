import { ObjectLiteral, Repository, FindManyOptions } from 'typeorm';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { PaginatedResult } from '../interfaces/pagination.interface';

export async function paginate<T extends ObjectLiteral>(
  repo: Repository<T>,
  query: PaginationQueryDto,
  options: FindManyOptions<T> = {},
): Promise<PaginatedResult<T>> {
  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;

  const [data, total] = await repo.findAndCount({
    ...options,
    take: limit,
    skip,
  });

  return {
    data,
    meta: {
      total,
      page,
      limit,
      lastPage: Math.ceil(total / limit),
    },
  };
}
