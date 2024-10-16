// lib/location.js

/**
 * Fetches the user's current location after asking for permission.
 * @returns {Promise<{ latitude: number, longitude: number } | null>}
 */

export interface Location {
    latitude : number,
    longitude : number
  }


export const fetchLocation = async (): Promise<Location | null> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return reject(null);
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        () => {
          alert("Unable to retrieve your location. Please allow location access.");
          reject(null);
        }
      );
    });
  };
  