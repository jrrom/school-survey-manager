import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { DeleteAdminDto } from './dto/delete-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('api/admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('login')
  login(@Body() loginAdminDto: LoginAdminDto) {
    return this.adminsService.login(loginAdminDto);
  }

  @Post('forgot/:id')
  forgot(@Param('id') id: string) {
    return this.adminsService.forgot(id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':user')
  findOne(@Param('user') user: string) {
    return this.adminsService.findOne(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(updateAdminDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Body() deleteAdminDto: DeleteAdminDto) {
    return this.adminsService.remove(deleteAdminDto.users);
  }
}
