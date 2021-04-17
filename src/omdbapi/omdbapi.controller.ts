import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { FavoriteDto } from './omdbapi.favorite.dto';
import { OmdbapiService } from './omdbapi.service';

@Controller('movies')
export class OmdbapiController {

  constructor(private omdbapi: OmdbapiService) {}

  // TODO: validation

  @Get('findTitle/:title/:page')
  async findMovie(
    @Param('title') title: string, 
    @Param('page', ParseIntPipe) page: number
    ){
    const movies = await this.omdbapi.searchByTitle(title, page);
    console.log(movies);
    return movies;
  }

  @Post('favorite')
  async markFavorite(@Body() body: FavoriteDto) {
    console.log(body)
    const movie = await this.omdbapi.getById(body.movieId);

    if (movie.Response === "True") {
      // save id to local db
    }
    return movie;
  }

  // @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async favorites(@Req() req) {
    return await this.omdbapi.searchByTitle('water world', 1);
  }
}
