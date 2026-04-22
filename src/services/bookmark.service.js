import axios from "axios"

const CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN;

const toggleBookMark = async(poetryId) => {
    if (!poetryId) {
        console.log("poetryId is required");
        return;
    }

    try {
        const res = await axios.post(`${CORS_ORIGIN}/api/v1/users/toggle-bookmark/${poetryId}`,
            {},
            {
                withCredentials: true,
            }
        );
        
        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

const deleteBookMark = async(bookMarkId) => {
    if (!bookMarkId) {
        console.log("bookMarkId is required");
        return;
    }

    try {
        const res = await axios.delete(`${CORS_ORIGIN}/api/v1/users/delete-bookmark/${bookMarkId}`,{
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.daa;
    }
};

const fetchAllBookMark = async() => {
  

    try {
        
        const res = await axios.get(`${CORS_ORIGIN}/api/v1/users/fetch-all-bookmark`,
            {
                withCredentials: true,
            }
        );

        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const fetchBookMarkStatus = async(poetryId) => {
    if (!poetryId) {
        console.log("poetryId is required");
        return;
    }

    try {
        const res = await axios.get(`${CORS_ORIGIN}/api/v1/users/fetch-bookmark-status/${poetryId}`,
            {
                withCredentials: true,
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

export {
    toggleBookMark,
    deleteBookMark,
    fetchAllBookMark,
    fetchBookMarkStatus,
};
