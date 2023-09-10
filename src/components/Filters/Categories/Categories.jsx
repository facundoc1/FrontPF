const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(axiosCategories());
  }, [dispatch]);

  const renderSubcategories = (subcategories) => {
    if (!subcategories || subcategories.length === 0) {
      return null;
    }

    return (
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory.id}>{subcategory.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h3>List of Categories</h3>
      {categories ? (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              {category.name}
              {renderSubcategories(category.subcategories)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay categorías disponibles.</p>
      )}
    </div>
  );
};
