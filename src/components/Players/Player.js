import React from 'react';
import SinglePlayer from '../SinglePlayer/SinglePlayer';
import './Player.css'

const Player = ({players,cart,setCart}) => {
    // console.log(players)
    return (
        <div className='player-container'>
          <div className="cart-container">
          {
                players.map(player => <SinglePlayer
                player={player}
                key={player.idPlayer}
                 cart={cart}
                 setCart={setCart}
                ></SinglePlayer>)
            }
          </div>
            
        </div>
    );
};

export default Player;