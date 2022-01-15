import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createQueryBuilder, Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}

  async findAll(search: string) {
    const query = createQueryBuilder().select('city').from(City, 'city');
    if (search)
      query
        .where('city.zipCode ~ :searchZip', { searchZip: `^${search}` })
        .orWhere('city.label ~* :searchLabel', { searchLabel: search });
    query.orderBy('city.label', 'ASC').limit(100);
    return await query.getMany();
  }
}
