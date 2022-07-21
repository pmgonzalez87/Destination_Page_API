function filterObj({ objectToFilter: obj, filterValue }) {
  const filtered = {};

  for (const prop in obj) {
    if (obj[prop].location.toLowerCase() === filterValue.toLowerCase()) {
      filtered[prop] = obj[prop];
    }
  }

  return filtered;
}

export function filterDestinations({ city, destinationsDB, res }) {
  if (city !== undefined) {
    const filteredDests = filterObj({
      objectToFilter: destinationsDB,
      filterValue: city,
    });
    return res.send(filteredDests);
  } else {
    // TODO otherwise just send the whole database
    return res.send(destinationsDB);
  }
}
