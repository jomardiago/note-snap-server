import { Injectable, Logger } from "@nestjs/common";

import { PrismaService } from "src/prisma/prisma.service";
import { CreateNoteDto } from "./dtos/create-note.dto";
import { UpdateNoteDto } from "./dtos/update-note.dto";

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateNoteDto, userId: string) {
    try {
      await this.prismaService.note.create({
        data: {
          ...data,
          userId,
        },
      });

      return {
        message: "Note created.",
      };
    } catch (error) {
      this.logger.error(`NotesService:create - ${error}`);
      throw error;
    }
  }

  findAll(userId: string) {
    try {
      return this.prismaService.note.findMany({
        where: {
          userId,
        },
      });
    } catch (error) {
      this.logger.error(`NotesService:findAll - ${error}`);
      throw error;
    }
  }

  async update(id: string, data: UpdateNoteDto, userId: string) {
    try {
      await this.prismaService.note.update({
        where: {
          id,
          userId,
        },
        data: {
          ...data,
        },
      });

      return {
        message: "Note udpated.",
      };
    } catch (error) {
      this.logger.error(`NotesService:update - ${error}`);
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    try {
      await this.prismaService.note.delete({
        where: {
          id,
          userId,
        },
      });

      return {
        message: "Note deleted.",
      };
    } catch (error) {
      this.logger.error(`NotesService:remove - ${error}`);
      throw error;
    }
  }
}
