const moment = require("moment");
const Alpaca = require("@alpacahq/alpaca-trade-api");
const { max } = require("moment");
const alpaca = new Alpaca({
  keyId: `${process.env.APCA_API_KEY_ID}`,
  secretKey: `${process.env.APCA_API_SECRET_KEY}`,
  paper: true,
  usePolygon: false
});

// test API

async function API() {
  let ticker = 'WISH'
  let bars = await alpaca.getBarsV2(
    ticker, 
    {
      start: moment().subtract(30, "days").format(),
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
  const week_open_vol = barset[0].Volume;
  const week_close = barset.slice(-1)[0].ClosePrice;
  const percent_change = ((week_close - week_open)/week_open) * 100

  // console.log(`${ticker} changed by ${percent_change} in the last 7 days!`);

  

  // compiling dataset with Day x vs Day y pairs
  const numDays = barset.length;
  for (let i = 0; i < numDays; i++) {
    const maximum = barset.map(m => m.Volume)
    let maxArray = Object.values(maximum)
    let maxVol = Math.max(...maxArray)
    let avgVol = maxArray.reduce((a, b) => a + b, 0) / maxArray.length

    let data = []

    const x_open_price = barset[i].OpenPrice;
    const x_open_vol = barset[i].Volume;
    const x_vol_increase = (x_open_vol- avgVol) / avgVol * 100
    const y_close_price = barset[i+5].ClosePrice;

    data.push([x_open_price, x_open_vol, x_vol_increase, y_close_price]);
    // data.push(arr).join(', ');
    

    console.table(data);
  }
}

API();