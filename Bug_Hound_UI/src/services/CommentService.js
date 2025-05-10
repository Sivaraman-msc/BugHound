import axios from "axios"

const BASE_URL='https://bughound-g7ms.onrender.com'

export const NewCommentAPI = async (CommentData) => {
    try {
        const res = await axios.post(`${BASE_URL}/Bughound/Comment/createComment`, CommentData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const GetCommentAPI=async()=>{
    try{
        const res=await axios.get(`${BASE_URL}/Bughound/Comment/getComment`,{withCredentials:true})
    return res.data
    }catch(err){
        console.log(err)
        throw err
    }
}

export const GetCommentByAPI=async(id)=>{
    try{
        const res=await axios.get(`${BASE_URL}/Bughound/Comment/getCommentbyid/${id}`,{withCredentials:true})
        return res.data
    }catch(err){
        console.log(err)
        throw err
    }
}

export const DeleteComment = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/Bughound/Comment/deleteComment/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };