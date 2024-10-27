import { createSignal } from "solid-js";
import "./Kalkulator.css";
import idegas from "./assets/idegas.png";

export default function CurrencyConverter() {
  const [amount, setAmount] = createSignal();
  const [convertedAmount, setConvertedAmount] = createSignal(0);
  const [fromCurrency, setFromCurrency] = createSignal("USD");
  const [toCurrency, setToCurrency] = createSignal("EUR");
  const [error, setError] = createSignal("");

  const exchangeRates = {
    USD: 1,
    EUR: 0.93,
    GBP: 0.77,
    HRK: 7.02,
  };

  const submit = (e) => {
    e.preventDefault();
    if (amount() < 0) {
      setError("Uneseni iznos ne može biti negativan!"); 
      setConvertedAmount(0);
      return;
    } else {
      setError("");
    }
    
    const fromRate = exchangeRates[fromCurrency()];
    const toRate = exchangeRates[toCurrency()];
    setConvertedAmount(((amount() / fromRate) * toRate).toFixed(2));
  };

  return (
    <div>
      <img src={idegas} alt="slikica" width="150" height="150" />
      <h1>KALKULATOR ZA PRETVORBU VALUTA</h1>
      <form onsubmit={submit}>
        <label>
          Unesi iznos:  
          <input
            type="number"
            step="0.01"
            name="amount"
            value={amount()}
            oninput={(e) => setAmount(e.target.value)}
          />
        </label> <br/>
        <label>
          Iz koje valute: 
          <select
            name="fromCurrency"
            onchange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="HRK">HRK</option>
          </select>
        </label> <br/>
        <label>
          U koju valutu:  
          <select
            name="toCurrency"
            onchange={(e) => setToCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="HRK">HRK</option>
          </select>
        </label> <br/>
        <input type="submit" value="Pretvori" />
      </form>
      
      {error() && <p class="error">{error()}</p>} {}
      <p>Pretvoreni iznos: {convertedAmount()} {toCurrency()}</p>
    </div>
  );
}
