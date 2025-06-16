import MainAPIService from "../MainAPIService";


export async function getUserProfileById(id: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/user/get_user_profile/${id}`,
    method: "get",
  });
}

export async function updateUserProfile(data: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/user/update-user-profile`,
    method: "put",
    data,
  });
}

export async function uploadUserProfileImage(id: any, data: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/user/upload_profile_image/${id}`,
    method: "post",
    data,
  });
}