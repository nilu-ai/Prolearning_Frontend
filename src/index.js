import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./Components/Login/login.js";
import Editor from "./Components/Editor/editor.js";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import { Signup } from "./Components/Login/Signup.js";
import { Provider } from "react-redux";
import appstore from "./utils/appstore.js";
import { Profile } from "./Components/Profile/profile.js";
import Auth from "./Components/Auth/auth.js";
import Home from "./Components/Home/Home.js";
import Student from "./Components/Dashboard/students/student.js";
import Logout from "./Components/Login/Logout.js";
import { Navigate } from "react-router-dom";
import Chapters from "./Components/Dashboard/students/Chapters.js";
import Particulartopics from "./Components/Dashboard/students/particulartopics.js";
import Topics from "./Components/Dashboard/students/topics.js";
import RoleAuth from "./Components/Auth/roleauth.js";
import Parents from "./Components/Dashboard/parents/Parents.js";
import Teacher from "./Components/Dashboard/teacher/Teacher.js";
import CreateTopic from "./Components/Dashboard/parents/CreateTopic.js"
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />
  },
  {
    path: "/",
    element: <App />,
    children:[ {
      path:"/login",
      element:(<Auth aut={false}><Login/></Auth>)
     },
    
     {
      path:"/signup",
      element:<Signup/>
     },
     {
      path:"/create/topic/:id",
      element:<RoleAuth aut={true} role={"TEACHER"} ><Editor/></RoleAuth>
     },
     {
      path:"/topic/:id",
      element:<Particulartopics/>
     },

     {
      path:"/chapter/:id",
      element:<Topics/>
     },
     {
      path:"/subject/:id",
      element:<Chapters/>
     },
     {
      path:"/profile",
      element:(<Auth aut={true}><Profile/></Auth>)
     },
     {
      path:"/logout",
      element:(<Auth aut={true}><Logout/></Auth>)
     },
     {
      path:"/home",
      element:(<Home/>)
     },
     {
      path:"/student/dashboard",

      element:(<RoleAuth aut={true} role={"STUDENT"} ><Student/></RoleAuth>)
     },
     {
      path:"/parent/dashboard",

      element:(<RoleAuth aut={true} role={"PARENT"} ><Parents/></RoleAuth>)
     },
     {
      path:"/teacher/dashboard",

      element:(<RoleAuth aut={true} role={"PARENT"} ><Teacher/></RoleAuth>)
     },
     {
      path:"/create/topic",

      element:(<RoleAuth aut={true} role={"PARENT"} ><CreateTopic/></RoleAuth>)
     },]
  },

    
      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
    
  
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appstore}>
    <RouterProvider router={routes} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(//console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
