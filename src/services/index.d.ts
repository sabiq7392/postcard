
export interface ServiceImportantConfig<Data = undefined> {
  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT" | "POST" | "PATCH",
  headers?: {
    Authorization?: string,
  }, 
  data?: Data
}