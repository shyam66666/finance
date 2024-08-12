import { http } from "./http"

export const getFinance = ()=>{
 return http.get("/api");
}