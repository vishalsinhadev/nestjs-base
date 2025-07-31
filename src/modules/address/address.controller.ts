import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateUpdateAddressDto } from './dto/create-update-address.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('address')
@UseGuards(AuthGuard)
export class AddressController {
  constructor(private readonly service: AddressService) {}

  @Get('list')
  list(@Req() req: Request) {
    return this.service.list(req, req.query as any);
  }

  @Post('save')
  save(@Req() req: Request, @Body() dto: CreateUpdateAddressDto) {
    return this.service.createOrUpdate(req, dto);
  }

  @Put('save/:id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: CreateUpdateAddressDto,
  ) {
    return this.service.createOrUpdate(req, dto, parseInt(id, 10));
  }

  @Get(':id')
  get(@Req() req: Request, @Param('id') id: string) {
    return this.service.get(req, id);
  }
}
