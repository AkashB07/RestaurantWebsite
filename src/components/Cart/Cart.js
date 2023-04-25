import React, { useContext } from "react";
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from "../../store/cart-context";

const Cart = props => {

    const cartcntx = useContext(CartContext);
    const map = new Map();
    cartcntx.items.forEach((item) => {
        if (map.has(item.id)) {
            let it = map.get(item.id)
            map.set(item.id, { id: it.id, name: it.name, description: it.description, price: it.price, quantity: Number(it.quantity) + Number(item.quantity) });
        }
        else {
            map.set(item.id, item)
        }
    });

    let cart = []
    map.forEach((item, key) => {
        cart.push(item)
    });

    const cartItemRemove = (id) => {
        cartcntx.removeItem(id);
    }

    const cartItemDecrementHandler = (item) => {
        cartcntx.addItem({ ...item, quantity: -1 });

    };

    const cartItemIncrementHandler = (item) => {
        cartcntx.addItem({ ...item, quantity: 1 });
    };


    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cart.map((item) => (
                <li key={item.id} className={classes["cart-item"]}>
                    <div>
                        <h2>{item.name}</h2>
                        <div className={classes.summary}>
                            <span className={classes.price}>₹{item.price}</span>
                            <span className={classes.quantity}>x {item.quantity}</span>
                        </div>
                    </div>
                    <div className={classes.actions}>
                        <button onClick={() => cartItemRemove(item.id)}>X</button>
                        {item.quantity > 1 && <button onClick={() => cartItemDecrementHandler(item)}>-</button>}
                        <button onClick={() => cartItemIncrementHandler(item)}>+</button>
                    </div>
                </li>
            ))}
        </ul>
    );
    let total = 0;
    cartcntx.items.forEach((item) => {
        total += Number(item.price * item.quantity);
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