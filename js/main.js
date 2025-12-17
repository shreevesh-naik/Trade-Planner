const API_URL = 'https://script.google.com/macros/s/AKfycbynlI71c49Nk41MOqOUJbDwIZYB733Zo5I6nWBFgdjEF8_JfnthMejEqThIYFqra-nl/exec';

const LEVERAGE = 5; // 5x intraday leverage

async function getPrice(symbol) {
  const res = await fetch(`${API_URL}?symbol=${symbol}`);
  const data = await res.json();
  if (!data.price) throw new Error("Price not available");
  return data.price;
}

async function calculateTrade() {
  const loader = document.getElementById("loader");
  const btn = document.getElementById("calculateBtn");

  try {
    const symbol = document.getElementById("stock").value;
    const capital = +document.getElementById("capital").value;
    const risk = +document.getElementById("risk").value;
    const rr = +document.getElementById("rr").value;

    if (!symbol || !capital || !risk || !rr) {
      alert("Please fill all fields");
      return;
    }

    loader.style.display = "inline-block";
    btn.disabled = true;

    const entry = await getPrice(symbol);
    const qty = Math.floor(capital / entry);
    const riskPerShare = risk / qty;
    const sl = entry - riskPerShare;
    const target = entry + (entry - sl) * rr;

    const capitalSL = capital - risk;
    const capitalTarget = capital + ((target - entry) * qty);

    // Intraday leveraged calculation
    // 5x Intraday calculation
    const qtyLeveraged = Math.floor((capital * LEVERAGE) / entry); // for info only
    const slLeveraged = entry - (risk / qtyLeveraged);
    const targetLeveraged = entry + (risk * rr / qtyLeveraged);

    // Capital projection
    // const capitalSLLeveraged = (entry*qtyLeveraged)-((entry*qtyLeveraged)- (slLeveraged*(qtyLeveraged))); // lose only the risk
    // const capitalTargetLeveraged = capital + risk * rr; // gain = risk * RR
    // inestedCapital = entry*qtyLeveraged;
    

    const capitalInvested = entry * qtyLeveraged; // total invested money (with leverage)

    // Capital if Stop Loss hits
    const capitalSLLeveraged = capitalInvested - (qtyLeveraged * (entry - slLeveraged));

    // Capital if Target hits
    const capitalTargetLeveraged = capitalInvested + (qtyLeveraged * (targetLeveraged - entry));


    // Display Normal Trade
    document.getElementById("entry").innerText = entry.toFixed(2);
    document.getElementById("qty").innerText = qty;
    document.getElementById("sl").innerText = sl.toFixed(2);
    document.getElementById("target").innerText = target.toFixed(2);
    document.getElementById("capitalSL").innerText = capitalSL.toFixed(2);
    document.getElementById("capitalTarget").innerText = capitalTarget.toFixed(2);

    // Display Intraday Leveraged Trade
    document.getElementById("qtyLeveraged").innerText = qtyLeveraged;
    document.getElementById("slLeveraged").innerText = slLeveraged.toFixed(2);
    document.getElementById("targetLeveraged").innerText = targetLeveraged.toFixed(2);
    document.getElementById("capitalInvested").innerText = capitalInvested.toFixed(2);
    document.getElementById("capitalSLLeveraged").innerText = capitalSLLeveraged.toFixed(2);
    document.getElementById("capitalTargetLeveraged").innerText = capitalTargetLeveraged.toFixed(2);

  } catch (e) {
    alert(e.message);
  } finally {
    loader.style.display = "none";
    btn.disabled = false;
  }
}
