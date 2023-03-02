import * as SQLite from "expo-sqlite";
import Place from "../models/Place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS places 
        (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            image TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
    
        )`,
        [],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `INSERT INTO places(title,image,lat,lng) VALUES (?,?,?,?)`,
        [place.title, place.image, place.location.lat, place.location.lng],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_error) => {
          console.log(error);
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          //console.log(result);
          const places = [];
          for (const place of result.rows._array) {
            places.push(
              new Place(place.id, place.title, place.image, {
                lat: place.lat,
                lng: place.lng,
              })
            );
          }
          resolve(places);
        },
        (_, reject) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((txn) => {
      txn.executeSql(
        `SELECT * FROM places WHERE id=?`,
        [id],
        (_, result) => {
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
