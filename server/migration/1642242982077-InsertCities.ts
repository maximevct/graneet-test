import { City } from 'src/cities/entities/city.entity';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import * as cities from '../assets/codes-postaux.json';

function transformCity(element: any) {
  const city = new City();
  city.zipCode = element.codePostal;
  city.zipCity = element.codeCommune;
  city.name = element.nomCommune.replace(`'`, `''`);
  city.label = element.libelleAcheminement.replace(`'`, `''`);
  return city;
}

export class InsertCities1642242982077 implements MigrationInterface {
  public async up(): Promise<void> {
    const cityRepository = getRepository<City>(City);
    await cityRepository.save(cities.map(transformCity), {
      chunk: cities.length / 500,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.clearTable('city');
  }
}
