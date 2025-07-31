import { Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

export class BaseService<T> {
  constructor(protected readonly repo: Repository<T>) {}

  list(queryBuilderFn?: (qb: any) => any) {
    let qb = this.repo.createQueryBuilder();
    if (queryBuilderFn) {
      qb = queryBuilderFn(qb);
    }
    return qb.getMany();
  }

  getById(id: number) {
    return this.repo.findOne({ where: { id } as any });
  }

  async upsert(id: number | null, data: DeepPartial<T>) {
    if (id) {
      await this.repo.update(id as any, data);
      return this.getById(id as number);
    }
    const entity = this.repo.create(data as any);
    return this.repo.save(entity);
  }
}
