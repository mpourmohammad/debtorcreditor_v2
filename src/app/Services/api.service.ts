import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  api = 'https://fake-json-api.mock.beeceptor.com/users';
  constructor() { }
  /**
   * Fetches a list of users from a mock API endpoint.
   * @returns {Promise<any>} A promise that resolves to the user data returned from the API.
   */
  getUsers() {
    return fetch(this.api)
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error
      });
  }
}
