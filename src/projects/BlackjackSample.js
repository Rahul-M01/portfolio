import React, { useState } from 'react';
import './blackjack-sample.css';

const suits = ['♠','♥','♦','♣'];
const ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];

function total(cards) {
    const values = cards.map(card => Math.min(10, ranks.indexOf(card.rank) + 1));
    const low = values.reduce((sum, value) => sum + value, 0);
    return values.includes(1) && low + 10 <= 21 ? low + 10 : low;
}

function deal() {
    const deck = suits.flatMap(suit => ranks.map(rank => ({ suit, rank })));
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    const player = deck.splice(0,2), dealer = deck.splice(0,2);
    const natural = total(player) === 21 || total(dealer) === 21;
    return { player, dealer, deck, done: natural };
}

function Hand({ cards, concealed = false }) {
    return <div className="sample-hand">{cards.map((card,i) =>
        concealed && i === 1
        ? <span className="playing-card card-back" key="hidden" aria-label="Face-down card" />
        : <span key={card.suit + card.rank} className={'playing-card' + ('♥♦'.includes(card.suit) ? ' red-suit' : '')}>{card.rank}<small>{card.suit}</small></span>
    )}</div>;
}

export default function BlackjackSample() {
    const [game,setGame] = useState(null);
    const player = game ? total(game.player) : 0;
    const dealer = game ? total(game.dealer) : 0;
    function hit() {
        const cards = [...game.player, game.deck[0]];
        setGame({...game, player:cards, deck:game.deck.slice(1), done:total(cards)>21});
    }
    function stand() {
        const cards = [...game.dealer], deck = [...game.deck];
        while(total(cards)<17) cards.push(deck.shift());
        setGame({...game,dealer:cards,deck,done:true});
    }
    let message = 'Play a sample hand against the dealer.';
    if(game) {
        if (!game.done) message = 'Your total is ' + player + '. Hit or stand?';
        else if (player>21) message = 'Bust. The dealer wins.';
        else if (dealer>21) message = 'The dealer busted with ' + dealer + '. You win.';
        else if (player>dealer) message = 'You win, ' + player + ' to ' + dealer + '.';
        else if (dealer===player) message = 'A tie at ' + player + '.';
        else message = 'Dealer wins, ' + dealer + ' to ' + player + '.';
    }
    return <section className="blackjack-sample" aria-label="Interactive blackjack sample">
        <div><h2>Try blackjack</h2><p aria-live="polite">{message}</p>
        <div className="sample-controls">{!game || game.done ? <button className="button button-primary" onClick={() => setGame(deal())}>{game ? 'Deal again' : 'Deal a hand'}</button> : <><button className="button button-primary" onClick={hit}>Hit</button><button className="button" onClick={stand}>Stand</button></>}</div></div>
        {game && <div className="sample-table"><div><span>Dealer</span><Hand cards={game.dealer} concealed={!game.done}/></div><div><span>Your hand</span><Hand cards={game.player}/></div></div>}
    </section>;
}
