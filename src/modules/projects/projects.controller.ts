import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ProjectQueryDto } from './dto/project-query.dto';
import { IdValidationPipe } from 'src/common/pipes/id-validation.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { log } from 'console';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly service: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image_file', {
      storage: diskStorage({
        destination: './uploads/projects',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(@UploadedFile() image: Express.Multer.File, @Body() data: any) {
    if (image) {
      data.image_file = image.filename;
    }
    return this.service.create(data);
  }

  @Get()
  findAll(@Query() query: ProjectQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', IdValidationPipe) id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', IdValidationPipe) id: number, @Body() data: any) {
    return this.service.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', IdValidationPipe) id: number) {
    return this.service.remove(id);
  }
}
