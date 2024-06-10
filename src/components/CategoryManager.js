import React, { useState } from 'react';

const CategoryManager = ({ categories, setCategories }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const handleCategoryChange = (e) => {
    const category = categories.find((cat) => cat.name === e.target.value);
    setSelectedCategory(category);
    setNewCategory(category ? category.name : '');
    setNewAmount(category ? category.amount : '');
  };

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map((cat) =>
      cat.name === selectedCategory.name
        ? { ...cat, name: newCategory, amount: parseFloat(newAmount) }
        : cat
    );
    setCategories(updatedCategories);
    setSelectedCategory('');
    setNewCategory('');
    setNewAmount('');
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <select value={selectedCategory.name || ''} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="New Category Name"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="New Amount"
        value={newAmount}
        onChange={(e) => setNewAmount(e.target.value)}
      />
      <button onClick={handleUpdateCategory}>Update Category</button>
    </div>
  );
};

export default CategoryManager;
