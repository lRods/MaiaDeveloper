$(document).ready(function() {
    console.log( "ready!" );

    ajustarQuadrados();
});

$(window).resize(function(){
    ajustarQuadrados()
 });

function ajustarQuadrados() {
    let h = $("#borda").height(); 
    let w = $("#borda").width();
    console.log(h)
    console.log(w)

    let quantQuadradosColuna = 10;
    let alturaQuadrado = (h / quantQuadradosColuna) - 4;
    let quantMaxQuadradosLinha = w / alturaQuadrado;
    
    console.log(alturaQuadrado)
    
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
    let opacityVal = getRandomInt(2, 30);
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