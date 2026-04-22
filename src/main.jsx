import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import CardsPage from './pages/CardsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ProfileDashboardPage from './pages/ProfileDashboardPage.jsx'
import KavitaCardPage from './pages/KavitaCardPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {NotFoundPage, ProtectedRoute, PublicRoute, UploadProgressPage} from './components/index.js'
import { HelmetProvider } from "react-helmet-async";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [ 
      {
        path: "/",
        element: <HomePage />
      },
      {
        element: <PublicRoute/>,
        children: [
          {
            path: "/login",
            element: <LoginPage/>
          },
          {
            path: "/signup",
            element: <SignUpPage/>
          },
        ]
      },
     
      {
        path: "/read",
        element: <KavitaCardPage/>
      },
      {
        path: "/allKavita",
        element:<CardsPage/>
      },
      {
        path: "profiledashboard",
        element: <ProfileDashboardPage/>
      },
      {
        path: "/read/loggedInUser",
        element: <KavitaCardPage/>
      },
      {
        element: <ProtectedRoute/>,
        children: [
          
          {
            path:"/dashboard",
            element: <DashboardPage/>
          },
          {
            path: "/uploadProgressPage",
            element: <UploadProgressPage/>
          }
          
        ]
      },
      {
        path:"/about",
        element:<AboutPage/>
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
      
    ]
  }
])
const clientId = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId = {clientId}>
  <Provider store = {store}>
  <HelmetProvider>
    <RouterProvider router={router} ></RouterProvider>
    </HelmetProvider>
   </Provider>
   </GoogleOAuthProvider>
  
)






// createRoot(document.getElementById('root')).render(
//   <GoogleOAuthProvider clientId={ClientId}>
//   <Provider store={store}>
//     <RouterProvider router={router} />
//   </Provider>
//   </GoogleOAuthProvider>
// )


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />
//       },
//       {
//         path: "/login",
//         element: <LoginPage />
//       },
//       {
//         path: "/forgot-password",
//        element: <ForgotPassword/>
//       },
//       {
//         element:<UpdatePasswordPageProtectedRoute/>,
//         children: [
//           {
//             path: "/update-password",
//             element: <UpdatePassword/>
//           }
//         ]
//       },
//       {
//         path: "/signup",
//         element: <SignupPage />
//       },
//       {
//         path: "/watch",
//         element: <MainLongVideoCard />
//       },

//       //  PROTECTED ROUTES START
//       {
//         element: <ProtectedRoute />,
//         children: [

//           {
//             path: "/upload",
//             element: <UploadVideo />
//           },
//           {
//             path: "/:username",
//             element: <UserDashboardPage />,
//             children: [
//               {
//                 index: true,
//                 element: <DashboardHomePage />
//               },
//               {
//                 path: "features",
//                 element: <DashboardHomePage />
//               },
//               {
//                 path: "videos",
//                 element: <DashboardVideosPage />
//               },
//               {
//                 path: "shorts",
//                 element: <DashboardShortPage />
//               }
//             ]
//           },
//           {
//             path: "/getallfiles",
//             element: <UploadedVideoAndAllVideo />
//           },
//           {
//             path: "/feed/subscriptions",
//             element: <SubscriptionsVideos/>
//           },
//           {
//             path: "feed/channels",
//             element: <SubscriptionChannels/>
//           }
//         ]
//       }
//       //  PROTECTED ROUTES END
//     ]
//   }
// ]);