import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PostIndex(){

    const[posts, setPosts] = useState([]);
        useEffect(() =>{
        axios.get("http://localhost:8000/api/posts").then(res=>setPosts(res.data));
    });
    const deletePost = (id: number)=>{
        if(confirm("Are you sure?")){
            axios.delete("http://localhost:8000/api/posts/" +id).then(()=>{
            setPosts(posts.filter(p=>p.id !== id));
            })
        }

    }
    return (
      <>
      <div className="p-3">
          <h1 className="text-2xl font-bold mb-4">CRUD App</h1>
          <Link to="/create" className="mb-4 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
              Create
          </Link>
          <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                  <tr>
                      <th scope="col" className="px-6 py-3">ID</th>
                      <th scope="col" className="px-6 py-3">Title</th>
                      <th scope="col" className="px-6 py-3">Body</th>
                      <th scope="col" className="px-6 py-3 w-70">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                    {posts.map(post=>
                  <tr key={post.id} className="odd:bg-white even:bg-gray-50 border-b border-gray-200">
                      <td className="px-6 py-2 font-medium text-gray-900">{post.id}</td>
                      <td className="px-6 py-2 text-gray-700">{post.title}</td>
                      <td className="px-6 py-2 text-gray-700">{post.body}</td>
                      <td className="px-6 py-2 space-x-1">
                          <Link to={`/edit/${post.id}`} className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                              Edit
                          </Link>
                          <Link to={`/show/${post.id}`} className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                              Show
                          </Link>
                          <button onClick={() => deletePost(post.id)} className="cursor-pointer px-3 py-2 text-xs font-medium text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300">
                              Delete
                          </button>
                      </td>
                  </tr>
                  )}
                  </tbody>
              </table>
          </div>
      </div>
      </>
      
    );
}

