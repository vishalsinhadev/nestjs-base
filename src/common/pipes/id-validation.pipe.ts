import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IdValidationPipe implements PipeTransform {
  transform(value: string) {
    const isNumeric = /^\d+$/.test(value);
    if (!isNumeric) throw new BadRequestException('Invalid ID');
    return parseInt(value);
  }
}