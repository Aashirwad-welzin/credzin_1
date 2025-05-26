// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../app/slices/cartSlice";
// import { useNavigate } from "react-router-dom";
// import Cart from "../component/Cart";
// import { apiEndpoint } from "../api";
// import { useSelector } from 'react-redux';
// import { setRecommendedList } from "../app/slices/recommendedSlice";
// const Home = ({ isManageCardsVisible, setIsManageCardsVisible }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const options = [
//     { label: "Select Bank", value: "Bank" },
//     { label: "Axis Bank", value: "Axis Bank" },
//     { label: "SBI Bank", value: "SBI Bank" },
//     { label: "HDFC Bank", value: "HDFC Bank" },
//   ];

//   const [value, setValue] = useState(options[0].value);
//   const [bankCard, setBankCard] = useState([]);
//   const [checkedItems, setCheckedItems] = useState({});

//   useEffect(() => {
//     const fetchSelectedCards = async () => {
//       try {
//         const response = await axios.get(`${apiEndpoint}/api/v1/auth/selectedcards`, {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });
//         const selectedCards = response.data?.selectedCards || [];
//         const checkedItemsMap = {};
//         selectedCards.forEach((card) => {
//           checkedItemsMap[card._id] = card;
//         });
//         setCheckedItems(checkedItemsMap);
//       } catch (error) {
//         console.error("Error fetching selected cards:", error);
//       }
//     };

//     fetchSelectedCards();
//   }, [token]);

//   const handleChange = async (event) => {
//     const selectedBank = event.target.value;
//     setValue(selectedBank);

//     try {
//       const response = await axios.post(`${apiEndpoint}/api/v1/card/your_recomendation`, {
//         bank_name: selectedBank,
//       });
//       const cards = response.data?.cards || [];
//       setBankCard(cards);
//     } catch (err) {
//       console.error("Error fetching data:", err.response?.data || err);
//       setBankCard([]);
//     }
//   };

//   const handleCheckboxChange = async (card) => {
//     setCheckedItems((prevCheckedItems) => {
//       const newCheckedItems = { ...prevCheckedItems };
//       if (newCheckedItems[card._id]) {
//         delete newCheckedItems[card._id];
//       } else {
//         newCheckedItems[card._id] = card;
//       }
//       return newCheckedItems;
//     });

//     try {
//       await axios.post(
//         `${apiEndpoint}/api/v1/auth/updateSelectedCards`,
//         { selectedCards: Object.values(checkedItems) },
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Error updating selected cards:", error);
//     }
//   };

//   const handleAddToCart = async () => {
//     const selectedCards = Object.values(checkedItems);
//     const selectedCardIds = selectedCards.map((card) => card._id);
//     try {
//       const response = await axios.post(
//         `${apiEndpoint}/api/v1/auth/addcard`,
//         { productIds: selectedCardIds },
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         dispatch(addToCart(selectedCards));
//         setIsManageCardsVisible(false); // Hide the Manage Cards section
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 flex items-center justify-center p-0 sm:p-0 md:p-0">
//       <div className="w-full h-full bg-white rounded-none shadow-lg p-0 sm:p-0 md:p-0 transform transition-all duration-300 hover:shadow-xl relative">
//         {/* Buttons and Cart Section */}
//         <div className="flex flex-col items-center space-y-6 mt-6">
//           <div className="w-full">
//             <Cart />
//           </div>
//           <div className="flex justify-center gap-14 w-full">
//             <button
//               onClick={() => navigate("/paybill")}
//               className="w-40 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 font-semibold"
//             >
//               Pay Bill
//             </button>
//             <button
//               onClick={() => navigate("/shop")}
//               className="w-40 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 font-semibold"
//             >
//               Shop
//             </button>
//           </div>
//         </div>

//         {/* Additional Boxes Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 mb-8 mx-4">
//           {/* Recommended Cards Box */}
//           <div className="mx-4 mb-8">
//           <h3 className="text-xl font-semibold mb-2 text-indigo-700">Your Recommended Cards</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {useSelector(state => state.recommend.recommendedList).map((card) => (
//               <div key={card._id} className="bg-white border shadow p-4 rounded-lg">
//                 <h4 className="font-semibold text-lg">{card.card_name}</h4>
//                   <p className="text-gray-600 text-sm mt-1">{card.suggestion}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Benefits Box */}
//           <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-md">
//             <h3 className="text-lg font-semibold text-green-800 mb-2">Benefits</h3>
//             <p className="text-sm text-gray-600">
//               Discover the exclusive benefits and rewards of your selected cards.
//             </p>
//           </div>

//           {/* Offers Box */}
//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-md">
//             <h3 className="text-lg font-semibold text-yellow-800 mb-2">Offers</h3>
//             <p className="text-sm text-gray-600">
//               Check out the latest offers and discounts available for your cards.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../app/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Cart from "../component/Cart";
import { apiEndpoint } from "../api";
import RecommendedCards from "../component/RecommendedCards";
import BenefitsBox from "../component/BenefitsBox";
import OffersBox from "../component/OffersBox";

const Home = ({ isManageCardsVisible, setIsManageCardsVisible }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const options = [
    { label: "Select Bank", value: "Bank" },
    { label: "Axis Bank", value: "Axis Bank" },
    { label: "SBI Bank", value: "SBI Bank" },
    { label: "HDFC Bank", value: "HDFC Bank" },
  ];

  const [value, setValue] = useState(options[0].value);
  const [bankCard, setBankCard] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const fetchSelectedCards = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/api/v1/auth/selectedcards`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const selectedCards = response.data?.selectedCards || [];
        const checkedItemsMap = {};
        selectedCards.forEach((card) => {
          checkedItemsMap[card._id] = card;
        });
        setCheckedItems(checkedItemsMap);
      } catch (error) {
        console.error("Error fetching selected cards:", error);
      }
    };

    fetchSelectedCards();
  }, [token]);

  const handleChange = async (event) => {
    const selectedBank = event.target.value;
    setValue(selectedBank);

    try {
      const response = await axios.post(`${apiEndpoint}/api/v1/card/your_recomendation`, {
        bank_name: selectedBank,
      });
      const cards = response.data?.cards || [];
      setBankCard(cards);
    } catch (err) {
      console.error("Error fetching data:", err.response?.data || err);
      setBankCard([]);
    }
  };

  const handleCheckboxChange = async (card) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems };
      if (newCheckedItems[card._id]) {
        delete newCheckedItems[card._id];
      } else {
        newCheckedItems[card._id] = card;
      }
      return newCheckedItems;
    });

    try {
      await axios.post(
        `${apiEndpoint}/api/v1/auth/updateSelectedCards`,
        { selectedCards: Object.values(checkedItems) },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating selected cards:", error);
    }
  };

  const handleAddToCart = async () => {
    const selectedCards = Object.values(checkedItems);
    const selectedCardIds = selectedCards.map((card) => card._id);
    try {
      const response = await axios.post(
        `${apiEndpoint}/api/v1/auth/addcard`,
        { productIds: selectedCardIds },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(addToCart(selectedCards));
        setIsManageCardsVisible(false); // Hide the Manage Cards section
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 flex items-center justify-center p-0 sm:p-0 md:p-0">
      <div className="w-full h-full bg-white rounded-none shadow-lg p-0 sm:p-0 md:p-0 transform transition-all duration-300 hover:shadow-xl relative">
        {/* Buttons and Cart Section */}
        <div className="flex flex-col items-center space-y-6 mt-6">
          <div className="w-full">
            <Cart />
          </div>
          <div className="flex justify-center gap-14 w-full">
            <button
              onClick={() => navigate("/paybill")}
              className="w-40 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 font-semibold"
            >
              Pay Bill
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="w-40 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300 font-semibold"
            >
              Shop
            </button>
          </div>
        </div>

        {/* Responsive Boxes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-8 mx-4">
          <RecommendedCards />
          <BenefitsBox />
          <OffersBox />
        </div>
      </div>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../app/slices/cartSlice";
// import { useNavigate } from "react-router-dom";
// import Cart from "../component/Cart";
// import { apiEndpoint } from "../api";
// import { setRecommendedList } from "../app/slices/recommendedSlice";

// const Home = ({ isManageCardsVisible, setIsManageCardsVisible }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const recommendedCards = useSelector(state => state.recommend.recommendedList || []); // Ensure fallback to empty array

//   const options = [
//     { label: "Select Bank", value: "Bank" },
//     { label: "Axis Bank", value: "Axis Bank" },
//     { label: "SBI Bank", value: "SBI Bank" },
//     { label: "HDFC Bank", value: "HDFC Bank" },
//   ];

//   const [value, setValue] = useState(options[0].value);
//   const [bankCard, setBankCard] = useState([]);
//   const [checkedItems, setCheckedItems] = useState({});

//   useEffect(() => {
//     const fetchSelectedCards = async () => {
//       try {
//         const response = await axios.get(`${apiEndpoint}/api/v1/auth/selectedcards`, {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         });
//         const selectedCards = response.data?.selectedCards || [];
//         const checkedItemsMap = {};
//         selectedCards.forEach((card) => {
//           checkedItemsMap[card._id] = card;
//         });
//         setCheckedItems(checkedItemsMap);
//       } catch (error) {
//         console.error("Error fetching selected cards:", error);
//       }
//     };

//     fetchSelectedCards();
//   }, [token]);

//   const handleChange = async (event) => {
//     const selectedBank = event.target.value;
//     setValue(selectedBank);

//     try {
//       const response = await axios.post(`${apiEndpoint}/api/v1/card/your_recomendation`, {
//         bank_name: selectedBank,
//       });
//       const cards = response.data?.cards || [];
//       setBankCard(cards);
//     } catch (err) {
//       console.error("Error fetching data:", err.response?.data || err);
//       setBankCard([]);
//     }
//   };

//   const handleCheckboxChange = async (card) => {
//     setCheckedItems((prevCheckedItems) => {
//       const newCheckedItems = { ...prevCheckedItems };
//       if (newCheckedItems[card._id]) {
//         delete newCheckedItems[card._id];
//       } else {
//         newCheckedItems[card._id] = card;
//       }
//       return newCheckedItems;
//     });

//     try {
//       await axios.post(
//         `${apiEndpoint}/api/v1/auth/updateSelectedCards`,
//         { selectedCards: Object.values(checkedItems) },
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Error updating selected cards:", error);
//     }
//   };

//   const handleAddToCart = async () => {
//     const selectedCards = Object.values(checkedItems);
//     const selectedCardIds = selectedCards.map((card) => card._id);
//     try {
//       const response = await axios.post(
//         `${apiEndpoint}/api/v1/auth/addcard`,
//         { productIds: selectedCardIds },
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         dispatch(addToCart(selectedCards));
//         setIsManageCardsVisible(false);
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-gray-50 to-blue-200 flex items-center justify-center p-4 sm:p-6 md:p-8">
//       <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 transform transition-all duration-300">
//         {/* Buttons and Cart Section */}
//         <div className="flex flex-col items-center space-y-6 mt-4">
//           <div className="w-full max-w-3xl">
//             <Cart />
//           </div>
//           <div className="flex justify-center gap-6 sm:gap-8 w-full">
//             <button
//               onClick={() => navigate("/paybill")}
//               className="w-40 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 font-semibold text-sm sm:text-base"
//             >
//               Pay Bill
//             </button>
//             <button
//               onClick={() => navigate("/shop")}
//               className="w-40 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:ring-4 focus:ring-blue-400 focus:ring-opacity-50 transition-all duration-300 font-semibold text-sm sm:text-base"
//             >
//               Shop
//             </button>
//           </div>
//         </div>

//         {/* Additional Boxes Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 mb-8 mx-4">
//           {/* Recommended Cards Box */}
//           <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <h3 className="text-xl sm:text-2xl font-bold text-indigo-800 mb-4">Your Recommended Cards</h3>
//             {recommendedCards.length > 0 ? (
//               <div className="flex overflow-x-auto space-x-4 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-50">
//                 {recommendedCards.map((card) => (
//                   <div
//                     key={card._id}
//                     className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 min-w-[250px] max-w-[300px] snap-center"
//                   >
//                     <h4 className="font-semibold text-lg text-indigo-800">{card.card_name}</h4>
//                     <p className="text-gray-700 text-sm mt-1 line-clamp-3">{card.suggestion}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500 text-sm italic">No recommended cards available. Select a bank to see recommendations.</p>
//             )}
//           </div>

//           {/* Benefits Box */}
//           <div className="bg-green-50 border border-green-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start">
//             <div className="flex items-center mb-3">
//               <svg className="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//               </svg>
//               <h3 className="text-lg font-bold text-green-800">Benefits</h3>
//             </div>
//             <p className="text-sm text-gray-700 leading-relaxed">
//               Discover exclusive benefits and rewards tailored for your selected cards.
//             </p>
//           </div>

//           {/* Offers Box */}
//           <div className="bg-yellow-50 border border-yellow-300 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start">
//             <div className="flex items-center mb-3">
//               <svg className="w-6 h-6 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12h-1m-2 0h-2m-4 0H3"></path>
//               </svg>
//               <h3 className="text-lg font-bold text-yellow-800">Offers</h3>
//             </div>
//             <p className="text-sm text-gray-700 leading-relaxed">
//               Explore the latest offers and discounts available for your cards.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
