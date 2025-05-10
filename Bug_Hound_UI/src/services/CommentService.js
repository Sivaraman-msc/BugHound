import axios from "axios"

const BASE_URL='http://localhost:3000/BugHound/Comment'

export const NewCommentAPI = async (CommentData) => {
    try {
        const res = await axios.post(`${BASE_URL}/createComment`, CommentData, {
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
        const res=await axios.get(`${BASE_URL}/getComment`,{withCredentials:true})
    return res.data
    }catch(err){
        console.log(err)
        throw err
    }
}

export const GetCommentByAPI=async(id)=>{
    try{
        const res=await axios.get(`${BASE_URL}/getCommentbyid/${id}`,{withCredentials:true})
        return res.data
    }catch(err){
        console.log(err)
        throw err
    }
}

export const DeleteComment = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/deleteComment/${id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };