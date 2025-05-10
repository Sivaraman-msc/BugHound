import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommentValidation } from '../utils/Yup';
import { NewCommentAPI } from '../services/CommentService';
import { useNavigate } from 'react-router-dom';
import { getUsersAPI } from '../services/AuthService';
import { GetBugAPI } from '../services/BugService';

export default function Comment() {
  const [formdata, setformData] = useState({
  bugId: '',
  to: '',
  content: ''
});
  const [users, setUsers] = useState([])
  const [bug, setBug] = useState([])
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(CommentValidation)
  })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
      const users = await getUsersAPI(); 
      console.log("Fetched users:", users);

      const devs = users.filter(user => user.role === 'Developer' || user.role === 'Tester');
      setUsers(devs || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const res = await GetBugAPI()
        setBug(res || [])
      } catch (err) {
        console.log("Error fetching bug : ", err)
      }
    }
    fetchBug()
  }, [])

  const handleChange = (e) => {
  const { name, value } = e.target;
  setformData((prev) => ({ ...prev, [name]: value }));
};

  const handleEditorChange = (event, editor) => {
    const data = editor.getData()
    setformData((prev) => ({ ...prev, content: data }))
    setValue("content", data, { shouldValidate: true })
  }

  const OnSubmit = () => {
    const fetchData = async () => {
      try {
        const res = await NewCommentAPI(formdata)
        console.log("Comment created", res)
        setMessage("Comment Created !")
        setError(false)
        navigate('/dashboard')
      } catch (err) {
        console.log("Error creating comment", err)
        setMessage("Something went wrong")
      }
    }
    fetchData()
  }

  useEffect(() => {
    register("content", { required: "Content is required" })
  }, [register])

  return (
    <>
      <NavBar />
      <div className="min-h-screen mt-1 flex bg-gray-100">
        <SideNav />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12 w-full">
          <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-2xl">
            <form onSubmit={handleSubmit(OnSubmit)} className="space-y-4">
              {error && <p>{error}</p>}

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Bug </label>
                <select
                  type="text"
                  name="bugId"
                  {...register("bugId")}
                  onChange={handleChange}
                  placeholder="Enter bug ID"
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2">
                  <option value="">Select Bug</option>
                  {bug.map((bugs) => (
                    <option key={bugs._id} value={bugs._id}>{bugs.title}</option>
                  ))}
                </select>
                {errors?.bugId && <p className="text-red-500 text-sm">{errors.bugId.message}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">User ID</label>
                <select
                  type="text"
                  name="to"
                  {...register("to")}
                  onChange={handleChange}
                  placeholder="Enter user ID"
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2">
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
                {errors?.to && <p className="text-red-500 text-sm">{errors.to.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Comment</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={formdata.content}
                  name="content"
                  onChange={handleEditorChange}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 text-white font-semibold rounded shadow-md mt-6 transition-all duration-300"
                style={{ backgroundImage: 'linear-gradient(to right, #4f46e5, #3b82f6)' }}
              >
                Submit Comment
              </button>
              {message && <p>{message}</p>}

            </form>
          </div>
        </div>
      </div>
    </>
  )
}
