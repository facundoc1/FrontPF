import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('publicaciones');
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {    
    const fetchPosts = async () => {
      try {
        const response = await axios.get();
        setPosts(response.data);
      } catch (error) {
        console.error('Error al cargar las publicaciones:', error);
      }
    };
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get();
        setUsers(response.data);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
      }
    };

    fetchPosts();
    fetchUsers();
  }, []);

  const handleDeletePost = async () => {
    if (selectedPost) {
      try {        
        await axios.delete(`/api/posts/${selectedPost.id}`);
        const updatedPosts = posts.filter((post) => post.id !== selectedPost.id);
        setPosts(updatedPosts);
        setSelectedPost(null);
      } catch (error) {
        console.error('Error al eliminar la publicación:', error);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`/api/users/${selectedUser.id}`);
        const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
        setUsers(updatedUsers);
        setSelectedUser(null);
      } catch (error) {
        console.error('Error al eliminar al usuario:', error);
      }
    }
  };

  const handleToggleAdminStatus = async () => {
    if (selectedUser) {
      try {
        await axios.put(`/api/users/${selectedUser.id}`, {
          isAdmin: !selectedUser.isAdmin,
        });

       
        const updatedUsers = users.map((user) =>
          user.id === selectedUser.id
            ? { ...user, isAdmin: !user.isAdmin }
            : user
        );
        setUsers(updatedUsers);

        setSelectedUser({ ...selectedUser, isAdmin: !selectedUser.isAdmin });
        setIsAdmin(!isAdmin);
      } catch (error) {
        console.error('Error al cambiar el estado de admin del usuario:', error);
      }
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li>
            <button onClick={() => setSelectedSection('publicaciones')}>
              Publicaciones
            </button>
          </li>
          <li>
            <button onClick={() => setSelectedSection('usuarios')}>
              Usuarios
            </button>
          </li>
        </ul>
      </nav>

      {selectedSection === 'publicaciones' && (
        <div>
          <h3>Lista de Publicaciones</h3>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                {post.title}
                <button onClick={() => setSelectedPost(post)}>Eliminar</button>
              </li>
            ))}
          </ul>
          {selectedPost && (
            <div>
              <p>¿Eliminar la publicación "{selectedPost.title}" y sus reviews?</p>
              <button onClick={handleDeletePost}>Confirmar</button>
              <button onClick={() => setSelectedPost(null)}>Cancelar</button>
            </div>
          )}
        </div>
      )}

      {selectedSection === 'usuarios' && (
        <div>
          <h3>Lista de Usuarios</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username}
                <button onClick={() => setSelectedUser(user)}>Eliminar</button>
                <button onClick={handleToggleAdminStatus}>
                  {user.isAdmin ? 'Quitar Admin' : 'Hacer Admin'}
                </button>
              </li>
            ))}
          </ul>
          {selectedUser && (
            <div>
              <p>¿Eliminar al usuario "{selectedUser.username}"?</p>
              <button onClick={handleDeleteUser}>Confirmar</button>
              <button onClick={() => setSelectedUser(null)}>Cancelar</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;