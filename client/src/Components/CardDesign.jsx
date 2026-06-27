import React from "react";
import makhana from "../assets/makhana.jpg";
import lotus from "../assets/lotus.jpg";
import singhada from "../assets/singhada.jpg";

const products = [
  {
    name: "Makhana (Black Diamond)",
    description: "Nutrient-rich superfood traditionally grown in Bihar's Mithilanchal region.",
    img: makhana,
  },
  {
    name: "Lotus (Sacred Bloom)",
    description: "Known for its beauty and utility—used in Ayurveda, worship, and food.",
    img: lotus,
  },
  {
    name: "Singhada (Water Chestnut)",
    description: "Crunchy aquatic fruit harvested in winter. Eaten fresh or dried.",
    img: singhada,
  },
];

const ProductCards = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Core Products</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-md h-80 bg-white"
            >
              {/* Image container */}
              <div className="absolute inset-0 z-10 transition-transform duration-700 group-hover:-translate-y-full">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Title over image initially */}
                <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center p-2">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                </div>
              </div>

              {/* Content appears after image slides out */}
              <div className="absolute bottom-[-250px] group-hover:bottom-10 z-20 bg-white  transition-bottom duration-700 flex flex-col justify-center items-center p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-700">{product.description}</p>
                <button className="mt-4 text-blue-600 text-sm font-medium hover:underline">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
