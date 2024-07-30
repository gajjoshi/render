'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const NamePage = () => {
  const router = useRouter();
  const { name } = router.query;
  const [adminDetails, setAdminDetails] = useState(null);

  useEffect(() => {
    if (name) {
      fetchAdminDetails(name);
    }
  }, [name]);

  const fetchAdminDetails = async (password) => {
    try {
      const response = await axios.get(`http://localhost:5001/validate/${password}`);
      setAdminDetails(response.data);
    } catch (error) {
      console.error('Error fetching admin details:', error.message);
      setAdminDetails(null);
    }
  };

  return (
    <div style={{ color: 'white', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {adminDetails ? (
        <div>
          <h1>Admin Details</h1>
          <p><strong>Name:</strong> {adminDetails.name}</p>
          <p><strong>UPI:</strong> {adminDetails.UPI}</p>
          <p><strong>Name on UPI:</strong> {adminDetails.nameonupi}</p>
          <p><strong>Wallet Balance:</strong> {adminDetails.walletbalance}</p>
        </div>
      ) : (
        <h1>No matching admin found for the given password</h1>
      )}
    </div>
  );
};

export default NamePage;
