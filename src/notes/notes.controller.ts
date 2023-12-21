import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";

import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dtos/create-note.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";
import { RequestUser } from "src/types";
import { UpdateNoteDto } from "./dtos/update-note.dto";

@UseGuards(AuthGuard)
@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() data: CreateNoteDto, @Request() req: RequestUser) {
    return this.notesService.create(data, req.user.id);
  }

  @Get()
  findAll(@Request() req: RequestUser) {
    return this.notesService.findAll(req.user.id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() data: UpdateNoteDto,
    @Request() req: RequestUser
  ) {
    return this.notesService.update(id, data, req.user.id);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Request() req: RequestUser) {
    return this.notesService.remove(id, req.user.id);
  }
}
