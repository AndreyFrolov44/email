import { HOME_ROUTE, CONTACTS_ROUTE, RATE_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, LOG_CONTACTS, TEMPLATES_ROUTE, TEMPLATE_INFO_ROUTE, MAILININGS_ROUTE, MAILININGS_ID_ROUTE, LOG_RATE, LOG_LISTS, LOG_LISTS_ID, LOG_LIST_CREATE, LOG_CONTACTS_CREATE, MAILINING_CREATE, CREATE_TEMPLATES_ROUTE, TEST_TEMPLATE, EDIT_TEMPLATES_ROUTE } from "./utils/consts";
import Home from "./pages/Home";
import LogContacts from "./pages/LogContacts";
import LogTemplates from "./pages/LogTemplates";
import LogTemplateInfo from "./pages/LogTemplateInfo";
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
import LogCreateTemplate from "./pages/LogCreateTemplate";
import LogEditTemplate from "./pages/LogEditTemplate";
import newTemplate from "./pages/newTemplate";

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
        path: TEMPLATE_INFO_ROUTE,
        Component: LogTemplateInfo
    },
    {
        path: CREATE_TEMPLATES_ROUTE,
        Component: LogCreateTemplate
    },
    {
        path: EDIT_TEMPLATES_ROUTE,
        Component: LogEditTemplate
    },
    {
        path: TEST_TEMPLATE,
        Component: newTemplate
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