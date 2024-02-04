import React, { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export const GlobalContext = createContext({
  createUser: () => {},
  editUser: () => {},
  getUserData: () => {},
  getUsersList: () => {},
  getUsersListPage: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  usersList: [],
} )

const GlobalState = ({ children }) => {

  const history = useRouter();
  const [usersList, setUsersList] = useState([]);

  const createUser = async (data) => {
    try {
      console.log(data);
      const response = await fetch("https://tasks.vitasoftsolutions.com/userdata/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && !contentType.includes('application/json')) {
        console.error('Unexpected response format:', contentType);
        return;
      }
  
      if (response.status === 201) {
        console.log('Create User Successful!');
        history.push(`/edit/${result.id}`);

        // Handle success here, e.g., redirect to a success page
      } else {
        console.error('Sign-up failed with status code', response.status);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async (data, id) => {
    try {
      console.log(data);
      const response = await fetch(`https://tasks.vitasoftsolutions.com/userdata/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && !contentType.includes('application/json')) {
        console.error('Unexpected response format:', contentType);
        return;
      }
  
      if (response.status === 200) {
        console.log('Create User Successful!');
        history.push(`/list`);
        // Handle success here, e.g., redirect to a success page
      } else {
        console.error('Sign-up failed with status code', response.status);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getUserData = async (id) => {
    try {
      const response = await fetch(`https://tasks.vitasoftsolutions.com/userdata/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
  
      // ... (rest of the function to handle response)
  
      const userData = await response.json();
      return userData;
    } catch (error) {
      console.log(error);
      return {};
    }
  };

  const getUsersList = async () => {
    try {
      const response = await fetch(`https://tasks.vitasoftsolutions.com/userdata/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && !contentType.includes('application/json')) {
        console.error('Unexpected response format:', contentType);
        return [];
      }

      const users = await response.json();
      console.log(users);
      setUsersList(users);
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getUsersListPage = async (page) => {
    try {
      const response = await fetch(`https://tasks.vitasoftsolutions.com/userdata/?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get('Content-Type');
      if (contentType && !contentType.includes('application/json')) {
        console.error('Unexpected response format:', contentType);
        return [];
      }

      const userListPage = await response.json();
      return userListPage;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const updateUser = (updatedUser) => {
    // Update the user in the local state
    setUsersList((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const deleteUser = async (id) => {
    // Delete the user in the API
    await fetch(`https://tasks.vitasoftsolutions.com/userdata/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    // Remove the user from the local state
    setUsersList((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const contextValue = {
    createUser,
    editUser,
    getUserData,
    getUsersList,
    getUsersListPage,
    updateUser,
    deleteUser,
    usersList
  }
  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalState