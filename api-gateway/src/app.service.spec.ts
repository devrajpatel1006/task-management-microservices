import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { AppModule } from './app.module';
import { of } from 'rxjs';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('addUser', () => {
    it('should add a user successfully', async () => {
      // Mock the response from the microservice
      jest.spyOn(appService['clientServiceB'], 'send').mockImplementationOnce(() => of('User added successfully'));

      const userData = { /* your user data */ };

      const result = await appService.addUser(userData).toPromise();
      
      expect(result).toBe('User added successfully');
    });
  });

  describe('deleteUser', () => {
    it('should delete a user successfully', async () => {
      // Mock the response from the microservice
      jest.spyOn(appService['clientServiceB'], 'send').mockImplementationOnce(() => of('User deleted successfully'));

      const userData = { /* your user data */ };

      const result = await appService.deleteUser(userData).toPromise();
      
      expect(result).toBe('User deleted successfully');
    });
  });

  describe('getDefaultUserDetails', () => {
    it('should get default user details successfully', async () => {
      // Mock the response from the microservice
      jest.spyOn(appService['clientServiceB'], 'send').mockImplementationOnce(() => of('Default user details'));

      const userId = 123; // Your user ID

      const result = await appService.getDefaultUserDetails(userId).toPromise();
      
      expect(result).toBe('Default user details');
    });
  });
});