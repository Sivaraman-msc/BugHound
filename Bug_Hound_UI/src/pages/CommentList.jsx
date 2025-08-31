import React, { useEffect, useState } from 'react';
import { DeleteComment, GetCommentAPI } from '../services/CommentService';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';

export default function CommentList() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await GetCommentAPI();
        setComments(res.message || []);
        setError('');
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("Failed to load comments.");
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await DeleteComment(id);
      setComments(prev => prev.filter(comment => comment._id !== id));
    } catch (err) {
      console.error("Error deleting comment:", err);
      setError("Failed to delete comment.");
    }
  };

  if (loading) return <p className="text-white text-center mt-10">Loading comments...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-800 text-white">
        <SideNav />
        <main className="flex-1 p-6 overflow-auto">
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <div className="sm:hidden space-y-4">
            {comments.length > 0 ? (
              comments.map(comment => (
                <div key={comment._id} className="bg-black/50 backdrop-blur-md p-4 rounded-2xl shadow space-y-2">
                  <div className="font-semibold text-lg">{comment.bug?.title || 'N/A'}</div>
                  <div><strong>User:</strong> {comment.user?.name || 'N/A'}</div>
                  <div><strong>Content:</strong> <span dangerouslySetInnerHTML={{ __html: comment.content }} /></div>
                  <button onClick={() => handleDelete(comment._id)} className="w-full py-2 text-white font-semibold rounded shadow-md loginGradientBtn mt-2" >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-300">No comments available.</p>
            )}
          </div>

          <div className="hidden sm:block">
            <div className="bg-black/50 backdrop-blur-md rounded-2xl p-6 shadow">
              <table className="min-w-full text-white">
                <thead>
                  <tr className="border-b border-white/30">
                    <th className="px-4 py-2 text-left">Bug</th>
                    <th className="px-4 py-2 text-left">User</th>
                    <th className="px-4 py-2 text-left">Content</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.length > 0 ? (
                    comments.map(comment => (
                      <tr key={comment._id} className="hover:bg-white/10">
                        <td className="px-4 py-2">{comment.bug?.title || 'N/A'}</td>
                        <td className="px-4 py-2">{comment.user?.name || 'N/A'}</td>
                        <td className="px-4 py-2"><span dangerouslySetInnerHTML={{ __html: comment.content }} /></td>
                        <td className="px-4 py-2">
                          <button onClick={() => handleDelete(comment._id)} className="py-2 px-4 text-white font-semibold rounded shadow-md loginGradientBtn" >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-300">
                        No comments available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
