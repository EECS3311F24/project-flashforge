import { useState } from 'react';
import Navbar from '../components/Navbar';
import 'font-awesome/css/font-awesome.min.css';


export default function Forum() {
  // State to hold forum posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome to the Study Forge!",
      content: "This page is intended to be a forum filled with tips & tricks on how to study effectively. Feel free to make a post or read through others! :)",
      createdAt: new Date().toLocaleString(),
    },
  ]);

  
  // State for the new post form
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  
  // Handle adding a new post
  const handleAddPost = (e) => {
    e.preventDefault();
    
    const newPost = {
      id: posts.length + 1,
      title: newPostTitle,
      content: newPostContent,
      createdAt: new Date().toLocaleString(),
      likes: 0,
    };
    
    setPosts([...posts, newPost]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const incrementLikes = (id) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: (post.likes || 0) + 1 } : post )); // Ensures likes are initialized properly and are greater than 0
  };
    

  return (
    <div className="study-forum-container">
      <div className="sidebar"><Navbar /></div>
      <div className="content-container">
        <h2 className="study-forum-header">Study Forge</h2>
        
        {/* New Post Form */}
        <div className="forum-post-form">
          <h3>Share a Post</h3>
          <form onSubmit={handleAddPost}>
            <input
              type="text"
              placeholder="Title"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              required
            />
            <div className='submit-btn'><button type = "submit"  >Add Post</button></div>
            
          </form>
          
        </div>

        {/* Posts List */}
        <div className="posts-list">
          <h3>Study Tips & Tricks</h3>
          {posts.length === 0 ? (
            <p>No posts available. Start the conversation!</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="forum-post">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <div className="forum-post-actions">
                  <button onClick={() => incrementLikes(post.id)}> <i className="fa fa-thumbs-up"></i> {post.likes}</button>
                </div>
                <div className="user-info">
                <small>Posted on {post.createdAt}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  ); 
}
