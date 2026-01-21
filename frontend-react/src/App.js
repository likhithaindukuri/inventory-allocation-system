import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');

  const placeOrder = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/order', {
        body: JSON.stringify({
          productId: Number(productId),
          quantity: Number(quantity)
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
      } else {
        setMessage('Order placed successfully.');
      }
    } catch {
      setMessage('Server error. Please check if the backend is running.');
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Place Order</h2>

      <input
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
        value={productId}
      />
      <br />
      <br />

      <input
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
        value={quantity}
      />
      <br />
      <br />

      <button onClick={placeOrder}>Submit</button>

      <p>{message}</p>
    </div>
  );
}

export default App;