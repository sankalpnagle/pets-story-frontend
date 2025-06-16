import MainAPIService from '../MainAPIService';


export async function apiSignUp(data: any) {
    return MainAPIService.fetchData<any>({
      url: "/v1/user/signup",
      method: "post",
      data,
    });
}
export async function apiLogin(data: any) {
    return MainAPIService.fetchData<any>({
      url: "/v1/user/login",
      method: "post",
      data,
    });
}

export async function apiForgotPassword(data: any) {
    return MainAPIService.fetchData<any>({
      url: "/v1/user/forgot-password",
      method: "post",
      data,
    });
}
export async function apiLoginWithGoogle(data: any) {
  return MainAPIService.fetchData<any>({
    url: "v1/user/login-with-google",
    method: "post",
    data,
  });
}
export async function apiLoginWithFacebook(data: any) {
  return MainAPIService.fetchData<any>({
    url: "v1/user/login-with-facebook",
    method: "post",
    data,
  });
}

