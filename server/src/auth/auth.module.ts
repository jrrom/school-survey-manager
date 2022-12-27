import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from 'src/admins/admins.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [forwardRef(() => AdminsModule), JwtModule.register({
    secret: 'QLRKEKRM_J#(@($MN!@I))',
    signOptions: { expiresIn: '1d' }// Move to .env
  })],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
