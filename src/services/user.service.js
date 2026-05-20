import axios from "axios"

const CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN;

const registerUser = async (email, password, avatar) => {

    if (!email || !password || !avatar) {
        console.log("email,password and thumbnail is required");
    }
    try {
        const response = await axios.post(`${CORS_ORIGIN}/api/v1/users/register-user`, {
            email, password, avatar
        },
            {
                headers: { "Content-Type": "multipart/form-data" }
            }
        );
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data
    }
};

const login = async (email, password) => {
    if (!email || !password) {
        console.log("email and password is required!");
    }
    try {
        const response = await axios.post(`${CORS_ORIGIN}/api/v1/users/login-user`, {
            email, password
        },
            {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data
    }
};

const registerGoogleUser = async (code) => {

    if (!code) {
        console.log("Code is required");
    }
    try {
        const response = await axios.post(`${CORS_ORIGIN}/api/v1/users/register-google-user`,
            {
                code
            },
            {
                headers: { "Content-Type": "application/json" }
            }
        );

        return response.data;
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
        // console.log(error);
    }
};

const googleLogin = async(code) => {

    if (!code) {
        console.log("Code is required");
    }

    try {
       const response = await axios.post(`${CORS_ORIGIN}/api/v1/users/google-login-user`,
        {code},
        {
            withCredentials: true,
        }
       );
       console.log(response);
       return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

const logout = async() => {
    try {
        const response = await axios.post(`${CORS_ORIGIN}/api/v1/users/logout-user`,
            {},
            {
                withCredentials: true,
            }
        )
        return response.data;
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
    }
}

const afterSignupGoogleLogin = async(email) => {
    if (!email) {
        console.log("email is required");
    }

    try {
        const res = await axios.post(`${CORS_ORIGIN}/api/v1/users/redirect-google-login`,
            {
                email
            },
            {
                withCredentials: true,
            }
        );
        console.log(res);
        return res.data;

    } catch (error) {
        console.log(error);
        return error.response.data;
    }
}

const createNewAccessToken = async() => {
    try {
        const res = await axios.post(`${CORS_ORIGIN}/api/v1/users/generate-accesstoken`,
            {},
            {
                withCredentials: true,
            }
        );

        return res.data;
    } catch (error) {
    return error.response.data;
    }
}

const userProfile = async() => {
    try {
        const response = await axios.get(`${CORS_ORIGIN}/api/v1/users/profile-info`,
            {
                withCredentials: true,
            }
        )
        return response.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};

const checkUserAvailability = async() => {
    try {
        
        const res = await axios.get(`${CORS_ORIGIN}/api/v1/users/check-user-public-route`,
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
    login,
    googleLogin,
    registerUser,
    registerGoogleUser,
    logout,
    afterSignupGoogleLogin,
    createNewAccessToken,
    userProfile,
    checkUserAvailability
};


