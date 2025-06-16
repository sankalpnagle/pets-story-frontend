import MainAPIService from "../MainAPIService";

export async function apiGetAllBookings() {
  return MainAPIService.fetchData<any>({
    url: `/booking/getAll/Booking`,
    method: "get",
  });
}