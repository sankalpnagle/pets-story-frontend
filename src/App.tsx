import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import AdminLayout from "./pages/layout/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoutes";
import UserDashBoard from "./pages/user/UserDashboard/UserDashBoard";
import VetDashboard from "./pages/vet/VetDashboard/VetDashboard";
import UserRegister from "./pages/signup/UserRegister";
import PetRegister from "./pages/pet/PetRegister";
import PetList from "./pages/pet/PetList";
import ForgotPassword from "./pages/forget/ForgetPassword";
import ResetPassword from "./pages/forget/ResetPassword";
import VerifyEmail from "./pages/forget/VerifyEmail";
import PasswordChanged from "./pages/forget/ChangedPasswordUI";
import AddJournal from "./pages/journal/AddJournal";
import JournalList from "./pages/journal/JournalList";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import EditProfile from "./pages/user/Profile/EditProfile";
import Myprofile from "./pages/user/Profile/MyProfile";
import PetProfile from "./pages/pet/PetProfile";
import PetHealthProfile from "./pages/pet/PetHealthProfile";
import AddPet from "./pages/pet/AddPet";
import PetDetails from "./pages/pet/PetDetails";
import { useSelector } from "react-redux";
import { onMessageListener, requestFCMToken } from "./utils/firebaseUtils";
import { saveFCMToken } from "./services/Notification/Notification";
// import "swiper/swiper-bundle.css";
import SmartJournal from "./pages/journal/SmartJournal";
// import { requestFCMToken,onMessageListener } from "./utils/firebaseUtils.js";
import "react-day-picker/style.css";
import AddSmartJournal from "./pages/journal/AddSmartJournal";
import PetHome from "./pages/pet/PetHome";
import StartJournal from "./pages/journal/StartJournal";

import AIPetAssistant from "./pages/pet/AIPetAssistant";
import DailyObservation from "./pages/journal/DailyObservation";

import PeriodicCheck from "./pages/journal/PeriodicCheck";
import AuthHome from "./pages/login/AuthHome";
import PrivacyPolicy from "./pages/privacypolicy/PrivacyPolicy";

function App() {
  const userData = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        console.log("fetchingtoken");
        const token = await requestFCMToken();
        console.log("fcm token generated", token);
        const payload = {
          token: token,
          userId: userData?.email,
        };
        if (token && userData?.email) {
          const res = await saveFCMToken(payload);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFCMToken();
  });
  onMessageListener()
    .then((payload: any) => {
      console.log(
        "neeraj notication in app js file receivsd in foreground:",
        payload
      );
    })
    .catch((err) => console.log("Failed to receive message:", err));
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<AuthHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/userSignup" element={<UserRegister />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
            <Route path="/passwordChanged" element={<PasswordChanged />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy/" element={<PrivacyPolicy />} />

            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route element={<AdminLayout />}>
              {/* Role-based protected routes */}

              <Route
                path="/vet-dashboard"
                element={
                  <ProtectedRoute roles={["admin"]}>
                    <VetDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-dashboard"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <UserDashBoard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/pet-register"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PetRegister />
                  </ProtectedRoute>
                }
              />
              <Route
                path={`/pet-register/:id`}
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PetRegister />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/pet-list"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PetList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/petHome"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PetHome />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/SmartJournal"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <SmartJournal />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/AddSmartJournal"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <AddSmartJournal />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/AddSmartJournal/:id"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <AddSmartJournal />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/AddSmartJournal/:journalId/:id"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <AddSmartJournal />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Profile-edit"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/My-profile"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <Myprofile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/My-profile/:id"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <Myprofile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Pet-profile/:id"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PetProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Pet-profile"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PetProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Pet-Health"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PetHealthProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Pet-Health/:id"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PetHealthProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-Pet"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <AddPet />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Pet-Details"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PetDetails />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/Pet-Details/:id"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PetDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/StartJournal"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <StartJournal />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/DailyObservation"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <DailyObservation />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/DailyObservation/:id"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <DailyObservation />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/DailyObservation/:journalId/:id"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <DailyObservation />
                  </ProtectedRoute>
                }
              />

              {/* <Route
                path="/DailyObservation/:journalId"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <DailyObservation />
                  </ProtectedRoute>
                }
              /> */}

              <Route
                path="/PeriodicCheck"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PeriodicCheck />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/PeriodicCheck/:id"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PeriodicCheck />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/PeriodicCheck/:journalId/:id"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <PeriodicCheck />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/AIPetAssistant"
                element={
                  <ProtectedRoute roles={["user"]}>
                    <AIPetAssistant />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={true}
      />
    </>
  );
}

export default App;
