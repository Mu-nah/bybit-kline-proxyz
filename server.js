const express = require("express");
const axios = require("axios");
const app = express();

app.get("/klines", async (req, res) => {
  const {
    symbol = "BTCUSDT",
    interval = "1",
    category = "spot",
    start,
    end,
    limit = "1000",
  } = req.query;

  try {
    const response = await axios.get("https://api.bybit.com/v5/market/kline", {
      params: {
        symbol,
        interval,
        category,
        start,
        end,
        limit,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching klines:", error.message);
    res
      .status(500)
      .json({ error: "Failed to fetch klines", details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Kline Proxy listening on port ${PORT}`));
