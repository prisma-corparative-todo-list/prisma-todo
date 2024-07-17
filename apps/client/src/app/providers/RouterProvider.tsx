import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { PAGE_URLS, QUERY_KEYS } from '../../shared/model/constants';
import { SignupPage } from '../../pages/signup/ui/SignupPage';
import { SigninPage } from '../../pages/signin/ui/SigninPage';
import { Layout } from '../Layout/layout';
import { EmailConfirmationWaitingPage } from '../../pages/email-confirmation-wainting/ui/EmailConfirmationWaiting';
import { HomePage } from '../../pages/home';
import {
  ProtectedGroupRoutes,
  ProtectedRoutes,
  UnprotectedRoutes,
} from '../../shared';
import { MyDayPage } from '../../pages/my-day';
import { ImportantTasksPage } from '../../pages/important-tasks';
import { PlannedTasksPage } from '../../pages/planned-tasks';
import { TasksPage } from '../../pages/tasks';
import { UserListPage } from '../../pages/user-list/ui/UserListPage';
import { GroupsPage } from '../../pages/group';
import { GroupPage } from '../../pages/group/ui/GroupPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            element: <ProtectedGroupRoutes />,
            children: [
              {
                path: `${PAGE_URLS.GROUPS}/:groupId`,
                element: <GroupPage />,
              },
              {
                path: `${PAGE_URLS.GROUPS}/:groupId/${QUERY_KEYS.TASK}`,
                element: null,
              },
            ],
          },

          {
            path: PAGE_URLS.HOME,
            element: <HomePage />,
          },
          {
            path: PAGE_URLS.MY_DAY,
            element: <MyDayPage />,
          },
          {
            path: PAGE_URLS.IMPORTANT_TASKS,
            element: <ImportantTasksPage />,
          },
          {
            path: PAGE_URLS.PLANNED_TASKS,
            element: <PlannedTasksPage />,
          },
          {
            path: PAGE_URLS.TASKS,
            element: <TasksPage />,
          },
          {
            path: `${PAGE_URLS.LIST}/:listId`,
            element: <UserListPage />,
          },
          {
            path: `${PAGE_URLS.GROUPS}`,
            element: <GroupsPage />,
          },
        ],
      },
      {
        element: <UnprotectedRoutes />,
        children: [
          {
            path: PAGE_URLS.SIGNUP,
            element: <SignupPage />,
          },
          {
            path: PAGE_URLS.SIGNIN,
            element: <SigninPage />,
          },
          {
            path: PAGE_URLS.EMAIL_CONFIRMATION_WAITING,
            element: <EmailConfirmationWaitingPage />,
          },
        ],
      },
    ],
  },
]);

export const BrowserRouter = () => {
  return <RouterProvider router={router} />;
};
