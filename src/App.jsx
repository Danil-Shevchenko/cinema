import { useEffect, useState } from "react";

function App() {
  const [hotels, setHotels] = useState(null);

  useEffect(() => {
    fetch("/api/hotels?cityCode=PAR")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error(err));
  }, []);

  if (!hotels) return <div>Loading...</div>;

  return (
    <div>
      <h1>Hotels in Paris</h1>
      {hotels.data?.map((item) => (
        <div key={item.hotel.chainCode}>
          <h2>{item.hotel.name}</h2>
          <p>Rating: {item.hotel.rating}</p>
          <p>Price: {item.offers[0]?.price.total} {item.offers[0]?.price.currency}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
