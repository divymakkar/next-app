import fetchJSON from "@/utils/api";
import axios from "axios";

class Collection {
  get = (collectionSlug: string) =>
    axios.get(`http://localhost:3001/collections/${collectionSlug}`, {
      method: "get",
    });
  sendEnquiry = (params: any) => 
    fetchJSON(`/website/api/enquiries`, {
      method: "post",
      data: params
    })
}
const collection = new Collection();
export default collection;