export function checkRequiredFields(req, res, next) {
  const { location, destination } = req.body;

  //   const location = req.body.location;
  //   const destination = req.body.destination;
  //   const description = req.body.description;

  if (!isValidRequiredField(location) || !isValidRequiredField(destination)) {
    return res.status(400).send({
      error:
        "location AND destination are BOTH required and have to be valid text",
    });
  }

  next();
}

export function isValidRequiredField(field) {
  if (!field || typeof field !== "string") {
    return false;
  }

  return true;
}
