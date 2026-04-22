import axios from "axios"

const CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN;
const REQUIRED_URL = import.meta.env.VITE_REQUIRED_URL

const addComment = async(poetryId, commentId, content, ) => {
    if (!poetryId || !content) {
        console.log("All field are required!");
        return;
    }

    try {
        const res = await axios.post(`${CORS_ORIGIN}/${REQUIRED_URL}/add-comment`,
            {
                poetryId,
                content
            },
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

const addReplyComment = async(poetryId, commentId, content, ) => {
    if (!poetryId || !content) {
        console.log("All field are required!");
        return;
    }

    try {
        const res = await axios.post(`${CORS_ORIGIN}/${REQUIRED_URL}/add-comment?commentId=${commentId}`,
            {
                poetryId,
                content
            },
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

const getAllComments = async(poetryId, limit, page) => {
    if (!poetryId) {
        console.log("PoetryId is required!");
        return;
    }

    try {
        const res = await axios.get(`${CORS_ORIGIN}/${REQUIRED_URL}/get-all-comments/${poetryId}?limit=${limit}&page=${page}`);

        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

const getReplyComments = async(poetryId, commentId) => {
    if (!poetryId ?? !commentId) {
        console.log("both field are required!");
    }

    try {
        const res = await axios.get(`${CORS_ORIGIN}/${REQUIRED_URL}/get-all-replycomment?poetryId=${poetryId}&commentId=${commentId}`);

        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export {
    addComment,
    getAllComments,
    addReplyComment,
    getReplyComments,
};