import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

const allCities = [
  { zipCode: 44000, city: 'Nantes' },
  { zipCode: 44100, city: 'Nantes' },
  { zipCode: 85400, city: 'Lucçon' },
];

const mockCitiesService = {
  findAll: jest.fn().mockResolvedValue(allCities),
};

describe('CitiesController', () => {
  let controller: CitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        CitiesService,
        { provide: CitiesService, useValue: mockCitiesService },
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /cities', () => {
    it('should return all cities', async () => {
      const expected = [
        { zipCode: 44000, city: 'Nantes' },
        { zipCode: 44100, city: 'Nantes' },
        { zipCode: 85400, city: 'Lucçon' },
      ];
      const actual = await controller.findAll();
      expect(actual).toEqual(expected);
    });
  });
});
