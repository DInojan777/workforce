const API_BASE = '';

async function request(endpoint, options = {}) {
    const token = localStorage.getItem('auth_token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Token ${token}` }),
        ...options.headers,
    };

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await res.json();
    return data;
}

// Auth
export const loginUser = (payload) =>
    request('/authentication/memberLoginUsingPassword', { method: 'POST', body: JSON.stringify(payload) });

export const registerJobSeeker = (payload) =>
    request('/authentication/registerJobSeeker', { method: 'POST', body: JSON.stringify(payload) });

export const registerClient = (payload) =>
    request('/authentication/registerClientAndContractor', { method: 'POST', body: JSON.stringify(payload) });

export const getDashboard = () =>
    request('/authentication/dashboard', { method: 'POST', body: JSON.stringify({}) });

export const sendOtp = (payload) =>
    request('/authentication/sendOtp', { method: 'POST', body: JSON.stringify(payload) });

export const changePassword = (payload) =>
    request('/authentication/changePasswordApi', { method: 'POST', body: JSON.stringify(payload) });

// Jobs
export const getJobs = (filters = {}) =>
    request('/jobs/getJobList', { method: 'POST', body: JSON.stringify(filters) });

export const createJob = (payload) =>
    request('/jobs/createJob', { method: 'POST', body: JSON.stringify(payload) });

export const applyJob = (payload) =>
    request('/jobs/applyJob', { method: 'POST', body: JSON.stringify(payload) });

export const addApplicationStatus = (payload) =>
    request('/jobs/addApplicationStatus', { method: 'POST', body: JSON.stringify(payload) });

export const getApplicationStatus = (payload) =>
    request('/jobs/getApplicationStatus', { method: 'POST', body: JSON.stringify(payload) });

export const uploadPortfolio = (formData) => {
    const token = localStorage.getItem('auth_token');
    return fetch(`${API_BASE}/jobs/addProtfolio`, {
        method: 'POST',
        headers: token ? { Authorization: `Token ${token}` } : {},
        body: formData,
    }).then((r) => r.json());
};
