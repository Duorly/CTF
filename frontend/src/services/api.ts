const BASE_URL = 'http://localhost:8080';

const api = {
  get: async <T>(endpoint: string): Promise<{ data: T }> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { data: result };
  },
  post: async <T>(endpoint: string, data: any): Promise<{ data: T }> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { data: result };
  },
  delete: async <T>(endpoint: string): Promise<{ data: T }> => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Handle 204 No Content or empty bodies
    if (response.status === 204) {
      return { data: {} as T };
    }

    const result = await response.json();
    return { data: result };
  },
};

export default api;
