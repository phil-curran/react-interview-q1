/**
 * do not change the implementation
 */
export const isNameValid = (name) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(name !== "invalid name");
    }, Math.random() * 2000);
  });

// export const isNameValid = (name) =>
//   new Promise((resolve) => {
//     resolve(name !== "invalid name");
//   });

/**
 * do not change the implementation
 */
export const getLocations = () =>
  Promise.resolve(["Canada", "China", "USA", "Brazil"]);
