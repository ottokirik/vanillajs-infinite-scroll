const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Unsplash API
const API_KEY = "GzmgUtaWgryfK0wt3TN6MBjd-O672d2LkDyWF472PW8";
const count = 10;
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${count}`;

let readyToLoadImages = false;
let imagesLoaded = 0;

const imageLoaded = () => {
  imagesLoaded += 1;
  if (imagesLoaded === count) {
    readyToLoadImages = true;
    imagesLoaded = 0;
    loader.style.visibility = "hidden";
  }
};

// Render Photos
const renderPhotos = (photos, root) => {
  if (photos.length === 0) return;

  const images = photos.map((photo) => renderPhoto(photo));

  root.append(...images);
};

// Set Attributes On DOM Element
const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// Render Photo
const renderPhoto = (photo) => {
  const {
    alt_description,
    urls: { regular },
    links: { html },
  } = photo;

  const item = document.createElement("a");

  setAttributes(item, {
    href: html,
    target: "_blank",
  });

  const img = document.createElement("img");

  setAttributes(img, {
    src: regular,
    alt: alt_description,
    title: alt_description,
  });

  img.addEventListener("load", imageLoaded);

  item.append(img);

  return item;
};

// Get photos from Unsplash API
const getPhotos = async (URL) => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAndRenderPhotos = async () => {
  renderPhotos(await getPhotos(apiURL), imageContainer);
};

getAndRenderPhotos();

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    readyToLoadImages
  ) {
    readyToLoadImages = false;
    getAndRenderPhotos();
  }
});
