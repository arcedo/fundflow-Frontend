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

async function fetchDataAuth(method, url, token, body) {
    try {
        return await fetch(url, {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(body)
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

// Projects
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

// Images
export async function putProfilePicture(token, profilePicture) {
    return await fetchDataPost('PUT', `${server}user/picture`, { token, profilePicture });
}