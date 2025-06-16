import MainAPIService from "../MainAPIService";

export async function petRegister(data: any) {
  return MainAPIService.fetchData<any>({
    url: "/v1/pets/register",
    method: "post",
    data,
  });
}

export async function getAllPet(id: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/pets/${id}`,
    method: "get",
  });
}

export async function getPetById(id: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/pets/get-petDetails-by-id/${id}`,
    method: "get",
  });
}
export async function getPetIdsByUserId(id: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/pets/petIdsByUser/${id}`,
    method: "get",
  });
}

export async function updatePet(id: any, data: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/pets/${id}`,
    method: "put",
    data,
  });
}
export async function deletePet(id: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/pets/${id}`,
    method: "delete",
    
  });
}
