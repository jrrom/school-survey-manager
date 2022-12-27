import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AdminsService } from 'src/admins/admins.service';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => AdminsService))
    private readonly AdminsService: AdminsService,
    private readonly jwtService: JwtService) {}

  async createJWT(admin: any) {
    const payload = { name: admin.name };

    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
