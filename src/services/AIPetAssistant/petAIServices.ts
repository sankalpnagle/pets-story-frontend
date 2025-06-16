import MainAPIService from "../MainAPIService";

export async function petAIAssistant(data: any) {
  return MainAPIService.fetchData<any>({
    url: "/v1/pets/askPetAI",
    method: "post",
    data,
  });
}
