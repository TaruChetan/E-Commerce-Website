import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const MyComponent = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      const data = response.data;
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: 'application/json' });
      saveAs(blob, 'i1.json');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch and Save Data</button>
    </div>
  );
};

export default MyComponent;
