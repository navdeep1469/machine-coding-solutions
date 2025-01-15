import { useState } from "react";
import "./App.css";
const data = [
  {
    name: "Watch",
    price: 200,
    id: 1,
  },
  {
    name: "Belt",
    price: 300,
    id: 2,
  },
  {
    name: "Phone",
    price: 500,
    id: 3,
  },
  {
    name: "Cube",
    price: 100,
    id: 4,
  },
  {
    name: "Laptop",
    price: 900,
    id: 1,
  },
];

const CardComponent = ({ item, onClick, fromCart = false }) => {
  const { name, price, id, quantity } = item;
  return (
    <div
      id={id}
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        width: "50%",
      }}
    >
      <div>Product Name is :{name}</div>
      <div>Product Price is :{price}</div>
      {fromCart ? <div>Product quantity is :{quantity}</div> : null}
      <button onClick={() => onClick(item)}>
        {fromCart ? "Remove from cart" : "Add to Favourite"}
      </button>
    </div>
  );
};

const Cart = ({ cartItems, removeFromCart }) => {
  return cartItems.map((item) => (
    <CardComponent item={item} onClick={removeFromCart} fromCart={true} />
  ));
};

function App() {
  const [cart, setCart] = useState([]);
  const [totalCartAmount, setTotalCartAmount] = useState(0);

  const addToCart = (product) => {
    const index = cart.findIndex((val) => val.id === product.id);
    let array = cart;
    if (index !== -1) {
      array[index].quantity += 1;
      array[index].totalPrice = array[index].quantity * product.price;
    } else {
      array = [...cart, { ...product, quantity: 1, totalPrice: product.price }];
    }
    setCart(array);
    setTotalCartAmount((prev) => prev + product.price);
  };

  const removeFromCart = (product) => {
    const index = cart.findIndex((val) => val.id === product.id);
    if (cart[index].quantity === 1) {
      const array = cart.filter((item) => item.id !== product.id);
      setCart(array);
    } else {
      const array = cart;
      array[index].quantity -= 1;
      array[index].totalPrice = array[index].quantity * product.price;
      setCart(array);
    }
    setTotalCartAmount((prev) => prev - product.price);
  };
  return (
    <div
      className="App"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {data.map((item) => (
        <CardComponent item={item} onClick={addToCart} />
      ))}
      <div style={{ marginTop: 10 }} />
      <h3>Cart</h3>
      <Cart cartItems={cart} removeFromCart={removeFromCart} />
      <div style={{ marginTop: 10 }} />
      Total Cart amount is :₹{totalCartAmount}
    </div>
  );
}

export default App;
