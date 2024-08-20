
export const BASE_URL =
  import.meta.env.PROD !== true ? 'http://localhost:3000/api' : '';

export const enum PAGE_URLS {
  SIGNIN = '/',
  SIGNUP = '/signup',
  EMAIL_CONFIRMATION_WAITING = '/emailConfirmationWaiting',
  HOME = '/home',
  MY_DAY = '/my-day',
  IMPORTANT_TASKS = '/important-tasks',
  PLANNED_TASKS = '/planned-tasks',
  TASKS = '/tasks',
  LIST = '/list',
  GROUPS = '/groups',
  GROUP_TASKS = '/groups-tasks',
}

export const enum SERVICE_URL {
  AUTH = 'auth',
  USER = 'user',
  TASK = 'task',
  LIST = 'list',
  STEP = 'step',
  GROUP = 'group',
  MESSAGE = 'message',
  PARTICIPANT = 'participant',
  INVITATION = 'invitation',
}

export const enum QUERY_KEYS {
  SIGNIN = 'signin',
  SIGNUP = 'signup',
  REFRESH = 'refresh',
  TASK = 'task',
  USER = 'user',
  LIST = 'list',
  IMPORTANT = 'important',
  COMPLETED = 'completed',
  STEP = 'step',
  GROUP = 'group',
  GROUPS_TASKS = 'groups-tasks',
  MESSAGE = 'message',
  PARTICIPANT = 'participant',
  INVITATION = 'invitation',
}
