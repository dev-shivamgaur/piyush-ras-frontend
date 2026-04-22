import axios from "axios"

const CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN;
 
const uploadPoetry = async(title, content, poetryType, thumbnail, owner,onProgress ) => {

    if (!title || !content || !thumbnail || !poetryType) {
        console.log("All fields are required");
        return;
    }

    try {
        const res = await axios.post(`${CORS_ORIGIN}/api/v1/users/upload-poetry`,{
            title, content, poetryType, owner,thumbnail
        },{
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
                let percentage = Math.round((((progressEvent.loaded)*100)/progressEvent.total));
                onProgress(percentage);
            }
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

const deletePoetry = async(poetryId) => {
    if (!poetryId) {
        console.log("poetryId is required!");
        return;
    }

    try {
       const response = await axios.delete(`${CORS_ORIGIN}/api/v1/users/delete-poetry/${poetryId}`,{
        withCredentials: true,
       });
       
       return response.data;
    } catch (error) {
        return error.response.data;
    }
};

const editPoetry = async(poetryId, title, content, poetryType, thumbnail, onProgress) => {
    if (!poetryId) {
        console.log("PoetryId is required!");
        return;
    }

    try {
        const res = await axios.patch(`${CORS_ORIGIN}/api/v1/users/edit-poetry/${poetryId}`,{
            title, content, poetryType, thumbnail
        },
        {
            headers:{"Content-Type": "multipart/form-data"},
            withCredentials: true,
            onUploadProgress: (progressEvent) => {
                let percentage = Math.round((((progressEvent.loaded)*100)/progressEvent.total));
                onProgress(percentage);
            }
        }
        );

        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const fetchAllPoetry = async() => {
    try {
        const res = await axios.get(`${CORS_ORIGIN}/api/v1/users/fetchall-poetry`);

        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const fetchLatestPoetry = async() => {
    try {
        const res = await axios.get(`${CORS_ORIGIN}/api/v1/users/fetch-latest-poetres`);

        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const fetchPoetryById = async(poetryId) => {

    if (!poetryId) {
        console.log("Poetry id is required!");
        return;
    }
    try {
        const res = await axios.get(`${CORS_ORIGIN}/api/v1/users/find-poetry/${poetryId}`);

        return res.data;
    } catch (error) {
       return error.response.data; 
    }
}

const fetchPoetryByIdForLoggedInUser = async(poetryId) => {

    if (!poetryId) {
        console.log("Poetry id is required!");
        return;
    }
    try {
        const res = await axios.get(`${CORS_ORIGIN}/api/v1/users/find-poetry/jwtVerify/${poetryId}`,{
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
       return error.response.data; 
    }
}

const getDashboardPoetry = async(page, limit) => {
    if (!page || !limit) {
        console.log("Both field are required!");
        return;
    }

    try {
        const res = await axios.get(`${CORS_ORIGIN}/api/v1/users/get-dashboard-poetry?page=${page}&limit=${limit}`,
            {
                withCredentials:true,
            },
        );

        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export {
    uploadPoetry,
    deletePoetry,
    fetchLatestPoetry,
    fetchAllPoetry,
    fetchPoetryById,
    fetchPoetryByIdForLoggedInUser,
    editPoetry,
    getDashboardPoetry
}
