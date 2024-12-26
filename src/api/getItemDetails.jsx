import axios from 'axios';

const BASE_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails';

export const getItemDetails = async (nftId) => {
  try {
    const response = await axios.get(`${BASE_URL}?nftId=${nftId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};

