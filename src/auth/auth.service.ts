import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto } from "./dtos/login.dto";
import { UsersService } from "src/users/users.service";
import { JWT_SECRET_KEY } from "src/constants";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(data: LoginDto) {
    try {
      const user = await this.usersService.findUserByEmail(data.email);
      if (!user) throw new NotFoundException("User not found.");

      const isPasswordMatched = await compare(data.password, user.password);
      if (!isPasswordMatched)
        throw new UnauthorizedException("Invalid credentials.");

      delete user.password;
      const accessToken = await this.jwtService.signAsync(user, {
        secret: JWT_SECRET_KEY,
      });
      return {
        ...user,
        accessToken,
      };
    } catch (error) {
      this.logger.error(`AuthService:login - ${error}`);
      throw error;
    }
  }
}
