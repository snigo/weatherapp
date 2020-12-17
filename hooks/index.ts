export const useGeolocation = () => new Promise<string>((res, rej) => {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    fetch(`/api/locality?lgt=${longitude}&lat=${latitude}`)
      .then((response) => response.json())
      .then(([place]) => {
        res(place.text);
      })
      .catch((err) => rej(err));
  });
});
