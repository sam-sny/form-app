import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

const List = () => {
  const { getUsersList, getUsersListPage, usersList } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFetched, setDataFetched] = useState(false);
  const [showMore, setShowMore] = useState(false);

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

  return (
    <div className="users-list-container">
      <h1>Users List</h1>
      <ul className="users-list">
        {usersList.map((user) => (
          <li key={user.id} className="user-item">
            <div className="user-info">
              <p className="user-info-item">Name: {user.name}</p>
              <p className="user-info-item">Profile Picture: {user.profile_picture}</p>
              <p className="user-info-item">Birth Date: {user.birthday}</p>
              <p className="user-info-item">Joining Date: {user.joining_date}</p>
              <p className="user-info-item">Phone Number: {user.phone_number}</p>
              <p className="user-info-item">Description: {user.description}</p>
            </div>
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
