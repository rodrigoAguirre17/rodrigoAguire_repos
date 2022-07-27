import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PokeService } from './app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'prueba-front-ntt';
  pokemons: string[] = [];
  pokemons2: string[] = [];
  pokemonsAux = [];
  search = new FormControl();
  inicioPokem = 0;
  finPokem = 4;
  pokemonSelected = '';
  constructor(private _pokemonService: PokeService){

  }
   async ngOnInit(): Promise<any> {
    this.pokemons2 = this._pokemonService.getPokemons(this.inicioPokem,this.finPokem);
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
  searchValue(key){
    this.inicioPokem = 0;
    this.finPokem = 4;
    if(this.search.value && this.search.value.length > 0){
      let pokeAux
      pokeAux = this.pokemonsAux.filter(pok => pok.name.toLowerCase().includes(this.search.value.toLowerCase()))
      this.pokemons = pokeAux.slice(this.inicioPokem,this.finPokem);
    }else{
      this.pokemons = this.pokemons2.slice(this.inicioPokem,this.finPokem);

    }
    
    console.log(this.search.value,'searcgh')
    console.log(key)
  }
  viewPokemon(pokemon){
    let array = []
    console.log(pokemon.moves)
    pokemon.moves.map(key => array.push(key?.move?.name))
    pokemon.moves = array;
    
    this.pokemonSelected = pokemon
    console.log(pokemon,'pokemon')
  }
}
