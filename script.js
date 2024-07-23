let linhas;
let colunas;

$(document).ready(function() {
    console.log( "ready!" );

    ajustarQuadrados();
});

$(window).resize(function(){
    ajustarQuadrados();
 });

function ajustarQuadrados() {
    let h = $("#borda").height(); 
    let w = $("#borda").width();
    console.log(h)
    console.log(w)

    // DEFININDO TAMANHO E QUANTIDADE DOS QUADRADOS
    let extra = 5;
    let quantQuadradosColuna = 10;
    linhas = quantQuadradosColuna;
    let alturaQuadrado = h / quantQuadradosColuna;
    let quantMaxQuadradosLinha = Math.floor(w / alturaQuadrado + extra);
    colunas = quantMaxQuadradosLinha;

    // HTML DE LINHA E COLUNA
    let linhaHtml = "<div id='linha-id' class='linha'></div>";    
    let quadradoHtml = "<span id='quadrado-id' class='quadrado' onclick='clickOnda(this)'></span>";

    // VERIFICANDO E DESENHANDO OU REMOVENDO CADA LINHA E COLUNA
    for (let i = 0; i < quantQuadradosColuna + extra; i++) {
        if (!$("#quadro .linha")[i])
             $("#quadro").append(linhaHtml.replace('linha-id', 'L'+i))

        let linha = $("#quadro .linha")[i];
        let quadrados = $(linha).find(".quadrado");
        if (quadrados.length < quantMaxQuadradosLinha) {
            for (let j = quadrados.length; j < quantMaxQuadradosLinha; j++) 
                $(linha).append(quadradoHtml.replace('quadrado-id', 'L'+i+'Q'+j))
        } else if (quadrados.length > quantMaxQuadradosLinha) {
            for (let j = quadrados.length; j > quantMaxQuadradosLinha; j--) 
                $(linha).find(".quadrado").last().remove()
        }
    }

    // SETANDO TAMANHO E ANIMAÇÕES DOS QUADRADOS
    $(".quadrado").each(function() {
        $(this).height(alturaQuadrado)
        $(this).width(alturaQuadrado)
        $(this).hover(function() {
            $(this).addClass('flip-vertical-left');

            $(this).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
                $(this).removeClass("flip-vertical-left");
            });
        });

        $(this).stop();
        loop(this, false);
    });

    let quadradosEscuros = getQuadradosEscuros();
    quadradosEscuros.forEach(quadrado => { $(quadrado).stop(); loop(quadrado, true) });
}

function loop(elm, escuro) {
    let opacityVal = getRandomInt(2, 30);
    let durationVal = getRandomInt(2, 5) * 1000;
    
    $(elm).animate({
        opacity: escuro ? 0 : opacityVal + "%",
    }, durationVal, 'linear', function() {
        loop(elm, escuro)
    });
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function clickOnda(el) {
    let id = $(el).attr("id");
    let linha = parseInt(id.substring(1, id.indexOf('Q')))
    let coluna = parseInt(id.substring(id.indexOf('Q')+1))

    let rodada = 1;
    let delay = 0.1;

    while (rodada <= linhas || rodada <= colunas) {
        if (rodada > linhas)
        {
            let x = 0;
        }

        let menor = rodada
        let maior = rodada+1

        let onda = [];
        for (i = linha-menor; i < linha+maior; i++) {
            for (j = coluna-menor; j < coluna+maior; j++) {
                if ((i > linha-menor && i < linha+maior-1) && (j > coluna-menor && j < coluna+maior-1)) {
                    continue;
                }
                onda.push("L" + i + "Q" + j);
            }
        }
        
        if (onda.length > 0) {
            onda.forEach(function (idQuadrado) { 
                let elemento = document.getElementById(idQuadrado);
                if (elemento) {
                    elemento.style.animation = "flip-vertical-left 0.7s cubic-bezier(0.455, 0.030, 0.515, 0.955) " + delay + "s both";
                    elemento.addEventListener("animationend", (ev) => { 
                        elemento.style.animation = ""; 
                    });
                }
            });
        }

        rodada++;
        delay+=0.1; 
    }
}

function getQuadradosEscuros() {
    const tituloBounding = $("#title-nome")[0].getBoundingClientRect();
    const cargoBounding = $("#title-cargo")[0].getBoundingClientRect();
    const msgBounding = $("#title-msg")[0].getBoundingClientRect();
    let quadradosEscuros = [];

    for (const quadrado of $(".quadrado")) {
        const quadradoBounding = quadrado.getBoundingClientRect();

        if (!(tituloBounding.left - 40 > quadradoBounding.right ||
              tituloBounding.bottom + 40 < quadradoBounding.top) ||
            !(cargoBounding.left - 40 > quadradoBounding.right ||
              cargoBounding.bottom + 40 < quadradoBounding.top) ||
            !(msgBounding.left - 40 > quadradoBounding.right ||
              msgBounding.bottom + 40 < quadradoBounding.top)) {
              quadradosEscuros = [...quadradosEscuros, quadrado];
        }
    }

    var metade = Math.floor(colunas / 2);
    for (let i = 0; i <= linhas; i++) {
        let esconderAte = getRandomInt(metade-5, metade+(i*2));
        for (let j = metade; j < colunas; j++) {
            if (j > esconderAte) {
                quadradosEscuros.push($("#L"+i+"Q"+j)[0]);
            }
        } 
    }
    console.log(quadradosEscuros)
    return quadradosEscuros; 
}




function verificarQuadradoAbaixo(quadrado) {
    const quadradoBounding = quadrado.getBoundingClientRect(); 
    const cargoBounding = $("#title-cargo")[0].getBoundingClientRect();
    const tituloBounding = $("#title-nome")[0].getBoundingClientRect();

    return !(tituloBounding.left > quadradoBounding.right ||
             tituloBounding.bottom < quadradoBounding.top) ||
           !(cargoBounding.left > quadradoBounding.right ||
             cargoBounding.bottom < quadradoBounding.top)
}

function getBelowElements(el) {
    const sourceBounding = el.getBoundingClientRect();
    let belowElements = [];

    for (const currentElement of $(".quadrado")) {
        const targetBounding = currentElement.getBoundingClientRect();

        if (!(sourceBounding.right < targetBounding.left ||
            sourceBounding.left > targetBounding.right ||
            sourceBounding.bottom < targetBounding.top ||
            sourceBounding.top > targetBounding.bottom)) {
            belowElements = [...belowElements, currentElement]; 
        }
    }

    return belowElements; 
}
