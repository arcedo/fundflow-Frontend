const server = import.meta.env.VITE_API_URL;

async function fetchDataGet(url) {
    try {
        return await (await fetch(url, {
            method: 'GET',
            mode: 'cors'
        })).json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export async function getLatestsProjects(skip, limit) {
    return await fetchDataGet(`${server}projects?startIndex=${skip}&limit=${limit}`);
}

export async function getRandomProjects(skip, limit) {
    return await fetchDataGet(`${server}projects/random?startIndex=${skip}&limit=${limit}`);
}

export async function getProjectsByCategory(idCategory, skip, limit) {
    return await fetchDataGet(`${server}projects/byCategory/${idCategory}?startIndex=${skip}&limit=${limit}`);
}