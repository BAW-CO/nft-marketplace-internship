import axios from 'axios';

const BASE_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers';

export const getTopSellers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/topSellers`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching new items:', error);
    throw error;
  }
};