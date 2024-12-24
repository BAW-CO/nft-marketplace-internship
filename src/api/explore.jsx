const BASE_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore';

export const getExplore = async (sortBy = '') => {
    try {
        const response = await fetch(`${BASE_URL}?filter=${sortBy}`);
        return response.json();
      } catch (error) {
        console.error('Error fetching explore items:', error);
        throw error;
      }
    };