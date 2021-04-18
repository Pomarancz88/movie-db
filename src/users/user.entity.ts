import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({unique: true})
  email: string;

  @Column({default: '{}'})
  favorites: string;

  @Column({default: 'not set'})
  password: string;

  getFavorites(): string[] {
    return JSON.parse(this.favorites);
  }

  addFavorite(ttid: string): boolean {
    let res = false;
    let favs = JSON.parse(this.favorites);
    if (!favs[ttid]) {
      favs[ttid] = '';
      res = true;
      this.favorites = JSON.stringify(favs);
    }

    return res;
  }

  removeFavorite(ttid: string): boolean {
    let res = false;
    let favs = JSON.parse(this.favorites);
    if (favs[ttid] === '') {
      delete favs[ttid];
      res = true;
      this.favorites = JSON.stringify(favs);
    }
    

    return res;
  }
}