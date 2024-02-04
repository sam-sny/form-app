import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/router';


const List = () => {
  const { getUsersList, getUsersListPage, deleteUser, usersList } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFetched, setDataFetched] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const history = useRouter();

  useEffect(() => {
    if (!dataFetched) {
      getUsersList(); // Fetch usersList for the initial page
      setDataFetched(true);
    }
  }, [getUsersList, dataFetched]);

  const loadMoreUsers = async () => {
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const nextPage = currentPage + 1;
    const userListPage = await getUsersListPage(nextPage);

    if (userListPage.length > 0) {
      setCurrentPage(nextPage);
      getUsersList([...usersList, ...userListPage.slice(0, itemsPerPage)]);
      setShowMore(userListPage.length > itemsPerPage);
    }
  };

  const handleUserClick = (userId) => {
    // Redirect to the edit page with the user's ID
    history.push(`/edit/${userId}`);
  };

  return (
    <div className="users-list-container">
      <h1>Users List</h1>
      <ul className="users-list">
        {usersList.map((user) => (
          <li key={user.id} className="user-item" >
            <div className="user-info" onClick={() => handleUserClick(user.id)}>
              <p className="user-info-item">Name: {user.name}</p>
              <p className="user-info-item">Description: {user.description}</p>
              <p className="user-info-item">Birth Date: {user.birthdate}</p>
              <p className="user-info-item">Joining Date: {user.joining_date}</p>
              <p className="user-info-item">Phone Number: {user.phone_number}</p>
              <p className="user-info-item">Profile Picture: {user.profile_picture}</p> 
            </div>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>    
        ))}
      </ul>
      {showMore && (
        <div className="load-more-container">
          <button onClick={loadMoreUsers} className="load-more-button">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
