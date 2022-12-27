import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admins/entities/admin.entity';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { SurveysModule } from './surveys/surveys.module';
import { Student } from './students/entities/student.entity';
import { Survey } from './surveys/entities/survey.entity';
import { Option } from './surveys/entities/option.entity';
import { SurverController } from './surver/surver.controller';
import { SurverModule } from './surver/surver.module'
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports:
  [AdminsModule,
   TypeOrmModule.forRoot({
     type: process.env.type as "aurora-mysql",
     host: process.env.host,
     port: Number(process.env.port),
     username: process.env.username,
     password: process.env.password,
     database: process.env.database,
     entities: [Admin, Student, Survey, Option],
     synchronize: true,
   }),
   ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'surveys'), serveRoot: '/static'}),
   AuthModule,
   StudentsModule,
   SurverModule,
   SurveysModule],
  controllers: [AppController, SurverController],
  providers: [AppService],
})
export class AppModule {}
