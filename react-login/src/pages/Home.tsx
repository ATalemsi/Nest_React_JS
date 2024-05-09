import React, { useEffect, useState } from 'react';

interface UserInfo {
  name: string;
  email: string;
  // Add other user info properties as needed
}

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      fetchUserInfo(accessToken);
    }
  }, []);

  const fetchUserInfo = async (accessToken: string) => {
    try {
        const response = await fetch('http://localhost:4000/users/info', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserInfo(data); 
        } else {
          console.error('Failed to fetch user info:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      {userInfo && (
        <div>
          <h2>User Info</h2>
          <p>Name: {userInfo.name}</p>
          <p>Email: {userInfo.email}</p>
          {/* Display other user info as needed */}
        </div>
      )}
    </div>
  );
};

export default Home;
