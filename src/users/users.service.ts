import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { hash } from "bcrypt";

import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      const user = await this.findUserByEmail(data.email);
      if (user) throw new ConflictException("User already exists.");

      const hashedPassword = await hash(data.password, 10);
      await this.prismaService.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
      });

      return {
        message: "User created.",
      };
    } catch (error) {
      this.logger.error(`UsersService:create - ${error}`);
      throw error;
    }
  }

  findUserByEmail(email: string) {
    try {
      return this.prismaService.user.findFirst({
        where: {
          email,
        },
      });
    } catch (error) {
      this.logger.error(`UsersService:findUserByEmail - ${error}`);
      throw error;
    }
  }
}
