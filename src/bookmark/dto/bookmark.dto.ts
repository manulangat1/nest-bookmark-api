import { IsDataURI, IsOptional, IsString, IsUrl } from 'class-validator';

export class BookmarkDto {
  @IsOptional()
  id?: number;
  @IsOptional()
  @IsUrl()
  link?: string;
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  userId?: number;
}
