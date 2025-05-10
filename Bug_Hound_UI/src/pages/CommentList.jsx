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

  if (loading) return <p className="text-gray-600 text-center">Loading comments...</p>;

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen bg-gray-100">
        <SideNav />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <div className="sm:hidden space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="bg-white p-4 rounded shadow">
                  <div className="mb-2 font-semibold text-lg">{comment.bug?.title || 'N/A'}</div>
                  <div className="mb-2 "><strong>User:</strong> {comment.user?.name || 'N/A'}</div>
                  <div className="mb-2 "><strong>Content:</strong> {comment.content?.replace(/<[^>]+>/g, '')}</div>
                  <button
                    onClick={() => handleDelete(comment._id)}
                     className="w-15 p-2 lg:w-20 mx-auto  text-white font-semibold rounded shadow-md transition-all duration-300"
                     style={{ backgroundImage: 'linear-gradient(to right,rgb(229, 70, 70),rgb(241, 29, 29))' }}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No comments available.</p>
            )}
          </div>

          <div className="hidden sm:block">
            <table className="min-w-full bg-white border rounded-md shadow-sm">
              <thead>
                <tr className="text-left text-sm text-white bg-gray-700">
                  <th className="px-4 py-2 border-b">Bug</th>
                  <th className="px-4 py-2 border-b">User</th>
                  <th className="px-4 py-2 border-b">Content</th>
                  <th className="px-4 py-2 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <tr key={comment._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-b">{comment.bug?.title || 'N/A'}</td>
                      <td className="px-4 py-2 border-b">{comment.user?.name || 'N/A'}</td>
                      <td className="px-4 py-2 border-b">{comment.content?.replace(/<[^>]+>/g, '')}</td>
                      <td className="px-4 py-2 border-b">
                        <button
                          onClick={() => handleDelete(comment._id)}
                           className="w-20 py-3 text-white font-semibold rounded shadow-md transition-all duration-300"
                style={{ backgroundImage: 'linear-gradient(to right,rgb(229, 70, 70),rgb(241, 29, 29))' }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-500">
                      No comments available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}
