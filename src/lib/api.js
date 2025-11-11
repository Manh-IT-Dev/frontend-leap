const API_BASE_URL = "http://localhost:8080";

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getAuthHeader() {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Unauthorized");
      }

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || "API request failed");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Auth endpoints
  async login(credentials) {
    const response = await this.request("/auth/auth", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  }

  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async refreshToken() {
    return this.request("/auth/refresh", {
      method: "POST",
    });
  }

  // Appointments
  async getAppointments(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/appointments/api/appointments?${queryString}`, {
      method: "GET",
    });
  }

  async createAppointment(data) {
    return this.request("/api/appointments/api/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateAppointment(appointmentId, data) {
    return this.request(`/api/appointments/${appointmentId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteAppointment(appointmentId) {
    return this.request(`/api/appointments/${appointmentId}`, {
      method: "DELETE",
    });
  }

  async assignTechnician(appointmentId, technicianId) {
    return this.request(`/api/appointments/${appointmentId}/assignTechnician`, {
      method: "PUT",
      body: JSON.stringify({ technicianId }),
    });
  }

  async checkInAppointment(appointmentId) {
    return this.request(`/api/appointments/${appointmentId}/check-in`, {
      method: "PUT",
    });
  }

  // Vehicles
  async getVehicles(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/vehicles/api/vehicles?${queryString}`, {
      method: "GET",
    });
  }

  async getVehicle(id) {
    return this.request(`/api/vehicles/${id}`, {
      method: "GET",
    });
  }

  async createVehicle(data) {
    return this.request("/api/vehicles/api/vehicles", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateVehicle(id, data) {
    return this.request(`/api/vehicles/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteVehicle(id) {
    return this.request(`/api/vehicles/${id}`, {
      method: "DELETE",
    });
  }

  // Service Tickets
  async getServiceTickets(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/service-tickets/api/service-tickets?${queryString}`, {
      method: "GET",
    });
  }

  async createServiceTicket(appointmentId) {
    return this.request(`/api/service-tickets/technician/${appointmentId}/create-service-ticket`, {
      method: "POST",
    });
  }

  async completeServiceTicket(ticketId) {
    return this.request(`/api/service-tickets/technician/${ticketId}/complete`, {
      method: "PUT",
    });
  }

  async addServiceItems(ticketId, items) {
    return this.request(`/api/service-tickets/${ticketId}/service-items`, {
      method: "POST",
      body: JSON.stringify(items),
    });
  }

  // Parts & Inventory
  async getParts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/parts/api/parts?${queryString}`, {
      method: "GET",
    });
  }

  async getInventories(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/inventories/api/inventories?${queryString}`, {
      method: "GET",
    });
  }

  // Users & Staff
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/users/api/users?${queryString}`, {
      method: "GET",
    });
  }

  async getUsersByRole(role) {
    return this.request(`/api/users/role/${role}`, {
      method: "GET",
    });
  }

  async createStaff(data) {
    return this.request("/api/users/createStaff", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async createTechnician(data) {
    return this.request("/api/users/createTechnician", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Service Centers
  async getServiceCenters(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/service-centers/api/service-centers?${queryString}`, {
      method: "GET",
    });
  }

  // Invoices
  async getInvoices(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/invoices/api/invoices?${queryString}`, {
      method: "GET",
    });
  }

  async updateInvoiceStatus(invoiceId, status) {
    return this.request(`/api/invoices/${invoiceId}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
  }

  // Notifications
  async getNotifications() {
    return this.request("/notification/notification", {
      method: "GET",
    });
  }

  async markNotificationAsRead(id) {
    return this.request(`/notification/${id}/read`, {
      method: "PUT",
    });
  }

  // Conversations & Messages
  async getConversations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/api/conversations/api/conversations?${queryString}`, {
      method: "GET",
    });
  }

  async getMessages(conversationId) {
    return this.request(`/api/messages/conversation/${conversationId}`, {
      method: "GET",
    });
  }

  async sendMessage(data) {
    return this.request("/api/messages/api/messages", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient();
