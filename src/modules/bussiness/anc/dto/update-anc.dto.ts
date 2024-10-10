import { PartialType } from '@nestjs/mapped-types';
import { CreateAncDto } from './create-anc.dto';

export class UpdateAncDto extends PartialType(CreateAncDto) {}
