import axios from 'axios';


export const handleActive = async (model, id, isActive) => {
    try {

      await axios.put(`/softdelete/activate`, { model, id, activateValue: isActive });

      return { success: true };
    } catch (error) {
        console.log('Error al cambiar es estado de activo')
      throw error;
    }
  };
  

export const handleActiveProduct = async (productId, isActive) => {
    try {
      await handleActive('Products', productId, isActive);
    } catch (error) {
      console.error('Error al cambiar el estado del producto:', error);
    }
  };

export const handleActiveUser = async (userId, isActive) => {
    try {
      await handleActive('User', userId, isActive);
    } catch (error) {
      console.error('Error al cambiar el estado del usuario:', error);
    }
  };

export const handleActiveReview = async (reviewId, isActive) => {
    try {
      await handleActive('Reviews', reviewId, isActive);
    } catch (error) {
      console.error('Error al cambiar el estado de la revisión:', error);
    }
  };


  // const handleToggleAdminStatus = async () => {
  //   if (selectedUser) {
  //     try {
  //       await axios.put(`/api/users/${selectedUser.id}`, {
  //         isAdmin: !selectedUser.isAdmin,
  //       });

       
  //       const updatedUsers = users.map((user) =>
  //         user.id === selectedUser.id
  //           ? { ...user, isAdmin: !user.isAdmin }
  //           : user
  //       );
  //       setUsers(updatedUsers);

  //       setSelectedUser({ ...selectedUser, isAdmin: !selectedUser.isAdmin });
  //       setIsAdmin(!isAdmin);
  //     } catch (error) {
  //       console.error('Error al cambiar el estado de admin del usuario:', error);
  //     }
  //   }
  // };