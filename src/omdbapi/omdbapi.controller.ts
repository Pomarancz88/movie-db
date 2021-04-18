import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { UsersService } from 'src/users/users.service';
import { FavoriteDto } from './omdbapi.favorite.dto';
import { OmdbapiService } from './omdbapi.service';

@Controller('movies')
export class OmdbapiController {

  constructor(
    private omdbapi: OmdbapiService,
    private usersService: UsersService
    ) {}

  // TODO: validation

  @Get('findTitle/:title/:page')
  @UseGuards(JwtAuthGuard)
  async findMovie(
    @Param('title') title: string, 
    @Param('page', ParseIntPipe) page: number
    ){
    const movies = await this.omdbapi.searchByTitle(title, page);
    return movies;
  }

  @Post('favorite')
  @UseGuards(JwtAuthGuard)
  async markFavorite(@Req() req, @Body() body: FavoriteDto) {
    const user = await this.usersService.findOne(req.user.username);
    const movie = await this.omdbapi.getById(body.movieId);

    movie.subscribe((x)=>{
      if (x.Response === "True") {
        this.usersService.addFavorite(user, body.movieId);
      }
    })

    return movie;
  }

  @Delete('favorite')
  @UseGuards(JwtAuthGuard)
  async deleteFavorite(@Req() req, @Body() body: FavoriteDto) {
    const user = await this.usersService.findOne(req.user.username);
    const movie = await this.omdbapi.getById(body.movieId);

    movie.subscribe((x)=>{
      if (x.Response === "True") {
        this.usersService.removeFavorite(user, body.movieId);
      }
    })

    return movie;
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async favorites(@Req() req) {
    const user = await this.usersService.findOne(req.user.username);
    return user.getFavorites();
  }
}
