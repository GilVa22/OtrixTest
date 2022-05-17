import { Injectable } from '@angular/core';
import axios from 'axios';

declare var jQuery: any;
@Injectable({
    providedIn: 'root',
})
export class ListaPreciosService {
    listaPrecios: any = [];
    constructor() {
        this.setListas();
    }

    //Método que retorna el valor al front
    getListas() {
        return this.listaPrecios;
    }

    //Método que toma el valor de la base de datos y lo guarda en una variable
    setListas() {
        //Axios
        let apiUrl = 'list/getPriceLists';
        let json = {
        idBot: localStorage.getItem('idBot'),
        };
        axios
        .post(apiUrl, json)
        .then((response) => {
            this.listaPrecios = response.data;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    //Método para crear una nueva lista
    newLista(name: any, desc: any, idBot: any) {
        //Axios
        let apiUrl = 'list/createproductlist';
        let json = {
        idBot: idBot,
        name: name,
        description: desc,
        };
        axios
        .post(apiUrl, json)
        .then((response) => {
            jQuery('.success').empty();
            jQuery('.success').append('Lista creada correctamente');
            jQuery('.success').fadeIn().delay(3200).fadeOut(300);
            this.setListas();
            return response;
        })
        .catch((error) => {
            jQuery('.error').empty();
            jQuery('.error').append(error.response.data.error);
            jQuery('.error').fadeIn().delay(3200).fadeOut(300);
            return error;
        });
    }
}
