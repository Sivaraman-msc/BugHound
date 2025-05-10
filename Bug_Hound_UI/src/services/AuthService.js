import axios from "axios"

const BASE_URL='http://localhost:3000/BugHound/user'

export const SignupAPI = async (AuthData) => {
    try {
      const data = new FormData();
      for (let key in AuthData) {
        data.append(key, AuthData[key]);
      }
  
      const res = await axios.post(`${BASE_URL}/signup`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return res.data;
    } catch (err) {
      console.error("SignupAPI error:", err.response?.data || err.message);
      throw err;
    }
  };

export const LoginAPI=async(AuthData)=>{
   try{
    const res=await axios.post(`${BASE_URL}/login`,AuthData,{
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials: true, 
    })
    return res.data
   }catch(err){
    console.log("Error",err)
   }
}

export const UpdateUserAPI=async(id,AuthData)=>{
    try{
        const res=await axios.put(`${BASE_URL}/updateUser/${id}`,AuthData)
    return res.data
    }catch(err){
        console.log("error",err)
    }
}

export const getUsersAPI = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/getUsers`, { withCredentials: true });
    console.log("Axios Response:", res);        
    console.log("Axios Response Data:", res.data);
    return res.data;
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
};

export const GetUserByIdAPI=async(id)=>{
   try{
    const res=await axios.get(`${BASE_URL}/getuserbyid/${id}`)
    return res.data
   }catch(err){
    console.log("Error",err)
   }
}