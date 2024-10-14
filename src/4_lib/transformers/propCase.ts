export const camelToSnake = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();

    result[snakeKey] = obj[key];
  }

  return result;
};

export const snakeToCamel = (obj: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    const camelKey = key.replace(/(_\w)/g, (match) => match[1].toUpperCase());

    result[camelKey] = obj[key];
  }

  return result;
};
