import React from 'react';
import './SinglePlayer.css'

const SinglePlayer = ({player,cart,setCart}) => {
    // console.log(setCart)
    const {strNationality,strPlayer,idPlayer,strCutout}=player
    const handleAddToCart=()=>{
        const info ={
            strPlayer,
            idPlayer,
            strCutout,
            price:115,
        }
        if(cart){
            const newPlayer=[...cart,info]
            setCart(newPlayer)

        }
        
    }
    const handleBookMark=()=>{
       const info ={
        strPlayer,
        idPlayer,
        strCutout,
        quantity:1,
        bookMark: "true",
       }
       const prevBookmark=localStorage.getItem('bookmark')
       const getBookmark=JSON.parse(prevBookmark)
       if(getBookmark){
        const isExist=getBookmark.find(player => player.idPlayer === idPlayer);

         if(isExist){
           const prevQuantity = parseFloat(isExist.quantity)
           const quantity =prevQuantity + 1;
           isExist.quantity =quantity
           localStorage.setItem("bookmark",JSON.stringify(getBookmark))
         }

         else{
             localStorage.setItem("bookmark",JSON.stringify([...getBookmark , info]))
         }
       }
       else{
         localStorage.setItem('bookmark',JSON.stringify([info]))
       }
    //    console.log(JSON.parse(prevBookmark))
    }
    return (
        <div className='cart' data-aos="zoom-in"   data-aos-duration="1500">
            
            <img className='player-img' src={strCutout} alt="" />
            <div>
              <h6>{strPlayer}</h6>
              
            </div>
           
             <button className='cart-btn' >Details</button>
             <button onClick={handleAddToCart} className='cart-btn'>Add To Cart</button>
             <button onClick={handleBookMark} className='cart-btn'>Bookmark</button>

        </div>
    );
};

export default SinglePlayer;