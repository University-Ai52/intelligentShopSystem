import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should login with the v1 auth endpoint and store accessToken', () => {
    service.login({ email: 'john@example.com', password: 'Password123!' }).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/v1/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ user: { email: 'john@example.com' }, accessToken: 'token-123', refreshToken: 'refresh-123' });

    expect(localStorage.getItem('accessToken')).toBe('token-123');
    expect(localStorage.getItem('refreshToken')).toBe('refresh-123');
  });

  it('should register using firstName and lastName payload', () => {
    service.register({ firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'Password123!' }).subscribe();

    const req = httpMock.expectOne('http://localhost:3000/api/v1/auth/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123!'
    });
    req.flush({ user: { email: 'john@example.com' }, accessToken: 'token-456', refreshToken: 'refresh-456' });
  });
});
