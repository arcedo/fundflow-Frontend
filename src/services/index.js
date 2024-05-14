const server = import.meta.env.VITE_API_URL;

async function fetchDataGet(url) {
    try {
        return await fetch(url, { method: 'GET', mode: 'cors' })
            .then(async (res) => {
                return await res.json();
            });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

async function fetchDataAuth(method, url, token, body, isFormData) {
    try {
        const headers = {
            'Authorization': token
        };

        if (!isFormData) {
            headers['Content-Type'] = 'application/json';
        }
        return await fetch(url, {
            method: method,
            mode: 'cors',
            headers: headers,
            body: isFormData ? body : JSON.stringify(body)
        })
            .then(async (res) => {
                return await res.json();
            });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function fetchDataWithBody(method, url, data) {
    try {
        return await fetch(url, {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(async (res) => {
                return await res.json();
            });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Categories 
export async function getCategories() {
    return await fetchDataGet(`${server}categories`);
}

// Project fetching
export async function getLatestsProjects(skip, limit) {
    return await fetchDataGet(`${server}projects?startIndex=${skip}&limit=${limit}`);
}

export async function getRandomProjects(skip, limit) {
    return await fetchDataGet(`${server}projects/random?startIndex=${skip}&limit=${limit}`);
}

export async function getProjectsByCategory(idCategory, skip, limit) {
    return await fetchDataGet(`${server}projects/byCategory/${idCategory}?startIndex=${skip}&limit=${limit}`);
}

export async function getProjectByCreator(creatorId, skip, limit) {
    return await fetchDataGet(`${server}projects/byUser/${creatorId}?startIndex=${skip}&limit=${limit}`);
}

// Project creation
export async function createProject(token, projectData) {
    return await fetchDataAuth('POST', `${server}projects/`, token, projectData);
}

// Auth
export async function login(username, password) {
    return await fetchDataWithBody('POST', `${server}auth/login`, { username, password });
}

export async function register(username, email, password, confirmationPassword) {
    return await fetchDataWithBody('POST', `${server}auth/register`, { username, email, password, confirmationPassword });
}

export async function loginGoogle(token) {
    return await fetchDataWithBody('POST', `${server}auth/login/google`, { token });
}

export async function verifyEmail(token) {
    return await fetchDataAuth('POST', `${server}auth/verifyEmail`, token);
}

export async function endVerificationEmail(token) {
    return await fetchDataGet(`${server}auth/verifyEmail/${token}`);
}

export async function recoverPassword(email) {
    return await fetchDataWithBody('POST', `${server}auth/recoverPassword`, { email });
}

export async function resetPassword(token, password, confirmationPassword) {
    return await fetchDataWithBody('PUT', `${server}auth/recoverPassword/${token}`, { password, confirmationPassword });
}

// User
export async function getLoggedUser(token) {
    return await fetchDataAuth('GET', `${server}users/`, token);
}

export async function getUserByUrl(url) {
    return await fetchDataGet(`${server}users/${url}`);
}

export async function changeUserPassword(token, currentPassword, newPassword, confirmPassword) {
    return await fetchDataAuth('PUT', `${server}users/changePassword`, token, { currentPassword, newPassword, confirmPassword });
}

export async function changeUserData(token, newUserData) {
    return await fetchDataAuth('PUT', `${server}users/`, token, newUserData);
}

export async function deleteOwnUser(token, password) {
    return await fetchDataAuth('DELETE', `${server}users/`, token, { password });
}

// Images
export async function putProfilePicture(token, profilePicture, password) {
    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('password', password);
    return await fetchDataAuth('PUT', `${server}users/profilePicture`, token, formData, true);
}

export async function putProfileBanner(token, profileCover, password) {
    const formData = new FormData();
    formData.append('profileCover', profileCover);
    formData.append('password', password);
    return await fetchDataAuth('PUT', `${server}users/profileCover`, token, formData, true);
}

export async function putProjectCover(token, projectId, cover) {
    const formData = new FormData();
    formData.append('cover', cover);
    return await fetchDataAuth('PUT', `${server}projects/${projectId}/cover`, token, formData, true);
}