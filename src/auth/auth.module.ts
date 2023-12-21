import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersService } from "src/users/users.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, PrismaService, JwtService],
})
export class AuthModule {}
