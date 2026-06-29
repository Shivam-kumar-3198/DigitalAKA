import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty({ example: 'users.create' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Create users' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'users' })
  @IsString()
  @IsNotEmpty()
  module: string;

  @ApiProperty({ example: 'create' })
  @IsString()
  @IsNotEmpty()
  action: string;
}

export class UpdatePermissionDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
