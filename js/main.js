const cardBoard = document.getElementById('cardBoard');
const imagens = [
    'dudu.png',
    'veiga.png',
    'gomez.png',
    'weverton.png',
    'menino.png',
    'rony.png'
];

let cardHTML = '';
let NumerosImagens = imagens.length * 2;

imagens.forEach(img => {
    html = '<div class="memory-card" data-card="' + img + '"> <img class="front-face" src="imagens/' + img + ' "> <img class="back-face" src="imagens/palmeiras.png"> </div>';
    cardHTML += html;
})

cardBoard.innerHTML = cardHTML + cardHTML;

/** Fim Renderização HTML */

const cards = document.querySelectorAll('.memory-card');

let fristCard, secondCard;
let lockCard = false;

function FlipCard(){
    if(lockCard) return false;

    this.classList.add('flip');

    if(!fristCard){
        fristCard = this;

        return false;
    }
    
    secondCard = this;

    checkForMatch();
}

function checkForMatch(){
    let isMatch = fristCard.dataset.card === secondCard.dataset.card;

    !isMatch ? disableCards() : resetCards(isMatch);
}

function disableCards(){
    lockCard = true;

    setTimeout(() => {
        fristCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetCards();
    }, 1000);
    
}

(function shuffle(){
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * NumerosImagens);
        card.style.order = rand;
    })
})()

function resetCards(isMatch = false){
    if(isMatch){
        fristCard.removeEventListener('click', FlipCard);
        secondCard.removeEventListener('click', FlipCard);
    }
    [fristCard, secondCard, lockCard] = [null, null, false];
}

function ResetGame(){
    location.reload();
}

cards.forEach(card => card.addEventListener("click", FlipCard));