import axios from 'axios';

const BASE_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems';

export const getNewItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/newItems`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching new items:', error);
    throw error;
  }
};