// /api/hotels.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const cityCode = req.query.cityCode || "PAR";

  try {
    // Получаем токен Amadeus
    const tokenRes = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_KEY,
        client_secret: process.env.AMADEUS_SECRET,
      }),
    });

    if (!tokenRes.ok) {
      return res.status(tokenRes.status).json({ error: "Failed to get token" });
    }

    const tokenData = await tokenRes.json();

    // Запрос к Amadeus API с токеном
    const apiRes = await fetch(
      `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${cityCode}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const apiData = await apiRes.json();

    res.status(apiRes.status).json(apiData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
