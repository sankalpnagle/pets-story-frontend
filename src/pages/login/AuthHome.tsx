import React from "react";
import { Link, useNavigate } from "react-router-dom";
import sop from "/icons/SOP Logomark 2.svg";
import { apiLogin } from "../../services/AuthenticationAPIs/authenticationService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { UserData } from "../../redux/slice/UserProfileSlice";
import { SetUserData } from "../../redux/slice/AuthSlice";

const AuthHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleAuth = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleLogin = async () => {
    try {
      const payload = {
        email: "guest@example.com",
        password: "Password123",
      };

      const response: any = await apiLogin(payload);
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("role", response.data.data.role);
      localStorage.setItem("username", response.data.data.fullName);

      dispatch(UserData(response.data.data));

      dispatch(
        SetUserData({
          ...response?.data?.data,
          email: response.data.data.email,
          token: response.data.data.token,
          role: response.data.data.role,
          id: response.data.data.uid,
          loginBy: "Logged in with email",
        })
      );

      toast.success("Login Successful !", {
        onClose: () => {
          switch (response.data.data.role) {
            case "admin":
              navigate("/vet-dashboard");
              break;
            case "user":
              navigate("/user-dashboard");
              break;
            default:
              navigate("/");
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-[#FBF8FF] h-[120vh] ">
      <div className="mx-auto w-96 min-w-96 px-5 h-screen">
        <div className="pt-28">
          <img src={sop} width={90} height={90} alt="" />
        </div>
        <div className="mt-14">
          <div className="w-[250px]">
            <h1 className="text-4xl   font-bold text-blue-900 mb-4">
              Our Pets. <br />
              Their Stories.
            </h1>
          </div>

          <p className="text-sm w-[300px] text-gray-600">
            Capture every milestone and story of your beloved pets in one place.
          </p>
        </div>
        <div className="mt-16 w-fit mx-auto">
          <button
            onClick={handleAuth}
            className="w-[327px] h-[48px] bg-[#0B1A97] hover:bg-[#191f58] border text-white border-[#0B1A97] rounded-full"
          >
            Sign in
          </button>
          <br />
          <button
            onClick={() => navigate("/userSignup")}
            className="w-[327px] h-[48px] bg-white hover:bg-slate-50 my-5 border border-[#0B1A97] rounded-full"
          >
            Create Account
          </button>
          <div className="w-fit mx-auto">
            <button
              onClick={handleLogin}
              className="w-fit mx-auto underline text-[#0B1A97]"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHome;
