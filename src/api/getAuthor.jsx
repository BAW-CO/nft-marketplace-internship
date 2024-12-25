import axios from 'axios';

const BASE_URL = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/authors';

export const getAuthor = async (authorId) => {
  try {
    const response = await axios.get(`${BASE_URL}?author=${authorId}`);
    return response.data;
    
  } catch (error) {
    console.error('Error fetching author:', error);
    throw error;
  }
};