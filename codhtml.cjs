function pageInicio(xnome, xpadtop) {
  let xret = `
  <!DOCTYPE html>
  <html lang="pt-BR" data-bs-theme="dark">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${xnome}</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
      <link href="./index.css" rel="stylesheet" crossorigin="anonymous">
    </head>

    <style>
      
    body {
        padding-top: ${xpadtop}px;
        font-size: 13px;
    }

    .btn-bd-primary {
        --bd-violet-bg: #712cf9;
        --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

        --bs-btn-font-weight: 600;
        --bs-btn-color: var(--bs-white);
        --bs-btn-bg: var(--bd-violet-bg);
        --bs-btn-border-color: var(--bd-violet-bg);
        --bs-btn-hover-color: var(--bs-white);
        --bs-btn-hover-bg: #6528e0;
        --bs-btn-hover-border-color: #6528e0;
        --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
        --bs-btn-active-color: var(--bs-btn-hover-color);
        --bs-btn-active-bg: #5a23c8;
        --bs-btn-active-border-color: #5a23c8;
    }

    .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
    }

    .bd-mode-toggle {
        z-index: 1500;
    }

    .bi {
        vertical-align: -0.125em;
        fill: currentColor;
    }

    .nav-scroller {
        position: relative;
        z-index: 2;
        height: 2.75rem;
        overflow-y: hidden;
    }

    .nav-scroller .nav {
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: 1rem;
        margin-top: -1px;
        overflow-x: auto;
        text-align: center;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
    }

    footer {
        /* position: absolute; */
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 51px;
    }
    </style>

    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="circle-half" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
        </symbol>
    </svg>



    <body>
    `;

  return xret;
}

function pageFim() {
  let xret = `
  
    <!-- BLAK MODE / WITH MODE bottom-1 mb-3 me-3 tabindex="-1" -->
    <div class="position-fixed bottom-0 mb-1 me-1 " style="padding-top:8px">
        <button class="btn btn-sm py-2 d-flex" id="bd-theme" type="button" aria-expanded="false" aria-label="Toggle theme (auto)">
            <svg class="bi my-1 theme-icon-active" width="1em" height="1em">
                <use href="#circle-half"></use>
            </svg>
            <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
        </button>
    </div>
    
    <!-- CODIGO EXECUTADO AO CARREGAR A PAGINA     -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous">
    </script>

    <script>
    document.getElementById('bd-theme').addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
            document.documentElement.setAttribute('data-bs-theme', 'light')
        }
        else {
            document.documentElement.setAttribute('data-bs-theme', 'dark')
        }
    })
    </script>
  
  
  
  </body></html>`;
  return xret;
}

function pageMenu(xTitulo) {
    let xret = `
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark" style="padding: 0px;">
            <div class="container-fluid border global-CorNavBar">
            &nbsp;&nbsp;&nbsp;&nbsp;

            <a class="navbar-brand global-CorNavBar" style="padding: 10px;" href="#">${xTitulo}</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Início</a>
                </li>

                <li class="nav-item dropdown d-flex" style="vertical-align: middle;">
                <a href="/chat"><img src="./assets/icones/iconeRoboInv.png" alt="LogoChatGPT" width="30" height="24"></a>
                <a class="nav-link dropdown-toggle" href="/chat" data-bs-toggle="dropdown" aria-expanded="false">ChatGPT</a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/chat">Perguntar</a></li>
                    <li><a class="dropdown-item" href="/hist">Históricos</a></li>
                    <li><a class="dropdown-item" href="/ajudagpt">Help</a></li>
                </ul>
                </li>


                <li class="nav-item dropdown d-flex" style="vertical-align: middle;">
                <a href="/filmes"><img src="./assets/icones/iconsRoloFilme.png" alt="LogoFilmes" width="30" height="27"></a>
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Filmes</a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/filmes">Rank</a></li>
                    <li><a class="dropdown-item" href="#">Generos</a></li>
                    <li><a class="dropdown-item" href="#">Favoritos</a></li>
                </ul>
                </li>


                <li class="nav-item dropdown d-flex" style="vertical-align: middle;">
                <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Ferramentas</a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="index.html">Imagens</a></li>
                    <li><a class="dropdown-item" href="#">PDF</a></li>
                    <li><a class="dropdown-item" href="#">Serasa</a></li>
                </ul>
                </li>


                <!-- CANVAS -->
                <li class="nav-item dropdown esconder">
                <a class="nav-link dropdown-toggle" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark">
                    Mais
                </a>
                </li>

                <div class="container-fluid">
                
                <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbarDark"
                    aria-labelledby="offcanvasNavbarDarkLabel">
                    <div class="offcanvas-header justify-content-end" style="padding: 10px;">
                    <h5 class="offcanvas-title" id="offcanvasNavbarDarkLabel">Mais Links &nbsp;</h5>
                    <button type="button" class="btn-close btn-close-white justify-content-end" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">



                    <li class="nav-item dropdown d-flex" style="vertical-align: middle;">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Developer</a>
                        <ul class="dropdown-menu" style="padding: 10px;">
                        <li><a class="dropdown-item" href="http://jdk.com.br" target="_blank">JDK Informática</a></li>
                        <li><a class="dropdown-item" href="https://kaldiris.com.br" target="_blank">Kaldiris ME</a></li>
                        <li><a class="dropdown-item" href="https://moshe.com.br" target="_blank">Moshe SI</a></li>
                        </ul>
                    </li>


                    <li class="nav-item dropdown d-flex" style="vertical-align: middle;">
                        <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Utils</a>
                        <ul class="dropdown-menu" style="padding: 10px;">
                        <li><a class="dropdown-item" href="index.html">Imagens</a></li>
                        <li><a class="dropdown-item" href="#">PDF</a></li>
                        <li><a class="dropdown-item" href="#">Serasa</a></li>
                        </ul>
                    </li>

                    </div>
                </div>
                </div>
            </ul>


            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Texto para procurar..." aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Procurar</button>
            </form>
            </div>
            </div>
        </nav>`

    return xret;

}

function pageRodape() {
    let xret = `
    <footer class="d-flex flex-wrap justify-content-between align-items-center border global-CorNavBar">
        <div class="col-md-4 d-flex align-items-top">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <!-- <span style="color: whitesmoke; padding-top: 5px;">&copy;Developer: &nbsp; -->
            <a href="https://kaldiris.com.br" target="_blank" class="text-white">Kaldiris</a>
        </span>
        </div>
        
        <ul class="nav col-md-3 d-flex justify-content-end align-items-center">
        <li class="ms-2"><a href="https://twitter.com/Kaldiris"              target="_blank" class="icone-social"><img src="./assets/icones/twitter.jpg"   class="bi" width="24" height="22"></a></li>
        <li class="ms-2"><a href="https://www.instagram.com/kaldiris_grego/" target="_blank" class="icone-social"><img src="./assets/icones/instagram.jpg" class="bi" width="24" height="24"></a></li>
        <li class="ms-2"><a href="https://www.facebook.com/kaldiris"         target="_blank" class="icone-social"><img src="./assets/icones/facebook.jpg"  class="bi" width="24" height="24"></a></li>
        <li class="ms-2"><a href="http://kaldiris.blogspot.com/"             target="_blank" class="icone-social"><img src="./assets/icones/google.png"    class="bi" width="24" height="24"></a></li>
        
        <li class="ms-2"><a href="https://www.linkedin.com/in/demetrios-kaldiris-grego-84063523/"              target="_blank" class="icone-social">
        <img src="./assets/icones/linkedin.png" class="bi" width="24" height="24"></a></li>

        <li class="ms-2"><a href="https://www.youtube.com/channel/UCbUKkdkJ8jyGfv7aEaRyKsA?view_as=subscriber" target="_blank" class="icone-social">
        <img src="./assets/icones/youtube.png"  class="bi" width="24" height="24"></a></li>

        </ul>
    </footer>
`
    return(xret)
}

// <div class="col-md-4 d-flex align-items-top" style="color:withe"></div> 
// <a href="https://kaldiris.com.br" target="_blank" class="text-white">Kaldiris</a>
// https://wa.me/5511991049200?text=Demetrios+Kaldiris+%28Grego%29

function iconesMidiasSociais(){
    let xret = `
    <ul class="nav col-md-3 d-flex justify-content-end align-items-center">
        <li class="ms-2"><a href="https://kaldiris.com.br"                   target="_blank" class="icone-social"><img src="./assets/icones/home.png" class="bi" width="24" height="22"></a></li>    
        <li class="ms-2"><a href="https://wa.me/5511991049200?text=Demetrios+Kaldiris+%28Grego%29" target="_blank" class="icone-social"><img src="./assets/icones/whatsappQuadrado.png" class="bi" width="24" height="22"></a></li>    
        <li class="ms-2"><a href="https://twitter.com/Kaldiris"              target="_blank" class="icone-social"><img src="./assets/icones/twitter.jpg"       class="bi" width="24" height="22"></a></li>
        <li class="ms-2"><a href="https://www.instagram.com/kaldiris_grego/" target="_blank" class="icone-social"><img src="./assets/icones/instagram.jpg"     class="bi" width="24" height="24"></a></li>
        <li class="ms-2"><a href="https://www.facebook.com/kaldiris"         target="_blank" class="icone-social"><img src="./assets/icones/facebook.jpg"      class="bi" width="24" height="24"></a></li>
        <li class="ms-2"><a href="http://kaldiris.blogspot.com/"             target="_blank" class="icone-social"><img src="./assets/icones/google.png"        class="bi" width="24" height="24"></a></li>
        
        <li class="ms-2"><a href="https://www.linkedin.com/in/demetrios-kaldiris-grego-84063523/"              target="_blank" class="icone-social">
        <img src="./assets/icones/linkedin.png" class="bi" width="24" height="24"></a></li>

        <li class="ms-2"><a href="https://www.youtube.com/channel/UCbUKkdkJ8jyGfv7aEaRyKsA?view_as=subscriber" target="_blank" class="icone-social">
        <img src="./assets/icones/youtube.png"  class="bi" width="24" height="24"></a></li>
    </ul>`
   
    return(xret);
}

module.exports = { pageInicio, pageFim, pageMenu, pageRodape, iconesMidiasSociais };
