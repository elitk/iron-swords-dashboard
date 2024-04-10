type InnerMapValue = {
  [key: string]: string | number; // This assumes the values are strings, adjust as needed
};

export const checkKeysExist = (
  map: Map<string, InnerMapValue>,
  outerKey: string,
  innerKey: string
) => {
  if (map.has(outerKey)) {
    // Check if the outer key exists
    const obj = map.get(outerKey); // Get the value associated with the outer key
    return obj?.hasOwnProperty(innerKey); // Check if the inner key exists in the object
  }
  return false; // Outer key doesn't exist
};
