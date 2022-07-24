import express from "express";
import uniqid from "uniqid";

import destinationsDB from "../db.js";
import { filterDestinations } from "../Utils/filters.js";
import {
  checkRequiredFields,
  isValidRequiredField,
} from "../Utils/validators.js";
import { getPhotoUrl } from "../Utils/data_acces.js";

const router = express.Router();

// CREATE
// POST /destinations
// Needs/receives {location, destination, description}
// BOTH location and destination are required
// description is optional
// => Creates a new destination inside of destinationsDB
// WITH A PHOTO FROM UNSPLASH
router.post("/", checkRequiredFields, async (req, res) => {
  const { location, destination, description } = req.body;

  const photo = await getPhotoUrl({ location, destination });

  //console.log(photo);
  const newDest = {
    location,
    destination,
    photo,
    description: description ? description : "",
  };

  const id = uniqid();

  destinationsDB[id] = newDest;

  res.send({ message: "success" });

  // SAME AS description: description ? destination : ""
  //   if (description) {
  //     newDest.description = description;
  //   } else {
  //     newDest.destination = "";
  //   }
});

// READ => DO THIS
// GET /destinations => send back the whole db
// GET /destinations?city=kajdkjakdjkajd => send filtered locations by city
// localhost:3000/destinations => the whole db of destinations
// localhost:3000/destinations?city=london => only send back destinations whose location is London
router.get("/", (req, res) => {
  // TODO Check for a city query parameter
  const city = req.query.city;

  filterDestinations({ city, destinationsDB, res });
});

// GET /destinations/city/:myCity
// localhost:3000/destinations/city/San Bernardino
router.get("/city/:myCity", (req, res) => {
  // log the city passed in the url as a named route parameter
  const city = req.params.myCity;

  filterDestinations({ city, destinationsDB, res });
});

// UPDATE
/*
  Implement PUT /destinations/:id that will process requests to update a specific record, given its unique "id" (i.e. the 6 digit string in our DB object)
  HINT: would this endpoint need to also receive any body payload? YES
  Paylod's shape {location, destination, description}
  HINT: if either the location or the destination needs updating, what else do you think you will need to update as a result? => photo
  */
router.put(
  "/:id",
  (req, res, next) => {
    //const { location, destination } = req.body;
    const location = req.body.location;
    if (location !== undefined && !isValidRequiredField(location)) {
      return res
        .status(400)
        .send({ error: "location is required and has to be a valid text" });
    }

    const destination = req.body.destination;
    if (destination && !isValidRequiredField(destination)) {
      return res
        .status(400)
        .send({ error: "destination is required and has to be a valid text" });
    }

    next();
  },
  async (req, res) => {
    const id = req.params.id;

    const { location, destination, description } = req.body;

    let hasLocOrDestChanged = false;

    if (location) {
      hasLocOrDestChanged = true;
      destinationsDB[id].location = location;
      //console.log(`location: ${location}`);
    }

    if (destination) {
      hasLocOrDestChanged = true;
      destinationsDB[id].destination = destination;
      //console.log(`destination: ${destination}`);
    }

    if (hasLocOrDestChanged) {
      const { location, destination } = destinationsDB[id];
      const photo = await getPhotoUrl({ location, destination });
      destinationsDB[id].photo = photo;
    }

    if (description) {
      destinationsDB[id].description = description;
      //console.log(`description: ${description}`);
    }

    res.send({ message: "Success" });
  }
);

// DELETE
/*
  Implement DELETE /destinations/:id that will process requests to delete a specific record, given its unique “id”
  */
// DELETE /destinations/:id
router.delete("/:id", (req, res) => {
  //grab the ID we want to delete
  const id = req.params.id;

  //delete the property at that ID inside DB
  delete destinationsDB[id];
  //same as above
  //destinationsDB[id].delete;

  res.send({ message: "Success" });
});

export default router;
