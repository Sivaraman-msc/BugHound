import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { GetBugByIdAPI, UpdateBugAPI } from '../services/BugService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BugUpdateValidation } from '../utils/Yup';
import { useNavigate, useParams } from 'react-router-dom';

export default function BugUpdate() {
  const [formdata, setFormdata] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    assignedTo: '',
    screenshot: null
  });

  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const { register, setValue, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(BugUpdateValidation), mode: 'onChange'
  });

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const res = await GetBugByIdAPI(id);
        if (res.data) {
          const bug = res.data;
          setFormdata({
            title: bug.title || '',
            description: bug.description || '',
            status: bug.status || '',
            priority: bug.priority || '',
            assignedTo: bug.assignedTo || '',
            screenshot: null
          });

          setValue("title", bug.title);
          setValue("description", bug.description);
          setValue("status", bug.status);
          setValue("priority", bug.priority);
          setValue("assignedTo", bug.assignedTo);
        }
      } catch (err) {
        console.log("Get Bug Error: ", err);
      }
    };
    fetchBug();
  }, [id, setValue]);

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormdata(prev => ({ ...prev, status: value }));
    setValue("status", value, { shouldValidate: true });
  };

  const onSubmit = async () => {
    try {
      await UpdateBugAPI(id, formdata.status);
      console.log("Submitting status:", formdata.status);
      setMessage("Bug status updated");
      setError(false);
      navigate('/dashboard');
    } catch (err) {
      console.error("Error updating bug:", err);
      setError("Something went wrong");
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex flex-1 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800 text-white">
          <SideNav />
          <main className="flex-1 p-8 sm:p-12 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <div className="bg-black/50 backdrop-blur-md rounded-2xl p-10 shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {error && <p className="text-red-500 text-center">{error}</p>}

                  <label className="block text-gray-300 font-semibold mb-1">Title</label>
                  <input type="text" value={formdata.title} readOnly className="w-full border-b-2 border-gray-700 bg-gray-900 text-white py-2 cursor-not-allowed mb-4" />

                  <label className="block text-gray-300 font-semibold mb-1">Description</label>
                  <div className="border border-gray-700 rounded p-2 bg-gray-900 text-white mb-4">
                    <div dangerouslySetInnerHTML={{ __html: formdata.description }} />
                  </div>

                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="flex-1">
                      <label className="block text-gray-300 font-semibold mb-1">Status</label>
                      <select {...register("status")} value={formdata.status} onChange={handleStatusChange} className="w-full border-b-2 border-gray-700 bg-gray-900 text-white py-2 mb-4" >
                        <option value="">Select Status</option>
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </select>
                      <p className="text-red-500">{errors.status?.message}</p>
                    </div>

                    <div className="flex-1">
                      <label className="block text-gray-300 font-semibold mb-1">Priority</label>
                      <input type="text" value={formdata.priority} readOnly className="w-full border-b-2 border-gray-700 bg-gray-900 text-white py-2 cursor-not-allowed mb-4" />
                    </div>
                  </div>

                  <label className="block text-gray-300 font-semibold mb-1">Assign To</label>
                  <input type="text" value={formdata.assignedTo} readOnly className="w-full border-b-2 border-gray-700 bg-gray-900 text-white py-2 cursor-not-allowed mb-4" />

                  <label className="block text-gray-300 font-semibold mb-1">Screenshot</label>
                  <input type="file" disabled className="w-full bg-gray-900 text-gray-400 cursor-not-allowed mb-4" />

                  <button type="submit" className="w-full py-3 text-white font-semibold rounded shadow-md mt-6 bg-gradient-to-r from-indigo-500 to-blue-600 hover:opacity-90" >
                    Update Status
                  </button>
                  {message && <p className="text-green-400 text-center mt-2">{message}</p>}
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
