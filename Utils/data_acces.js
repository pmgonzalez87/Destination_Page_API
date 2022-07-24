import fetch from "node-fetch";

export async function getPhotoUrl({ location, destination }) {
  // Use location and destination to go to Unsplash API
  // Grab the data and send it back (return it)
  const URL = `https://api.unsplash.com/search/photos?client_id=1thqTAw33MBpEILsIi0BzmrKzQ98E71iAwqRW3hibG4&query=${destination} ${location}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    // Get random photo
    const allPhotos = data.results;
    const randIdx = Math.floor(Math.random() * allPhotos.length);
    const randPhoto = allPhotos[randIdx];

    return randPhoto.urls.thumb;
  } catch (error) {
    console.log(error);
  }

  // this will not fetch because we are waiting for data to return
  /*fetch(ULR)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });*/
}
