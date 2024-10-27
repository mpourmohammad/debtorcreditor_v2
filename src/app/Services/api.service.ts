import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Transactions } from '../Models/Transaction';
import { Checks } from '../Models/Checks';
import { Users } from '../Models/Users';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  updateUsers(user: Users) {
    throw new Error('Method not implemented.');
  }
  
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

  searchTransactions(nameField: any, value: any) {
    if (value.trim() === '') {
      value = '0';
    }
    return fetch(
      environment.urlapi +
        'Transactions/SearchTransaction/' +
        nameField +
        '/' +
        value
    )
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error;
      });
  }

  deleteTransaction(id: number) {
    return fetch(environment.urlapi + 'Transactions/' + id, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error;
      });
  }

  getChecks() {
    return fetch(environment.urlapi + 'Checks')
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error;
      });
  }
  addChecks(checks: Checks) {
    return fetch(environment.urlapi + 'Checks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checks),
    });
  }
  updateChecks(checks: Checks) {
    return fetch(environment.urlapi + 'Checks/' + checks.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checks),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error;
      });
  }
  deleteCheck(id: number) {}

  addUsers(userData: Users) {
    throw new Error('Method not implemented.');
  }
}
