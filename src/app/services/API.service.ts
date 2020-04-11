import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment as env } from "../../environments/environment";

const BASE_URL = env.apiPath;
@Injectable({
  providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) { }

  addSetting(platform, payload) {
    return this.http.post(`${BASE_URL}/${platform}/settings/add`, {
      ...payload
    });
  }

  fetchSettings(platform) {
    return this.http.get(`${BASE_URL}/${platform}/settings/list`);
  }

  toggleSettingStatus(platform, pageId) {
    return this.http.get(`${BASE_URL}/${platform}/settings/status/${pageId}`);
  }

  removeSetting(platform, pageId) {
    return this.http.get(`${BASE_URL}/${platform}/settings/remove/${pageId}`);
  }

  updateSetting(platform, pageId, payload) {
    return this.http.post(`${BASE_URL}/${platform}/settings/modify/${pageId}`, {
      ...payload
    });
  }

  dashboardGraphData(searchString: string = '') {
    if (searchString !== '') searchString = `?${searchString}`;
    return this.http.get(`${BASE_URL}/dashboard/${searchString}`);
  }

  dashboardListData(pageNumber, pageSize: number = 20, searchString: string = '') {
    return this.http.get(`${BASE_URL}/dashboard/list?page=${pageNumber}&limit=${pageSize}${searchString}`);
  }

  updateAdminRecommendation(id, suggestion) {
    return this.http.post(`${BASE_URL}/dashboard/list/recommendation/${id}`, {
      admin_suggestion: suggestion,
      //admin_suggested_at: new Date(),
    });
  }
  
}
