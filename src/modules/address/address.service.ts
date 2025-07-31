import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateUpdateAddressDto } from './dto/create-update-address.dto';
import { Request } from 'express';

function getLoggedInUserId(req: Request): number {
  // adapt this to your auth strategy; e.g., JWT payload in req.user
  return (req as any).user?.id;
}

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly repo: Repository<Address>,
  ) {}

  list(req: Request, filters?: Record<string, any>) {
    const userId = getLoggedInUserId(req);
    let qb: SelectQueryBuilder<Address> = this.repo
      .createQueryBuilder('addresses')
      .where('addresses.user_id = :userId', { userId });

    // replicate any incoming filter logic similar to Lumen code
    if (filters) {
      if (filters.city) {
        qb = qb.andWhere('addresses.city = :city', {
          city: filters.city,
        });
      }
      if (filters.state) {
        qb = qb.andWhere('addresses.state = :state', {
          state: filters.state,
        });
      }
      // ... add other conditional filters as needed
    }

    return qb.getMany();
  }

  async createOrUpdate(
    req: Request,
    dto: CreateUpdateAddressDto,
    id?: number,
  ): Promise<Address> {
    const userId = getLoggedInUserId(req);
    if (!userId) throw new BadRequestException('Unauthenticated user');

    const payload: Partial<Address> = {
      ...dto,
      user_id: userId,
    };

    if (id) {
      await this.repo.update(id, payload as any);
      return this.repo.findOne({ where: { id } as any });
    }

    const address = this.repo.create(payload as any);
    return this.repo.save(address);
  }

  async get(req: Request, slugOrId: string | number): Promise<Address | null> {
    const userId = getLoggedInUserId(req);
    const query = this.repo
      .createQueryBuilder('addresses')
      .where('addresses.id = :id', { id: slugOrId })
      .andWhere('addresses.user_id = :userId', { userId });

    return query.getOne();
  }
}
