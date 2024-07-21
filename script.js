$(document).ready(function() {
    console.log( "ready!" );

    ajustarQuadrados();

    console.log(getBelowElements($("#title-nome")[0]))
});

$(window).resize(function(){
    ajustarQuadrados()
 });

function ajustarQuadrados() {
    let h = $("#borda").height(); 
    let w = $("#borda").width();
    console.log(h)
    console.log(w)

    let extra = 5;
    let quantQuadradosColuna = 10;
    let alturaQuadrado = h / quantQuadradosColuna;
    let quantMaxQuadradosLinha = w / alturaQuadrado + extra;

    let linhaHtml = "<div class='linha'></div>";    
    let quadradoHtml = "<span class='quadrado'></span>";

    for (let i = 0; i < quantQuadradosColuna + extra; i++) {
        if (!$("#quadro .linha")[i])
             $("#quadro").append(linhaHtml)

        let linha = $("#quadro .linha")[i];
        let quadrados = $(linha).find(".quadrado");
        if (quadrados.length < quantMaxQuadradosLinha) {
            for (let j = quadrados.length; j < quantMaxQuadradosLinha; j++) 
                $(linha).append(quadradoHtml)
        } else if (quadrados.length > quantMaxQuadradosLinha) {
            for (let j = quadrados.length; j > quantMaxQuadradosLinha; j--) 
                $(linha).find(".quadrado").last().remove()
        }
    }
    
    $(".quadrado").each(function() {
        $(this).height(alturaQuadrado)
        $(this).width(alturaQuadrado)
        $(this).hover(function() {
            $(this).addClass('flip-vertical-left');

            $(this).on("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
                $(this).removeClass("flip-vertical-left");
            });
        });

        loop(this);
    });

}

function loop(elm) {
    let maxOpacity = verificarQuadradoAbaixo(elm) ? 0 : 15;

    let opacityVal = getRandomInt(2, maxOpacity);
    let durationVal = getRandomInt(2, 5) * 1000;
    
    $(elm).animate({
        opacity: opacityVal + "%",
    }, durationVal, 'linear', function() {
        loop(elm)
    });
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function getBelowElements(el) {
    const sourceBounding = el.getBoundingClientRect();
    let belowElements = [];

    for (const currentElement of $(".quadrado")) {
        const targetBounding = currentElement.getBoundingClientRect();

        // Se todas as condições forem falsas, é porque está tendo uma sobreposição
        if (!(sourceBounding.right < targetBounding.left ||
            // sourceBounding.left > targetBounding.right ||
            // sourceBounding.bottom < targetBounding.top ||
            sourceBounding.top > targetBounding.bottom)) {
            belowElements = [...belowElements, currentElement]; // Adiciona o elemento atual ao array de elementos sobrepostos
        }
    }

    return belowElements; // Retorna o array de elementos sobrepostos
}

function verificarQuadradoAbaixo(quadrado) {
    const quadradoBounding = quadrado.getBoundingClientRect(); 
    const tituloBounding = $("#title-nome")[0].getBoundingClientRect();

    return !(quadradoBounding.right < tituloBounding.left ||
            //  quadradoBounding.left > tituloBounding.right ||
            //  quadradoBounding.bottom < tituloBounding.top ||
             quadradoBounding.top > tituloBounding.bottom)
}