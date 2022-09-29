import React, { useEffect, useState } from 'react';
import Player from '../Players/Player';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'

import './Home.css'

const Home = () => {
    const [players,setPlayers]=useState([])
    const [search, setSearch]=useState("")
    const [cart, setCart]=useState([])
    
    useEffect(()=>{
        fetch(`https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${search}`)
        .then(res => res.json())
        .then(data => setPlayers(data?.player))
    },[search])
    

    const handleDelete=(id)=>{
    const leftPlayer=cart.filter(player => player.idPlayer !== id)
    setCart(leftPlayer)  

    toast('wow deleted from cart')   
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
    }
    

    return (
        <div className='home-container'>
           <div className='home-item1'>
             <input onChange={(e)=>setSearch(e.target.value)} 
             type="text" name="" id="" />
             <button className='search-btn'>Search</button>

             <div className="players-container">
               
                     <Player players={players} cart={cart} setCart={setCart}></Player>
                
             </div>

           </div>
           <div className='home-item2'>
               <div className="cart">
               <p>this is players crat: {cart.length}</p>
                {
                    cart.map(player=>
                        <div className="cart-info-container">
                            <li>{player.strPlayer}</li>
                              <button onClick={()=>handleDelete(player.idPlayer)} className='delete-btn'>x</button>
                        </div>
                         )
                }
                
               </div>
           </div>
        </div>
    );
};

export default Home;