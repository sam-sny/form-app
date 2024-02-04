import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '@/context/GlobalContext';

const List = () => {
  const { getUsersList, getUsersListPage, usersList } = useContext(GlobalContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      getUsersList(); // Fetch usersList for the initial page
      setDataFetched(true);
    }
  }, [getUsersList, dataFetched]);

  const loadMoreUsers = async () => {
    const nextPage = currentPage + 1;
    const userListPage = await getUsersListPage(nextPage);

    if (userListPage.length > 0) {
      setCurrentPage(nextPage);
      getUsersList([...usersList, ...userListPage]);
    }
  };

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {usersList.map((user) => (
          <li key={user.id}>
            <p>Name: {user.name}</p>
            <p>Profile Picture: {user.profile_picture}</p>
            <p>Birth Date: {user.birthday}</p>
            <p>Joining Date: {user.joining_date}</p>
            <p>Phone Number: {user.phone_number}</p>
          </li>
        ))}
      </ul>
      <button onClick={loadMoreUsers}>Load More</button>
    </div>
  );
};

export default List;

