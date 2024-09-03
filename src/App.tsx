import { UsersList } from './components/UserList';

export const App: React.FC = () => {
  return (
    <div className="section py-5">
      <div className="box">
        <div className="title">Users</div>
        <UsersList />
      </div>
    </div>
  );
};
