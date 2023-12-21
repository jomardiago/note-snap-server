import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { NotesService } from "./notes.service";
import { NotesController } from "./notes.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [NotesController],
  providers: [NotesService, PrismaService, JwtService],
})
export class NotesModule {}
