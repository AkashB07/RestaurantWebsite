import React, { useContext } from "react";
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from "../../store/cart-context";

const Cart = props => {
    const cartcntx = useContext(CartContext);
    const map = new Map();
    cartcntx.items.forEach((item) => {
    if(map.has(item.id)) {
      let it = map.get(item.id)
      map.set(item.id, {id: it.id, name: it.name, description: it.description, price: it.price, quantity: Number(it.quantity)+Number(item.quantity)});
    }
    else{
      map.set(item.id, item)
    }
  });
  
  let cart = []
  map.forEach((item, key) =>{
    cart.push(item)
  })

  
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cart.map((item, key) => (
                
                <li key={item.id}>Name:{item.name} Price:{item.price} Quantity:{item.quantity}</li>
            ))}
        </ul>
    );
    let total = 0;
    cartcntx.items.forEach((item)=>{
        total += Number(item.price*item.quantity);
    })


    return (
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount - ${total.toFixed(2)}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    )
}

export default Cart;