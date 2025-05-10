import axios from 'axios'

const BASE_URL='http://localhost:3000/BugHound/bug'


export const CreateBugAPI = async (bugData) => {
  try {
    const formData = new FormData();
    for (let key in bugData) {
      formData.append(key, bugData[key]);
    }

    const res = await axios.post(`${BASE_URL}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.error("CreateBugAPI error:", err.response?.data || err.message);
    throw err;
  }
};

  export const UpdateBugAPI = async (id, status) => {
    try {
      const res = await axios.patch(`${BASE_URL}/updatebug/${id}`, { status }, {
        withCredentials: true
      });
      return res.data;
    } catch (err) {
      console.log("UpdateBugStatusAPI error:", err.response?.data || err.message);
      throw err;
    }
  };

  export const GetBugAPI = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/getbug`, { withCredentials: true });
      console.log(" GetBugAPI axios response:", res);
      return res.data;
    } catch (err) {
      console.error(" GetBugAPI error:", err.response?.data || err.message);
      throw err;
    }
  };

export const GetBugByIdAPI = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/getbugbyid/${id}`,{ withCredentials: true });
      return res.data;
    } catch (err) {
      console.log("GetBugByIdAPI error:", err.response?.data || err.message);
      throw err;
    }
  };

  export const BugStatAPI=async()=>{
    try{
      const res=await axios.get(`${BASE_URL}/bugStat`,{withCredentials:true})
      return res.data
    }catch(err){
      console.log("BugStat Api Err : ",err.response?.data || err.message)
      throw err;
    }
  }

  export const BugConditionAPI=async()=>{
    try{
      const res=await axios.get(`${BASE_URL}/bugCondition`,{withCredentials:true})
      return res.data
    }catch(err){
      console.log("Bug Condition Err : ",err)
      throw err
    }
  }