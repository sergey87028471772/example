const BASE_ITEMS_URL =
  process.env.BASE_ITEMS_URL || "https://api.skinport.com/v1/items";

export const getSkinportData = async (): Promise<any> => {
  const url = BASE_ITEMS_URL;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data from ${url}, status: ${response.status}`
    );
  }

  const data = await response.json();

  return data;
};
