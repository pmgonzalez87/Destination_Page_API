import express from "express";
import cors from "cors";
import { filterDestinations } from "./utils.js";

const server = express(); // This server is deaf

server.use(cors());

//const PORT = process.env.PORT || 3000;
let PORT;
if (process.env.PORT !== undefined) {
  PORT = process.env.PORT;
} else {
  PORT = 3000;
}

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
}); // Told the server to listen on port 3000

//READ => DO THIS
// GET /destinations => send back the whole db
// GET /descriptions/city=asfafs => send filtered locations by city
// localhos:3000/destinations?city=london => only send back destinations whose location is London
const destinationsDB = {
  123456: {
    destination: "Eiffel Tower",
    location: "Paris",
    photo:
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  123457: {
    destination: "Champs Elysee",
    location: "Paris",
    photo: "https://www.baume-hotel-paris.com/monuments/arcdetriomphe/",
  },
  234567: {
    destination: "Big Ben",
    location: "London",
    photo:
      "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
  },
};

// READ => DO THIS
// GET /destinations => send back the whole db
server.get("/destinations", (req, res) => {
  // TODO Check for a city query parameter
  const city = req.query.city;

  filterDestinations({ city, destinationsDB, res });
});

// GET /destinations/city/:myCity
// localhost:3000/destinations/city/San Bernardino
server.get("/destinations/city/:myCity", (req, res) => {
  // log the city passed in the url as a named route parameter
  const city = req.params.city;
  filterDestinations({ city, destinationsDB, res });
});

// UPDATE (OPTIONAL)

// DELETE (OPTIONAL)
