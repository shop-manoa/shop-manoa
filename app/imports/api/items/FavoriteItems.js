export const getFavoriteItems = async () => {
  try {
    const response = await fetch('/api/favoriteItems'); // Replace '/api/favoriteItems' with the correct endpoint URL
    if (!response.ok) {
      throw new Error('Failed to fetch favorite items');
    }
    const favoriteItems = await response.json();
    return favoriteItems;
  } catch (error) {
    console.error('Error fetching favorite items:', error);
    throw error;
  }
};
