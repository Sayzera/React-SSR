import React from 'react';
import { useSelector } from 'react-redux';
import { selectName } from '../redux/mainSlice';

function Users({ data, fetchInitialData }) {
  const name = useSelector((state) => state.main.name);
  const [repos, setRepos] = React.useState(() => {
    return __isBrowser__ ? window.__INITIAL_DATA__ : data;
  });

  const [loading, setLoading] = React.useState(repos ? false : true);

  React.useEffect(() => {
    setLoading(true);

    fetchInitialData().then((result) => {
      setRepos(result);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>loading</p>;
  }

  return (
    <div>
      name: {name}
      <ul>
        {repos.map(({ id, title, completed }) => (
          <li key={id}>
            <h2>{title}</h2>
            <p>{completed}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
