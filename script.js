// Unsplash API
const API_KEY = "GzmgUtaWgryfK0wt3TN6MBjd-O672d2LkDyWF472PW8";
const count = 10;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

// Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

getPhotos();
