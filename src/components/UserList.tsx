import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { clearFilter, fetchUsers, setFilter } from '../features/UserSlice';
import { Input } from './Input';

export const UsersList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, filters, loading, error } = useSelector(
    (state: RootState) => state.users,
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      return (
        user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        user.phone.toLowerCase().includes(filters.phone.toLowerCase())
      );
    });
  }, [users, filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFilter({
        field: e.target.name as keyof typeof filters,
        value: e.target.value,
      }),
    );
  };

  return (
    <>
      <div>
        <button
          className="button is-small"
          onClick={() => dispatch(clearFilter())}
        >
          Clear Filters
        </button>
      </div>

      <table className="table is-narrow">
        <thead>
          <tr>
            <th>Filters</th>
            <th>
              <Input
                name="name"
                value={filters.name}
                placeholder="Filter by name"
                onChange={handleChange}
              />
            </th>
            <th>
              <Input
                name="username"
                value={filters.username}
                placeholder="Filter by username"
                onChange={handleChange}
              />
            </th>
            <th>
              <Input
                name="email"
                value={filters.email}
                placeholder="Filter by email"
                onChange={handleChange}
              />
            </th>
            <th>
              <Input
                name="phone"
                value={filters.phone}
                placeholder="Filter by phone"
                onChange={handleChange}
              />
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Phone</th>
            <th> </th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => {
              const { id, name, username, email, phone } = user;
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{username}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                </tr>
              );
            })
          ) : (
            <p>Not found</p>
          )}
        </tbody>
      </table>
    </>
  );
};
