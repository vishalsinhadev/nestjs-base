import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly service: UsersService) {}
  
  @Post()
    create(@Body() data) {
      return this.service.create(data.name, data.email, data.password);
    }
  
    @Get()
    findAll() {
      return this.service.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.service.findOne(id);
    }
  
    @Patch(':id')
    update(@Param('id') id: number, @Body() data) {
      return this.service.update(id, data);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.service.remove(id);
    }
}
