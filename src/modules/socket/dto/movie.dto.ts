import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class MovieDTO {
    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    director: string;

    @ApiProperty()
    @IsNumber()
    releaseYear: number;

    @ApiProperty()
    @IsString()
    genre: string;

    @ApiProperty()
    @IsNumber()
    rating: number;
}
