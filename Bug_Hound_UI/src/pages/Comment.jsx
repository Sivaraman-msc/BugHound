import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommentValidation } from '../utils/Yup';
import { NewCommentAPI } from '../services/CommentService';
import { getUsersAPI } from '../services/AuthService';
import { GetBugAPI } from '../services/BugService';

export default function Comment() {
  const [formdata, setFormdata] = useState({
    bugId: '',
    to: '',
    content: ''
  });
  const [users, setUsers] = useState([]);
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(CommentValidation)
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsersAPI();
        setUsers(allUsers.filter(u => u.role === 'Developer' || u.role === 'Tester') || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const allBugs = await GetBugAPI();
        setBugs(allBugs || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBugs();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata(prev => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormdata(prev => ({ ...prev, content: data }));
    setValue("content", data, { shouldValidate: true });
  };

  const onSubmit = async () => {
    try {
      await NewCommentAPI(formdata);
      setMessage("Comment Created!");
      setError(false);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    register("content", { required: "Content is required" });
  }, [register]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800 text-white">

        <div className="hidden lg:block flex-shrink-0">
          <SideNav />
        </div>

        <main className="flex-1 flex items-center justify-center px-4 py-12 w-full">
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-xl w-full max-w-2xl space-y-6">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}
              {message && <p className="text-green-500 text-center">{message}</p>}

              <div>
                <label className="block font-semibold mb-1">Select Bug</label>
                <select name="bugId" value={formdata.bugId} {...register("bugId")} onChange={handleChange} className="w-full border-b-2 border-white/50 bg-black/30 text-white py-2 outline-none focus:border-indigo-400" >
                  <option value="">Select Bug</option>
                  {bugs.map(bug => (
                    <option key={bug._id} value={bug._id}>{bug.title}</option>
                  ))}
                </select>
                <p className="text-red-500 text-sm">{errors.bugId?.message}</p>
              </div>

              <div>
                <label className="block font-semibold mb-1">Select User</label>
                <select name="to" value={formdata.to} {...register("to")} onChange={handleChange} className="w-full border-b-2 border-white/50 bg-black/30 text-white py-2 outline-none focus:border-indigo-400" >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
                <p className="text-red-500 text-sm">{errors.to?.message}</p>
              </div>

              <div>
                <label className="block font-semibold mb-1">Comment</label>
                <div className='text-black'>
                  <CKEditor editor={ClassicEditor} data={formdata.content} onChange={handleEditorChange} />
                </div>
                <p className="text-red-500 text-sm">{errors.content?.message}</p>
              </div>
              <button type="submit" className="w-full py-3 text-white font-semibold rounded shadow-md loginGradientBtn">
                Submit Comment
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
