// const CategoryList = () => {
//   const filterCategory = useSelector((state) => state.categories.filterCategory);
//   const categories = useSelector((state) => state.categories.categories);

//   const selectedCategory = categories.find((category) => category.id === filterCategory);

//   return (
//     <div>
//       <h3>List of Categories</h3>
//       {selectedCategory && (
//         <div>
//           <h4>{selectedCategory.name}</h4>
//           <ul>
//             {selectedCategory.subcategories.map((subcategory) => (
//               <li key={subcategory.id}>{subcategory.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CategoryList;