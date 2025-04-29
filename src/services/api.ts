import axios from 'axios';
import { UserData} from '../types';


const API_BASE_URL ='https://dynamic-form-generator-9rl7.onrender.com';

export const createUser = async (userData: UserData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-user`, userData);
      return response.data;
    } catch (error) {
      console.log('createUser fn err', error);
      throw error;
    }
};
export const getFormStructure = async (rollNumber: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get-form`, {
        params: { rollNumber }
      });
      return response.data;
    } catch (error) {
      console.log('getFormStruct err', error);
      throw error;
    }
  };