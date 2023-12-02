import {useState, useEffect} from 'react';
import axios from 'axios';
import '../styles/Users.scss';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => setError(err.message));
  }, []);

  const mappedUsers = users.map((user) => {
    return (
      <p key={user.id}>{user.name}</p>
    );
  });

  return (
    <div>
      { error && <h2 className="error">{ error }</h2> }
      <h2>All the Users</h2>

      { mappedUsers }
    </div>
  );
};

export default Users;
