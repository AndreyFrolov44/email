import { HOME_ROUTE, CONTACTS_ROUTE, RATE_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, LOG_CONTACTS, TEMPLATES_ROUTE, MAILININGS_ROUTE, MAILININGS_ID_ROUTE, LOG_RATE, LOG_LISTS, LOG_LISTS_ID, LOG_LIST_CREATE, LOG_CONTACTS_CREATE, MAILINING_CREATE } from "./utils/consts";
import Home from "./pages/Home";
import LogContacts from "./pages/LogContacts";
import LogTemplates from "./pages/LogTemplates";
import LogMailings from "./pages/LogMailings";
import LogMailingsId from "./pages/LogMailingsId";
import Contacts from "./pages/Contacts";
import Rate from "./pages/Rate";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LogRate from "./pages/LogRate";
import LogListsId from "./pages/LogListsId";
import LogListCreate from "./pages/LogListCreate";
import LogContactsCreate from "./pages/LogContactsCreate";
import LogMailingCreate from "./pages/LogMailingCreate";

export const authRoutes = [
    {
        path: LOG_CONTACTS,
        Component: LogContacts,
    },
    {
        path: LOG_CONTACTS_CREATE,
        Component: LogContactsCreate,
    },
    {
        path: TEMPLATES_ROUTE,
        Component: LogTemplates
    },
    {
        path: MAILININGS_ROUTE,
        Component: LogMailings
    },
    {
        path: MAILININGS_ID_ROUTE,
        Component: LogMailingsId
    },
    {
        path: MAILINING_CREATE,
        Component: LogMailingCreate
    },
    {
        path: LOG_RATE,
        Component: LogRate
    },
    {
        path: LOG_LISTS,
        Component: LogRate
    },
    {
        path: LOG_LISTS_ID,
        Component: LogListsId
    },
    {
        path: LOG_LIST_CREATE,
        Component: LogListCreate
    },
]

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: <Home />
    },
    {
        path: CONTACTS_ROUTE,
        Component: <Contacts />
    },
    {
        path: RATE_ROUTE,
        Component: <Rate />
    },
    {
        path: LOGIN_ROUTE,
        Component: <Login />
    },
    {
        path: REGISTER_ROUTE,
        Component: <Register />
    },
]