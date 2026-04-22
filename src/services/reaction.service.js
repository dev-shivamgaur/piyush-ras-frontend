import axios from "axios"

const CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN;
const REQUIRED_URL = import.meta.env.VITE_REQUIRED_URL

const toggleRaction = async(poetryId, reactionType) => {

    if (!poetryId || !reactionType) {
        console.log("Both field are required!");
        return;
    }
    try {
        const res = await axios.post(`${CORS_ORIGIN}/${REQUIRED_URL}/toogle-poetry-reaction?poetryId=${poetryId}`,
            {
                reactionType,
            },
            {
                withCredentials: true,
            }
        );

        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

const fetchPoetryReactionStatus = async(poetryId) => {
    if (!poetryId) {
        console.log("PoetryId is required!");
    }
    
    try {
        const res = await axios.get(`${CORS_ORIGIN}/${REQUIRED_URL}/fetch-poetry-reaction-status/${poetryId}`,
            {
                withCredentials: true,
            }
        );

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

const toggleCommentReaction = async(poetryId, commentId, reactionType) => {
    if (!poetryId || !commentId || !reactionType) {
        console.log("Both field are required!");
        return;
    }

    try {
        const res = await axios.post(`${CORS_ORIGIN}/${REQUIRED_URL}/toggle-comment-reaction?poetryId=${poetryId}&commentId=${commentId}`,
            {
                reactionType
            },
            {
                withCredentials: true,
            }
        );

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

const fetchCommentReactionStatus = async(poetryId) => {
    if (!poetryId) {
        console.log("PoetryId is required!");
        return;
    }

    try {
        const res = await axios.get(`${CORS_ORIGIN}/${REQUIRED_URL}/fetch-comment-reaction-status/${poetryId}`,
            {
                withCredentials: true,
            }
        );

        return res.data;
    } catch (error) {
       return error.response.data; 
    }
};

const fetchReplyCommentsReactionStatus = async(poetryId, commentId) => {
    if (!poetryId || !commentId) {
        console.log("Both field are required!");
        return;
    }

    try {
        const res = await axios.get(`${CORS_ORIGIN}/${REQUIRED_URL}/fetch-reply-comment-reaction-status/${poetryId}/${commentId}`,
            {
                withCredentials: true,
            }
        );

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

const fetchAllLikedPoetry = async() => {
    try {
        const res = await axios.get(`${CORS_ORIGIN}/${REQUIRED_URL}/fetch-all-reaction`,{
            withCredentials: true,
        });

        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

const deleteReaction = async(reactionId) => {
    if (!reactionId) {
        console.log("ReactionId is required!");
    }

    try {
        const res = await axios.delete(`${CORS_ORIGIN}/${REQUIRED_URL}/delete-liked-poetry/${reactionId}`,
            {
                withCredentials: true,
            }
        );


        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export {
    toggleRaction,
    toggleCommentReaction,
    fetchPoetryReactionStatus,
    fetchCommentReactionStatus,
    fetchReplyCommentsReactionStatus,
    fetchAllLikedPoetry,
    deleteReaction,
    
}