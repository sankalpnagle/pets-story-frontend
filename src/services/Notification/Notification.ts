import MainAPIService from "../MainAPIService";

export async function saveFCMToken(data: any) {
  return MainAPIService.fetchData<any>({
    url: "/v1/pushNotification/save-fcm-token",
    method: "post",
    data,
  });
}
