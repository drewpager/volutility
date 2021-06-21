const moment = require("moment");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const alpaca = new Alpaca({
  keyId: `${process.env.APCA_API_KEY_ID}`,
  secretKey: `${process.env.APCA_API_SECRET_KEY}`,
  paper: true,
  usePolygon: false
});

// test API

async function API() {
  let ticker = 'AAPL'
  let bars = await alpaca.getBarsV2(
    ticker, 
    {
      start: moment().subtract(7, "days").format(),
      end: moment().subtract(20, "minutes").format(),
      timeframe: '1Day'
    },
    alpaca.configuration
  )
  const barset = [];

  for await (let b of bars) {
    barset.push(b);
  }
  
  const week_open = barset[0].OpenPrice;
  const week_close = barset.slice(-1)[0].ClosePrice;
  const percent_change = ((week_close - week_open)/week_open) * 100
  for (let i = 0; i < barset.length; i++) {
    let peak_vol = [];
    peak_vol.push(barset[i].Volume);
    console.log(Math.max(peak_vol[0]));
  }
  // const vol_max = Math.max(peak_vol[0]);
  // console.log(`${ticker}'s price changed by ${percent_change}% this week, volume peaked at ${vol_max}!`);


}

API();