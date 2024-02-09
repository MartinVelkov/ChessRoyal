import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

//Overview
const Overview = Loader(
 lazy(() => import('src/content/overview/firstPage'))
);

// Dashboards

const Crypto = Loader(
  lazy(() => import('src/content/dashboards/Crypto'))
  );

// Gameplay
const Chess = Loader(
  lazy(() => import('src/content/chess/ChessBoardComponents/Referee/Referee'))
  );
const ChessPage = Loader(
  lazy(() => import('src/content/chessstart/chess'))
  );

// Applications

const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);

//Account
const SingIn = Loader(
  lazy(() => import('src/content/sing-In/sing-in'))
);
const SingUp = Loader(
  lazy(() => import('src/content/sing-up/sing-up'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
      path: '',
      element: <Overview />
      },
      {
        path: 'singin',
        element: <SingIn />
      },
      {
        path: 'singUp',
        element: <SingUp />
      }
    ]
  },
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          }
        ]
      }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      }
    ]
  },
  {
    path: 'gameplay',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="chesspage" replace />
      },
      {
        path: 'chesspage',
        element: <ChessPage />
      },{
        path: 'chess',
        element: <Chess />
      },
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          }
        ]
      }
    ]
  },
];

export default routes;
