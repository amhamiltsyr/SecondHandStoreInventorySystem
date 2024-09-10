// src/components/Marketplace.tsx
import React from "react";

const Marketplace: React.FC = () => {
  // Replace with your data or fetch from API
  const items = [
    {
      id: 1,
      title: "Item 1",
      description: "Description 1",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Item 2",
      description: "Description 2",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Item 3",
      description: "Description 3",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="row">
      {items.map((item) => (
        <div key={item.id} className="col-md-4">
          <div className="card mb-4">
            <img
              src={item.imageUrl}
              className="card-img-top"
              alt={item.title}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.description}</p>
              <a href="#" className="btn btn-primary">
                View Item
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Marketplace;
