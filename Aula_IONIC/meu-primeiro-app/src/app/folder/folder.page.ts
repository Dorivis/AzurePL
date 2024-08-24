
import { Component, inject, OnInit, ViewChild } from '@angular/core';

import axios from 'axios';
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  pokemonName: string = '';
  pokemonImage: string | null = null;
  pokemons: { id: number, name: string }[] = [];
  selectedPokemonId: number | null = null;
  nomePokemon: string = ''
  alturaPokemon = 0;
  descricao: string = ''
  constructor() {}
  async ngOnInit() {
    await this.loadPokemons();
  }

  async fetchPokemon() {
    if (this.selectedPokemonId === null) {
      return;
    }

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.selectedPokemonId}`);
      const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.selectedPokemonId}`);
      this.pokemonImage = response.data.sprites.front_default;
      this.nomePokemon = response.data.forms[0].name
      this.alturaPokemon = response.data.height;
      this.descricao = response2.data.flavor_text_entries[0].flavor_text;

      

    } catch (error) {
      console.error('Erro ao buscar o Pokémon:', error);
      this.pokemonImage = null;
    }
  }

  async loadPokemons() {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
      this.pokemons = response.data.results.map((pokemon: { name: string }, index: number) => ({
        id: index + 1,
        name: pokemon.name
      }));
      
      this.pokemons.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

    } catch (error) {
      console.error('Erro ao carregar a lista de Pokémon:', error);
    }
  }


  

}