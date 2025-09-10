import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { ScreenShotService } from './screenshot.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('screen-shot')
export class ScreenShotController {
  constructor(private readonly service: ScreenShotService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async take(@Body() data: any) {
    return this.service.take(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('download/:fileName')
  async download(@Param('fileName') fileName: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'tmp', fileName);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    res.download(filePath, fileName, (err) => {
      if (err) {
        throw new NotFoundException('Error while downloading file');
      }

      // Optionally remove file after download
      fs.unlinkSync(filePath);
    });
  }
}
