import { forwardRef, HttpException, HttpStatus, Inject, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as nodemailer from 'nodemailer';

let userTokens: any[] = [];

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: "GtaVoting@gmail.com",
    clientId: "927529829368-22pt897kpni50u0jn3jdmg7hsn0e3emu.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken: "1//04ZSTYNTgwQocCgYIARAAGAQSNwF-L9IrAXtGOOC5Z_ZxMNsFnjdsuy0Hb6NeONQAASslNH9M1ad3sREE4YKhvZgsg95nGCGMmac"
  },
});

transporter.set("oauth2_provision_cb", (user: any, renew, callback) => {
  let accessToken = userTokens[user];
  if (!accessToken) {
    return callback(new Error("Unknown user"));
  } else {
    return callback(null, accessToken);
  }
});

type mail = {
    from: string,
    to: string,
    subject: string,
    text: string,
}
 
function sendMail(options: mail) {
  transporter.sendMail(options, (err, data) => {
    if (err) { console.error(err) }
  })
}

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @Inject(forwardRef(() => AuthService))
    private AuthService: AuthService
  ) {}

  async login(createAdminDto: LoginAdminDto) {
    return await this.adminRepository.findOneByOrFail({ 'user': createAdminDto.user })
      .then(async (response) => {
        if (response) {

          //return success
          if (response.password === createAdminDto.password) {
            return await this.AuthService.createJWT(response.user);
          } else {
            throw new HttpException('Wrong user or password.', HttpStatus.BAD_REQUEST);
          }
        }
        else {
          throw new HttpException('Wrong user or password.', HttpStatus.BAD_REQUEST);
        }})
      .catch((err) => { throw  new HttpException('Unable to find user.', HttpStatus.NOT_FOUND)});
  }

  async create(createAdminDto: CreateAdminDto) {
    return await this.adminRepository.findOneByOrFail({ 'user': createAdminDto.user })
      .then((response) => {
          throw new HttpException("Admin already exists", HttpStatus.BAD_REQUEST);
        })
      .catch((err) => {
        const admin = this.adminRepository.create(createAdminDto);
        return this.adminRepository.save(admin);
      })
  }

  async findAll(): Promise<Admin[]> {
    return await this.adminRepository.find().catch((err) => { throw err });
  }

  async forgot(id: string) {
    let user = await this.findOne(id);
    return sendMail({
      from: "GtaVoting@gmail.com",
      to: user.email,
      subject: "Here is your password.",
      text: "Your password is: " + user.password
    })
  }

  async findOne(user: string) {
    return await this.adminRepository.findOneByOrFail({'user': user }).catch((err) => {
      throw new HttpException('Unable to find user.', HttpStatus.NOT_FOUND);
    });
  }

  async update(updateAdminDto: UpdateAdminDto) {
    return await this
      .adminRepository.findOneByOrFail({'user': updateAdminDto.oldUser}).catch((err) => {
        throw new HttpException('Unable to find user.', HttpStatus.NOT_FOUND);
      })
      .then((response) =>
        {
          return this.adminRepository.update({
            'user': response.user
          }, {
            'user': updateAdminDto.newUser,
            'email': updateAdminDto.email,
            'password': updateAdminDto.password
          }).then((response) => {
            return this.findOne(updateAdminDto.newUser);
          }).catch((err) => {
            throw err;
          })
        }
      ).catch((err) =>
        { throw new HttpException('Unable to find user.', HttpStatus.NOT_FOUND); });
  }

  async remove(users: string[]) {
    return await this.adminRepository.delete(users).catch((err) => { throw err });
  }
}
