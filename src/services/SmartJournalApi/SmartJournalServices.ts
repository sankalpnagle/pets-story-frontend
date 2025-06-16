import MainAPIService from "../MainAPIService";

export async function getDailyQuestions() {
  return MainAPIService.fetchData<any>({
    url: "/v1/questions/getDailyQuestions",
    method: "get",
  });
}

export async function getComprehensiveQuestions() {
  return MainAPIService.fetchData<any>({
    url: "/v1/questions/getComprehensiveQuestions",
    method: "get",
  });
}

export async function getAllJaurnalByUserId(data: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/smartJournals/getAllSmartJournals`,
    method: "post",
    data,
  });
}

export async function getJournalByUserId(id: any, data: any) {
  return MainAPIService.fetchData<any>({
    url: `/v1/smartJournals/getSmartJournalById/${id}`,
    method: "post",
    data,
  });
}

export async function addSmartJournals(data: any) {
  return MainAPIService.fetchData<any>({
    url: "v1/smartJournals/addSmartJournals",
    method: "post",
    data,
  });
}
export async function checkJournalsStatus(data: any) {
  return MainAPIService.fetchData<any>({
    url: "/v1/smartJournals/checkJournalStatus",
    method: "post",
    data,
  });
}

export async function updateSmartJournal(id: any, data: any) {
  return MainAPIService.fetchData<any>({
    url: `v1/smartJournals/updateSmartJournalById/${id}`,
    method: "put",
    data,
  });
}

export async function updateDefaultValues(data: any) {
  return MainAPIService.fetchData<any>({
    url: `v1/questions/updateDailyQuestion`,
    method: "put",
    data,
  });
}
export async function updateComprehensiveDefaultValues(data: any) {
  return MainAPIService.fetchData<any>({
    url: `v1/questions/updateComprehensiveJournalQuestion`,
    method: "put",
    data,
  });
}
