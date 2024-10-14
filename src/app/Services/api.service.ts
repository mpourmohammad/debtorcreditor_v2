import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Transactions } from '../Models/Transaction';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  /**
   * Fetches a list of users from a mock API endpoint.
   * @returns {Promise<any>} A promise that resolves to the user data returned from the API.
   */
  getAllUsers() {
    return fetch(environment.urlapi + 'Users')
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error;
      });
  }

  getTransactions() {
    return fetch(environment.urlapi + 'Transactions')
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error;
      });
  }

  addTransactions(Transactions: Transactions) {
    debugger;
    return fetch(environment.urlapi + 'Transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Transactions),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error;
      });
  }

  updateTransactions(Transactions: Transactions) {
    console.log(Transactions);
    return fetch(environment.urlapi + 'Transactions/' + Transactions.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Transactions),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error;
      });
  }
}
