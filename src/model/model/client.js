import { db } from '#database';

const getClient = async ({ token }) => {
  try {
    const client = await db('SELECT * FROM clients WHERE token = ?', [token]);
    return client[0];
  } catch (error) {
    console.error('Error in getClient:', error.message);
    throw error;
  }
};

export default {
  getClient
};
