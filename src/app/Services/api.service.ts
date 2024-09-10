import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() { }
  /**
   * Fetches a list of users from a mock API endpoint.
   * @returns {Promise<any>} A promise that resolves to the user data returned from the API.
   */
  getUsers() {
    return fetch(environment.urlapi + 'Transactions')
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error;
      });
  }
}
