import http from "../http-common";

class DataService {
  getAll() {
    return http.get("/vaccinations");
  }

  get(id) {
    return http.get(`/vaccinations/${id}`);
  }

  create(data) {
    return http.post("/vaccinations", data);
  }

  update(id, data) {
    return http.put(`/vaccinations/${id}`, data);
  }

  delete(id) {
    return http.delete(`/vaccinations/${id}`);
  }

  deleteAll() {
    return http.delete(`/vaccinations`);
  }

  findByTitle(title) {
    return http.get(`/vaccinations?title=${title}`);
  }
}

export default new DataService();
