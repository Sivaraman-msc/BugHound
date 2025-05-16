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
    resolver: yupResolver(BugUpdateValidation),mode: 'onChange' 
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
      <NavBar />
      <div className="min-h-screen mt-1 flex ">
        <SideNav />
        <div className="flex-1 p-4 sm:p-8">
        <div className="min-h-screen flex items-center justify-center px-4 py-12 w-full">
          <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-2xl -mt-25">
            <form onSubmit={handleSubmit(onSubmit, (errors) => console.log("Validation Errors:", errors))}>
              {error && <p className="text-red-500 text-center">{error}</p>}

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={formdata.title}
                  readOnly
                  className="w-full border-b-2 border-gray-200 bg-gray-100 text-gray-600 py-2 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Description</label>
                <div className="border border-gray-300 rounded p-2 bg-gray-50 text-sm text-gray-700">
                  <div dangerouslySetInnerHTML={{ __html: formdata.description }} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Status</label>
                  <select
                    name="status"
                    value={formdata.status}
                    {...register("status")}
                    onChange={handleStatusChange}
                    className="w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none py-2"
                  >
                    <option value="">Select Status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                  <p className="text-red-500">{errors.status?.message}</p>
                </div>

                <div className="flex-1">
                  <label className="block text-gray-700 font-semibold mb-1">Priority</label>
                  <input
                    type="text"
                    value={formdata.priority}
                    readOnly
                    className="w-full border-b-2 border-gray-200 bg-gray-100 text-gray-600 py-2 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Assign To</label>
                <input
                  type="text"
                  value={formdata.assignedTo}
                  readOnly
                  className="w-full border-b-2 border-gray-200 bg-gray-100 text-gray-600 py-2 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-1">Screenshot</label>
                <input
                  type="file"
                  disabled
                  className="w-full text-gray-500 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-white font-semibold rounded shadow-md mt-6 transition-all duration-300 loginGradientBtn "
              >
                Update Status
              </button>
              {message && <p className="text-green-600 text-center mt-2">{message}</p>}
            </form>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
