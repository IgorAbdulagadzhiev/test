export default class EmployeesService {

  _apiBase = 'http://localhost:3004';

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`)

    return await res.json();
  }

  postResource = async (url, data) => {
    const response = await fetch(`${this._apiBase}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return await response.json();
  }

  deleteResource = async (url) => {
    const response = await fetch(`${this._apiBase}${url}`, {
      method: "DELETE"
    })
    return await response.json();
  }

  putResource = async (url, data) => {
    const response = await fetch(`${this._apiBase}${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }

  getEmployees = async () => {
    return await this.getResource('/employees');
  }

  getEmployee = async (id) => {
    return await this.getResource(`/employees/${id}`);
  }

  postEmployee = async (data) => {
    return this.postResource(`/employees`, data)
  }

  putEmployees = async (id, data) => {
    return await this.putResource(`/employees/${id}`, data)
  }

  deleteEmployee = async (id) => {
    return await this.deleteResource(`/employees/${id}`);
  }

  getDirectory = async () => {
    return await this.getResource('/directory/');
  }

}