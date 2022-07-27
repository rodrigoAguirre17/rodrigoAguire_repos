import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { mapTo, map, catchError  } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PokeService {
    baseUrl = 'https://pokeapi.co/api/v2/pokemon';
    constructor(
        private _httpClient: HttpClient
    ){
    }
    getPokemonsId(id){
        return this._httpClient.get<any>(`${this.baseUrl}/${id}`);
    }
    getPokemons(number1,number2){
        console.log(number1,number2)
        let pokemons = []
        for(let ind = 1; ind <= 150; ind++){
            this.getPokemonsId(ind).subscribe(res =>{
                pokemons.push(res);
            });
        }
        return pokemons;
    }

}