import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreeService {

  treeData = [];
  constructor(private http: HttpClient) {}

  /**
   * There is only one big response coming by the id and save that locally
   */
  async getRoot() {
      const url = `${environment.backUrl}${environment.places}`.replace(':id', "1");
      let response = await this.http.get<any>(url).toPromise();
      this.treeData = response;
      return this.treeData.filter(data => data.country == null);
  }

  /**
   * Get the subsequent levels
   * @param id 
   */
  getLevelOne(id) {
    let states = this.treeData.filter(data => data.country == id);
    return states;
  }
  
  getLevelTwo(id) {
    let cities = this.treeData.filter(data => data.state == id);
    return cities;
  }
}