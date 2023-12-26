import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Repository } from 'typeorm';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  describe('addUser', () => {
    it('should return a success message when a user is added', async () => {
      let user: any = {};
      user.username = 'username';
      user.email = 'email@gmail.com';
      user.password = 'password';
      user.type = '1';

      jest.spyOn(appService, 'create').mockImplementation(async () => user);

      const result = await appController.addUser(user);

      expect(result).toEqual({
        status: true,
        message: 'User added successfully.',
        data: user,
      });
    });

    it('should return a success message when a user is added', async () => {
      const user = new User();
      user.password = 'password';

      jest.spyOn(appService, 'create').mockImplementation(async () => user);

      const result = await appController.addUser(user);

      expect(result).toEqual({
        status: true,
        message: 'User added successfully.',
        data: user,
      });
    });

    describe('deleteUser', () => {
      it('should return a success message when a user is deleted', async () => {
        const user = new User();
        user.is_deleted = 0;

        jest
          .spyOn(appService, 'findOneBy')
          .mockImplementation(async () => user);
        jest.spyOn(appService, 'create').mockImplementation(async () => user);

        const result = await appController.deleteUser({ user_id: 1 });

        expect(result).toEqual({
          status: true,
          message: 'User deleted successfully.',
          data: user,
        });
      });
    });

    describe('getDefaultUserDetails', () => {
      it('should return user details', async () => {
        const user = new User();

        jest
          .spyOn(appService, 'findOneBy')
          .mockImplementation(async () => user);

        const result = await appController.getDefaultUserDetails(1);

        expect(result).toEqual({
          status: true,
          message: 'User details found',
          data: user,
        });
      });
    });
  });
});
