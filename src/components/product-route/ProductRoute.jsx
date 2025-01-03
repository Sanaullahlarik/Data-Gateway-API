import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please sign in to access this page."); 
      navigate("/sign-in"); 
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to Product Route</h2>
    </div>
  );
};

export default ProductRoute;
