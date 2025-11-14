import '../styles/CategoryTabs.scss';

function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-tabs">
      <div className="tabs-container">
        {categories.map(category => (
          <button
            key={category.id}
            className={`tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryTabs;
