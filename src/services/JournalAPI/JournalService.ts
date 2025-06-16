import MainAPIService from "../MainAPIService";

export async function JournalRegister(data: any) {
  return MainAPIService.fetchData<any>({
    url: "/v1/journals/create-journal",
    method: "post",
    data,
  });
}

export async function getJaurnalByPetId(id: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/journals/${id}`,
    method: "get",
  });
}
export async function getJaurnalById(id: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/journals/get-journal-details-by-id/${id}`,
    method: "get",
  });
}

export async function updateJaurnal(data: any, id: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/journals/${id}`,
    method: "put",
    data,
  });
}
export async function DeleteJaurnalByPetId(id: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/journals/${id}`,
    method: "delete",
  });
}
