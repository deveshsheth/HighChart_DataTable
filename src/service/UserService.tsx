export const UserService = {
    getUsersMini: async () => {
        try {
            const response = await fetch('http://localhost:9696/api/getUsers');
            const responseData = await response.json();
            const transformedData = responseData.data;
            return transformedData;
          } catch (error) {
            console.log('Error fetching products:', error);
            return [];
          }
    }
  };