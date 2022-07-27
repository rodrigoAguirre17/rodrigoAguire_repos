import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PokeService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:string = 'prueba-front-ntt';
  pokemons: string[] = [];
  pokemons2: string[] = [];
  pokemonsAux = [];
  search = new FormControl();
  inicioPokem : number = 0;
  finPokem : number = 4;
  pokemonSelected = '';
  constructor(private _pokemonService: PokeService){
  }

  ngOnInit(): any {
  this.pokemons2 = this._pokemonService.getPokemons();
  setTimeout(() => {
  if(this.pokemons2){
    this.pokemons = this.pokemons2.slice(this.inicioPokem,this.finPokem);
  }
  }, 100);
  this.pokemonsAux = this.pokemons2;
  }
  clickBack(){
    this.inicioPokem = this.inicioPokem - 4;
    this.finPokem = this.finPokem - 4;
    this.pokemons = this.pokemons2.slice(this.inicioPokem,this.finPokem)
  }
  clickNext(){
    this.inicioPokem = this.finPokem;
    console.log(this.finPokem)
    this.finPokem = this.pokemons2.length - this.finPokem > 3 ? this.finPokem + 4 : this.pokemons2.length;
    this.pokemons = this.pokemons2.slice(this.inicioPokem,this.finPokem)

  }
  searchValue(){
    this.inicioPokem = 0;
    this.finPokem = 4;
    if(this.search.value && this.search.value.length > 0){
      let pokeAux;
      pokeAux = this.pokemonsAux.filter(pok => pok.name.toLowerCase().includes(this.search.value.toLowerCase()))
      this.pokemons = pokeAux.slice(this.inicioPokem,this.finPokem);
    }else{
      this.pokemons = this.pokemons2.slice(this.inicioPokem,this.finPokem);

    }
  }
  viewPokemon(pokemon){
    let array = []
    pokemon.moves.map(key => array.push(key.move?.name || key));
    pokemon.moves = array;
    this.pokemonSelected = pokemon;
  }
}
