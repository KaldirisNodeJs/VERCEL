const apikey = "e56d58205917883d64c2c7b48219ef2c"
const axios = require('axios');
const urlIMG = 'https://image.tmdb.org/t/p/w500';
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

var filme;
var filmeLista;
var filmeSimilar;
global.filmePopular;
var generos =
    [
        { id: 28, name: 'Ação' },
        { id: 12, name: 'Aventura' },
        { id: 16, name: 'Animação' },
        { id: 35, name: 'Comédia' },
        { id: 80, name: 'Crime' },
        { id: 99, name: 'Documentário' },
        { id: 18, name: 'Drama' },
        { id: 10751, name: 'Família' },
        { id: 14, name: 'Fantasia' },
        { id: 36, name: 'História' },
        { id: 27, name: 'Terror' },
        { id: 10402, name: 'Música' },
        { id: 9648, name: 'Mistério' },
        { id: 10763, name: 'News' },
        { id: 10749, name: 'Romance' },
        { id: 878, name: 'Ficção científica' },
        { id: 10770, name: 'Cinema TV' },
        { id: 53, name: 'Thriller' },
        { id: 10752, name: 'Guerra' },
        { id: 37, name: 'Faroeste' },
        { id: 10759, name: 'Action & Adventure' },
        { id: 10762, name: 'Kids' },
        { id: 10764, name: 'Reality' },
        { id: 10765, name: 'Sci-Fi & Fantasy' },
        { id: 10766, name: 'Soap' },
        { id: 10767, name: 'Talk' },
        { id: 10768, name: 'War & Politics' },
    ];

function nomeGenero(num) {
    let index = generos.findIndex(x => x.id == num);
    let xgen = generos[index] ? generos[index].name : 'Genero N/D';
    return (xgen);

}

async function ajustaJsonFilme(xjson) {
    // Adiciona a KEY no JSON para recever os nomes dos generos
    xjson.map(i=>{i["genre_names"] = ''});
    // Captura os nomes dos generos e as url completas para ver as imagens
    xjson.forEach(el => {
        //console.log(el.original_title,el.backdrop_path );
        if(el.backdrop_path){
            el.backdrop_path = urlIMG + el.backdrop_path;
        }
        if(el.poster_path){
            el.poster_path = urlIMG + el.poster_path ;
        }
        let generos = ''
        el.genre_ids.forEach(elg => {
             generos = generos + (generos == '' ? '' : " , ") + nomeGenero(elg)
        });
        el.genre_names = generos;
    })
    return(xjson)
}

async function getListaGeneros() {
    let xurl = `/genre/movie/list`
    //let xurl = `/genre/tv/list`
    await api.get(xurl, {
        params: {
            api_key: apikey,
            language: "pt-BR",
        }
    }).then((response) => {
        //console.log(response.data);
        generos = response.data.genres;
        return (generos)
    })
        .catch((e) => {
            console.log("Erro - ", e);
            return;
        })
}

async function getFilme(id) {
    await api.get(`/movie/${id}`, {
        params: {
            api_key: apikey,
            language: "pt-BR",
        }
    })
        .then((response) => {
            //console.log(response.data);
            filme = response.data;
            filme.backdrop_path = urlIMG + filme.backdrop_path
            filme.poster_path = urlIMG + filme.poster_path
            filme.production_companies.forEach((el, index) => {
                if (el.logo_path) {
                    filme.production_companies[index].logo_path = urlIMG + filme.production_companies[index].logo_path;
                }
            });


            return (filme);
        })
        .catch((e) => {
            console.log("Erro - ", e);
            return;
        })
}

async function getFilmeLista(nome, pagina) {
    // movie
    // multi
    await api.get(`/search/multi`, {
        params: {
            api_key: apikey,
            language: "pt-BR",
            query: nome,
            page: pagina,
            include_adult: true
        }
    })
        .then((response) => {
            //console.log(response.data);
            filmeLista = response.data;
            return (filmeLista);
        })
        .catch((e) => {
            console.log("Erro - ", e);
            return;
        })
}

async function getFilmeSimilar(id) {
    //  19995 - AVATAR
    await api.get(`/movie/${id}/similar`, {
        params: {
            api_key: apikey,
            language: "pt-BR",
            page: 1
        }
    })
        .then(async (response) => {
            //console.log(response.data);
            filmeSimilar = await ajustaJsonFilme(response.data.results);
            return (filmeSimilar);
        })
        .catch((e) => {
            console.log("Erro - ", e);
            return;
        })
}

async function getFilmePopular() {
    await api.get(`/movie/popular`, {
        params: {
            api_key: apikey,
            language: "pt-BR",
            page: 1
        }
    })
        .then( async (response) => {
            //console.log(response.data);
            global.filmePopular = await ajustaJsonFilme(response.data.results);
            // Sort Normal 
            // filmePopular.sort((prev,next)=>prev.vote_average - next.vote_average)
            // Sort Descendent
            global.filmePopular.sort((prev,next)=> next.vote_average - prev.vote_average)
            return (global.filmePopular);

        })
        .catch((e) => {
            console.log("Erro - ", e);
            return;
        })
}

//-------------------------------------------------------------  TESTES
async function main() {

    //#region  GENEROS
    console.log(" GENEROS -----------------------------------------------------------------------",)
    // if(generos.length<1){
    //     let xr = await getListaGeneros();
    // }
    // console.log(generos);    
    // console.log(nomeGenero(16));
    //#endregion

    //#region  FILME POR ID
    console.log(" FILME ------------------------------------------------------------------------",)
    // let xf = await getFilme(15);
    // let xk = Object.keys(filme).length
    // console.log("Campos JSON:",xk);    
    // console.log("JSON Filme :",filme);
    // // Salva no Arquivo
    // // https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
    // var fs = require('fs');
    // fs.writeFile("filme.json", JSON.stringify(filme,null,4), function(err) {
    //     if (err) {
    //         console.log(err);
    //     }
    // });
    //#endregion

    //#region  FILME SIMILARES : 19995
    // console.log(" FILME SIMILARES --------------------------------------------------------------",)
    // let xf = await getFilmeSimilar(19995);
    // console.log(filmeSimilar);
    //#endregion

    //#region  FILME LISTA 
    console.log(" FILME LISTA-------------------------------------------------------------------",)
    // let xl = await getFilmeLista('Avatar',1)
    // // //console.log(filmeLista)
    // console.log("==================================================================")
    // filmeLista.results.forEach(el => {
    //     console.log("ID de Registro: ",el.id);    

    //     let generos = ''
    //     if(el.genre_ids){
    //         el.genre_ids.forEach(elg =>{
    //             generos = generos +  ( generos=='' ? '' : " , " ) + nomeGenero(elg)
    //         });
    //     }
    //     console.log("Generos/Class : ",generos);
    //     console.log("Nome Popular  : ",el.title);    
    //     console.log("Nome Original : ",el.original_title);    
    //     console.log("Linguagem     : ",el.original_language);    
    //     console.log("Link Imagem   : ",'https://image.tmdb.org/t/p/w500'+el.poster_path);
    //     console.log("Data da Versão: ",el.release_date)
    //     console.log("Breve Resumo  : ",el.overview);   
    //     console.log("ConteúdoAdulto: ",el.adult)
    //     console.log("Formato Vídeo : ",el.video)
    //     console.log("Popularidade  : ",el.popularity)
    //     console.log("Numero Votos  : ",el.vote_count)
    //     console.log("Média         : ",el.vote_average)
    //     console.log("-----------------------------------------------------------------------------")
    // });
    // console.log("==================================================================")
    //#endregion

    //#region  FILME POPULARES
    // console.log(" FILME SIMILARES --------------------------------------------------------------",)
    // let xp = await getFilmePopular()
    // console.log(filmePopular);
    //#endregion


}

// main();
module.exports = { getListaGeneros, getFilme, getFilmeLista, getFilmeSimilar, getFilmePopular}