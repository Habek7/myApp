import { createSignal } from "solid-js";
import "./Kalkulator.css";  

export default function CurrencyConverter() {
  const [amount, setAmount] = createSignal(0);
  const [convertedAmount, setConvertedAmount] = createSignal(0);
  const [fromCurrency, setFromCurrency] = createSignal("USD");
  const [toCurrency, setToCurrency] = createSignal("EUR");

  const exchangeRates = {
    USD: 1,     
    EUR: 0.92,  
    GBP: 0.77,   
    HRK: 6.94,     
  };

   const submit = (e) => {
    e.preventDefault();
    const fromRate = exchangeRates[fromCurrency()];
    const toRate = exchangeRates[toCurrency()];
    setConvertedAmount(((amount() / fromRate) * toRate).toFixed(2));
  };

  return (
    <div>
      <form onsubmit={submit}>
        <label>
          Unesi iznos:  
          <input
            type="number"
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
      <p>Pretvoreni iznos: {convertedAmount()} {toCurrency()}</p>
    </div>
  );
}
