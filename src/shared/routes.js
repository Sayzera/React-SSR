import Home from './Home';
import Grid from './Grid';
import { fetchPopularRepos, fetchTodos } from './api';
import Users from './Users';

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Grid,
    fetchInitialData: (path = '') => fetchPopularRepos(path.split('/').pop()),
  },
  {
    path: '/users',
    component: Users,
    fetchInitialData: (path) => fetchTodos(path),
  },
];

export default routes;
