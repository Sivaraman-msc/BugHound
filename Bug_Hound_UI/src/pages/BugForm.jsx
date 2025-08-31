import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BugFormValidation } from '../utils/Yup';
import { CreateBugAPI } from '../services/BugService';
import { getUsersAPI } from '../services/AuthService';

export default function BugForm() {
  const [formdata, setFormdata] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: '',
    assignedTo: '',
    screenshot: null
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(BugFormValidation)
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const allUsers = await getUsersAPI();
        setUsers(allUsers.filter(u => u.role === 'Developer') || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'screenshot') {
      setFormdata(prev => ({ ...prev, screenshot: files[0] }));
      setValue("screenshot", files[0], { shouldValidate: true });
    } else {
      setFormdata(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormdata(prev => ({ ...prev, description: data }));
    setValue("description", data, { shouldValidate: true });
  };

  const onSubmit = async () => {
    try {
      await CreateBugAPI(formdata);
      setMessage("Bug Reported");
      setError(false);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    register("description", { required: "Description is required" });
    register("screenshot", { required: "Screenshot is required" });
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

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
              {error && <p className="text-red-500 text-center">{error}</p>}

              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input type="text" name="title" value={formdata.title} {...register("title")} onChange={handleChange} placeholder="Bug title" className="w-full border-b-2 border-white/50 bg-black/30 text-white py-2 outline-none focus:border-indigo-400" />
                <p className="text-red-500">{errors.title?.message}</p>
              </div>

              <div>
                <label className="block font-semibold mb-1">Description</label>
                <div className='text-black'>
                  <CKEditor editor={ClassicEditor} data={formdata.description} onChange={handleEditorChange} />
                </div>
                <p className="text-red-500">{errors.description?.message}</p>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block font-semibold mb-1">Status</label>
                  <select name="status" value="open" disabled className="w-full border-b-2 border-white/50 bg-black/30 text-white cursor-not-allowed py-2" >
                    <option value="open">Open</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block font-semibold mb-1">Priority</label>
                  <select name="priority" value={formdata.priority} {...register("priority")} onChange={handleChange} className="w-full border-b-2 border-white/50 bg-black/30 text-white py-2 focus:border-indigo-400 outline-none" >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  <p className="text-red-500">{errors.priority?.message}</p>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Assign To</label>
                <select name="assignedTo" value={formdata.assignedTo} {...register("assignedTo")} onChange={handleChange} className="w-full border-b-2 border-white/50 bg-black/30 text-white py-2 focus:border-indigo-400 outline-none" >
                  <option value="">Select Developer</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
                <p className="text-red-500">{errors.assignedTo?.message}</p>
              </div>

              <div>
                <label className="block font-semibold mb-1">Screenshot</label>
                <label htmlFor="screenshot" className="cursor-pointer inline-block px-4 py-2 bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition-all">
                  Choose File
                </label>
                <input id="screenshot" type="file" name="screenshot" accept="image/*" onChange={handleChange} className="hidden" />
                <p className="text-red-500 mt-1 text-sm">{errors?.screenshot?.message}</p>
              </div>

              <button type="submit" className="w-full py-3 text-white font-semibold rounded shadow-md loginGradientBtn">
                Submit Bug
              </button>
              {message && <p className="text-green-500 text-center mt-2">{message}</p>}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
