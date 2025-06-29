import api from "./axios.instance";
import axios from "axios";

export const getUser = async(email) => {
    try {
        const response = await api.get(`/user?email=${encodeURIComponent((email).toLowerCase())}`);
        return response;
    }catch(err){
        console.log("Error fetching user details", err);
        return err;
    }
}

export const registerUser = async(userData) =>{
    try{
        const response = await api.post(`/user/register`, userData);
        return response;
    }catch (err){
        console.log("Error registering user", err);
        return err;
    }
}

export const loginUser = async(userData) =>{
    try{
        const response = await api.post(`/user/login`, userData);
        return response;
    }catch (err){
        console.log("Error logging in", err);
        return err;
    }
}

export const updateUsername = async ( userData ) =>{
    try{
        const response = await api.post(`/user/updatename`, userData);
        return response;
    }catch (err){
        console.log("Error updating username", err);
        return err;
    };
}

export const DeleteUser = async ( userData ) =>{
    try{
        const response = await api.delete(`/user/delete`, {
            data: userData
        });
        return response;
    }catch (err){
        console.log("Error deleting user", err);
        return err;
    };
}

export const otpVerification = async( userData ) =>{
    try{
        const response = await api.post(`/auth`, userData);

        const { accessToken, refreshToken } = response.data;
        await axios.post("/api/auth/setcookie", {
            accessToken,
            refreshToken,
        }, {
        headers: {
            "Content-Type": "application/json"
        }});

        return response;
    }catch (err){
        console.log("Error logging in", err);
        return err;
    }
}

export const sendPasswordResetEmail = async( email ) => {
    try{
        const response = await api.post(`/auth/sendreseturl`, {email});
        return response;
    }catch(err){
        console.log("Error sending password reset email", err);
        return err;
    }
}

export const ResetPassword = async( userData ) => {
    try{
        const response = await api.post(`/auth/resetpassword`, userData);
        return response;
    }catch(err){
        console.log("Error resetting password", err);
        return err;
    }
}