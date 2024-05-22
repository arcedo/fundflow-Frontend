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

// Projects
export async function getLatestsProjects(skip, limit, category) {
    return await fetchDataGet(`${server}projects?startIndex=${skip}&limit=${limit}${category ? `&category=${category}` : ''}`);
}

export async function getRandomProjects(skip, limit, lastId) {
    return await fetchDataGet(`${server}projects/random?startIndex=${skip}&limit=${limit}${lastId ? `&lastId=${lastId}` : ''}`);
}

export async function getProjectsByCategory(idCategory, skip, limit) {
    return await fetchDataGet(`${server}projects/byCategory/${idCategory}?startIndex=${skip}&limit=${limit}`);
}

export async function getProjectByCreator(creatorId, skip, limit) {
    return await fetchDataGet(`${server}projects/byUser/${creatorId}?startIndex=${skip}&limit=${limit}`);
}

export async function getFullProject(projectUrl) {
    return await fetchDataGet(`${server}projects/${projectUrl}`);
}

export async function updateProjectData(token, projectId, projectData) {
    return await fetchDataAuth('PUT', `${server}projects/${projectId}`, token, projectData);
}

export async function getProjectsByUserStatus(token, evaluation, skip, limit, userId) {
    return await fetchDataAuth('GET', `${server}projects/byEvaluation/?evaluation=${evaluation}&startIndex=${skip}&limit=${limit}${userId ? `&userId=${userId}` : ''}`, token);
}

// Project stats
export async function getProjectStats(projectId) {
    return await fetchDataGet(`${server}projects/${projectId}/stats`);
}

export async function getProjectStatsFromUser(token, projectId) {
    return await fetchDataAuth('GET', `${server}projects/${projectId}/stats/user`, token);
}

export async function viewProject(token, projectId, idCategory) {
    return await fetchDataAuth('POST', `${server}projects/${projectId}/stats`, token, { idCategory });
}

// evaluation must be 'like' or 'dislike'
export async function statsInteraction(token, idProject, evaluation, evaluationStatus, fund, collaboration) {
    return await fetchDataAuth('PUT', `${server}projects/${idProject}/stats`, token, { evaluation, fund, collaboration, evaluationStatus });
}

// Project creation
export async function createProject(token, projectData) {
    return await fetchDataAuth('POST', `${server}projects/`, token, projectData);
}

export async function deleteProject(token, projectId) {
    return await fetchDataAuth('DELETE', `${server}projects/${projectId}`, token);
}

// Project about
export async function getProjectAbout(projectId) {
    return await fetchDataGet(`${server}projects/${projectId}/about`);
}

export async function updateProjectAbout(token, projectId, about) {
    return await fetchDataAuth('PUT', `${server}projects/${projectId}/about`, token, { about });
}

// Project tiers
export async function getProjectTiers(projectId) {
    return await fetchDataGet(`${server}projects/${projectId}/tiers`);
}

export async function createProjectTier(token, projectId, tierData) {
    if (tierData.image) {
        const formData = new FormData();
        formData.append('image', tierData.image);
        formData.append('title', tierData.title);
        formData.append('description', tierData.description);
        formData.append('price', tierData.price);
        return await fetchDataAuth('POST', `${server}projects/${projectId}/tiers`, token, formData, true);
    } else {
        return await fetchDataAuth('POST', `${server}projects/${projectId}/tiers`, token, tierData);
    }
}

export async function deleteProjectTier(token, projectId, tierId) {
    return await fetchDataAuth('DELETE', `${server}projects/${projectId}/tiers/${tierId}`, token);
}

// Project blogs
export async function getProjectBlogs(projectId) {
    return await fetchDataGet(`${server}projects/${projectId}/blogs`);
}

export async function createProjectBlog(token, projectId, blogData) {
    if (blogData.image) {
        const formData = new FormData();
        formData.append('image', blogData.image);
        formData.append('title', blogData.title);
        formData.append('content', blogData.content);
        return await fetchDataAuth('POST', `${server}projects/${projectId}/blogs`, token, formData, true);
    } else {
        return await fetchDataAuth('POST', `${server}projects/${projectId}/blogs`, token, blogData);
    }
}

export async function deleteProjectBlog(token, idProject, idBlog) {
    return await fetchDataAuth('DELETE', `${server}projects/${idProject}/blogs/${idBlog}`, token)
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

//Follows
export async function followUser(token, userUrl, followUserUrl) {
    return await fetchDataAuth('POST', `${server}follows/follow`, token, { userUrl, followUserUrl });
}

export async function unfollowUser(token, userUrl, followUserUrl) {
    return await fetchDataAuth('DELETE', `${server}follows/unfollow`, token, { userUrl, followUserUrl });
}

export async function doesUserFollow(token, userUrl, followUserUrl) {
    return await fetchDataAuth('GET', `${server}follows/${followUserUrl}/isFollowing/${userUrl}`, token);
}

export async function getFollowers(token, userUrl) {
    return await fetchDataAuth('GET', `${server}follows/${userUrl}/followers`, token);
}

export async function getFollowing(token, userUrl) {
    return await fetchDataAuth('GET', `${server}follows/${userUrl}/following`, token);
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

export async function postProjectImage(token, projectId, image) {
    const formData = new FormData();
    formData.append('image', image);
    return await fetchDataAuth('POST', `${server}projects/${projectId}/image`, token, formData, true);
}

export async function getProjectImages(projectId) {
    return await fetchDataGet(`${server}projects/${projectId}/srcImages`);
}

export async function deleteProjectImage(token, projectId, imageId) {
    return await fetchDataAuth('DELETE', `${server}projects/${projectId}/image/${imageId}`, token);
}

// search

export async function searchProjects(query, skip, limit, category, ended) {
    return await fetchDataGet(`${server}projects/search/?query=${query}&startIndex=${skip}&limit=${limit}${category ? `&category=${category}` : ''}${ended ? `&ended=${ended}` : ''}`);
}

export async function searchUsers(query, skip, limit) {
    return await fetchDataGet(`${server}users/search/user?search=${query}&startIndex=${skip}&limit=${limit}`);
}
