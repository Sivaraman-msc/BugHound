import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BugFormValidation } from '../utils/Yup';
import { CreateBugAPI } from '../services/BugService';
import { getUsersAPI } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
      const users = await getUsersAPI(); 
      console.log("Fetched users:", users);

      const devs = users.filter(user => user.role === 'Developer');
      setUsers(devs || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };
  fetchUsers();
}, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'screenshot') {
      const file = files[0];
      setFormdata((prev) => ({ ...prev, screenshot: file }));
      setValue("screenshot", file, { shouldValidate: true });
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormdata((prev) => ({ ...prev, description: data }));
    setValue("description", data, { shouldValidate: true });
  };

  const onSubmit = async () => {
    try {
      const res = await CreateBugAPI(formdata);
      console.log(`Bug Reported:`, res);
      setMessage("Bug Reported");
      setError(false);
      navigate('/dashboard');
    } catch (err) {
      console.error(`Error reporting Bug: ${err}`);
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    register("description", { required: "Description is required" });
    register("screenshot", { required: "Screenshot is required" });
  }, [register]);

  return (
    <>
      <NavBar />
      <div className="min-h-screen mt-1 flex ">
        <SideNav />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12 w-full">
          <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
              {error && <p className="text-red-500 text-center">{error}</p>}

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formdata.title}
                  {...register("title")}
                  onChange={handleChange}
                  placeholder="Bug title"
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
                />
                <p className="text-red-500">{errors.title?.message}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Description</label>
                <CKEditor
                  editor={ClassicEditor}
                  data={formdata.description}
                  name="description"
                  onChange={handleEditorChange}
                />
                <p className="text-red-500">{errors.description?.message}</p>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Status</label>
                  <select
                    name="status"
                    value="open"
                    disabled
                    className="w-full border-b-2 border-gray-300 bg-gray-100 text-gray-600 cursor-not-allowed py-2"
                  >
                    <option value="open">Open</option>
                  </select>
                </div>

                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Priority</label>
                  <select
                    name="priority"
                    value={formdata.priority}
                    {...register("priority")}
                    onChange={handleChange}
                    className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
                  >
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
                <label className="block text-gray-700 font-semibold mb-1">Assign To</label>
                <select
                  name="assignedTo"
                  value={formdata.assignedTo}
                  {...register("assignedTo")}
                  onChange={handleChange}
                  className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
                >
                  <option value="">Select Developer</option>
                  {users.map((user) => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
                <p className="text-red-500">{errors.assignedTo?.message}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Screenshot</label>
                <input
                  type="file"
                  name="screenshot"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full text-gray-700"
                />
                <p className="text-red-500">{errors.screenshot?.message}</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white font-semibold rounded shadow-md mt-6 transition-all duration-300"
                style={{ backgroundImage: 'linear-gradient(to right, #4f46e5, #3b82f6)' }}
              >
                Submit Bug
              </button>
              {message && <p className="text-green-600 text-center mt-2">{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}