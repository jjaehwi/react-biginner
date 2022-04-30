import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cost, setCost] = useState(0);
  const [need, setNeed] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChange = (event) => {
    setCost(event.target.value);
  };
  const handleInput = (event) => {
    setNeed(event.target.value);
  };
  console.log(cost);
  console.log(need);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `Here are ..${coins.length} coins`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={onChange}>
          <option>Select Coin!</option>
          {coins.map((coin, index) => (
            <option
              key={index}
              value={coin.quotes.USD.price}
              id={coin.symbol}
              symbol={coin.symbol}
            >
              {coin.name} ({coin.symbol}) : $ {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <h2>Please enter the amount</h2>
      <div>
        <input
          value={need}
          onChange={handleInput}
          type="number"
          placeholder="dollar"
        />
      </div>
      <h2>You can get {need / cost}</h2>
    </div>
  );
}

export default App;
