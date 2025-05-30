// import React, { useState,useEffect  } from "react";
// import Dropdown from "../component/Drpdown";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { addToCart, removeFromCart } from "../app/slices/cartSlice";
// import { apiEndpoint } from "../api";
// import { setBankList } from "../app/slices/bankSlice";


// const ManageCards = () => {
//   const [selectedBank, setSelectedBank] = useState("Select Bank");
//   const [bankCards, setBankCards] = useState([]);
//   const [selectedCards, setSelectedCards] = useState({});
//   const token = localStorage.getItem("token");
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.cart);
//   const bankList = useSelector((state) => state.bank.bankList); 

//   const bankOptions = [
//     { label: "Select Bank", value: "Bank" },
//     ...bankList.map((bank) => ({
//       label: `${bank} Bank`,
//       value: bank,
//     })),
//   ];

//   useEffect(() => {
//     const fetchBanks = async () => {
//       try {
//         const response = await axios.get(`${apiEndpoint}/api/v1/card/all_bank`);
//         const banks = response.data?.banks || [];
//         dispatch(setBankList(banks));
//       } catch (err) {
//         console.error("Error fetching bank list:", err.response?.data || err);
//       }
//     };

//     fetchBanks();
//   }, [dispatch]);

//   const fetchBankCards = async (bank) => {
//     try {
      
//       const { data } = await axios.post(`${apiEndpoint}/api/v1/card/your_recomendation`, {
//         bank_name: bank,
//       });
//       setBankCards(data?.cards || []);
//     } catch (err) {
//       console.error("Error fetching cards:", err.response?.data || err);
//       setBankCards([]);
//     }
//   };

//   const handleBankChange = (e) => {
//     const bank = e.target.value;
//     // console.log(bank);
//     setSelectedBank(bank);
//     if (bank !== "Bank") fetchBankCards(bank);
//   };

//   const toggleCardSelection = (card) => {
//     setSelectedCards((prev) => {
//       const updated = { ...prev };
//       if (updated[card._id]) delete updated[card._id];
//       else updated[card._id] = card;
//       return updated;
//     });
//   };

//   const handleAddToCart = async () => {
//     const cards = Object.values(selectedCards);
//     const cardIds = cards.map((card) => card._id);
//     console.log("this is cart ", cards);

//     try {
//       const response =  await axios.post(
//         `${apiEndpoint}/api/v1/auth/addcard`,
//         { productIds: cardIds },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       console.log("This is the response:",response)
//       if(response.status==200){
//         dispatch(addToCart(cards));
//       }
//       // setSelectedCards({});
//     } catch (error) {
//       console.log("Error adding to cart:", error);
//     }
//   };

//   const handleRemoveCard = async (cardId) => {
//     try {
//       await axios.post(
//         `${apiEndpoint}/api/v1/auth/removeCardFromCart`,
//         { cardId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       dispatch(removeFromCart(cardId));
//     } catch (error) {
//       console.error("Error removing card:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center p-4 bg-gray-50">

//       {/* CART SECTION */}
//       <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-2 max-h-[400px] mb-6 overflow-y-auto">
//         <h2 className="text-2xl font-bold text-center text-gray-900 mb-1">Cards in you wallet</h2>
//         {cart.length === 0 ? (
//           <p className="text-center text-gray-600 text-lg">No cards in your wallet</p>
//         ) : (
//           <div className="overflow-y-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 max-h-[340px]">
//             {cart.map((card) => (
//               <div
//                 key={card._id}
//                 className="bg-white rounded-lg shadow p-4 flex flex-col items-center"
//               >
//                 {/* Responsive fixed-size image container */}
//                 <div className="w-full h-40 sm:h-48 md:h-40 lg:h-48 flex justify-center items-center overflow-hidden">
//                   <img
//                     src={card.image_url || "https://via.placeholder.com/150"}
//                     alt={card.card_name}
//                     className="h-full object-contain"
//                   />
//                 </div>
//                 <h3 className="mt-2 text-center font-semibold">{card.card_name}</h3>
//                 <button
//                   onClick={() => handleRemoveCard(card._id)}
//                   className="mt-3 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* DROPDOWN + BANK CARDS SECTION */}
//       <div className="w-full max-w-5xl flex flex-col gap-6 bg-white rounded-lg shadow-lg p-6">
//         <div className="flex flex-col md:flex-row gap-6">

//           {/* LEFT: Dropdown */}
//           <div className="flex-1 bg-gray-100 border border-gray-200 rounded-lg p-4 flex flex-col items-center">
//             <Dropdown
//               label="Select issuer bank"
//               options={bankOptions}
//               value={selectedBank}
//               onChange={handleBankChange}
//               className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition"
//             />
//             <p className="mt-2 text-sm text-center text-gray-600">
//               You have selected: <span className="font-semibold text-blue-600">{selectedBank}</span>
//             </p>
//           </div>

//           {/* RIGHT: Cards from bank */}
//           <div className="flex-1 bg-gray-100 border border-gray-200 rounded-lg p-4 overflow-y-auto max-h-[400px]">
//             {bankCards.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {bankCards.map((card) => (
//                   <label
//                     key={card._id}
//                     className="flex items-center p-2 hover:bg-gray-200 rounded transition"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={!!selectedCards[card._id]}
//                       onChange={() => toggleCardSelection(card)}
//                       className="mr-3"
//                     />
//                     <span>{card.card_name}</span>
//                   </label>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-center text-gray-500">No cards available.</p>
//             )}
//           </div>
//         </div>

//         {/* Add to Cart Button */}
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={handleAddToCart}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//           >
//             Add to my card wallet
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageCards;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../app/slices/cartSlice";
import { apiEndpoint } from "../api";
import { setBankList } from "../app/slices/bankSlice";

const ManageCards = () => {
  const [selectedBank, setSelectedBank] = useState("Select Bank");
  const [bankCards, setBankCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState({});
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const bankList = useSelector((state) => state.bank.bankList);

  // ... keep existing useEffect and data fetching logic ...

  return (
    <div className="relative flex min-h-screen flex-col bg-[#111518] text-white font-sans justify-between">
      {/* Header */}
      <div className="flex items-center bg-[#111518] p-4 pb-2 justify-between">
        <button className="text-white flex size-12 shrink-0 items-center">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
          </svg>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Payment Methods
        </h2>
      </div>

      {/* Card List */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Your Cards</h2>
        
        {cart.length === 0 ? (
          <p className="text-center text-[#9cabba] px-4">No cards in your wallet</p>
        ) : (
          cart.map((card) => (
            <div
              key={card._id}
              className="flex items-center gap-4 bg-[#111518] px-4 min-h-[72px] py-2 justify-between border-t border-[#283139]"
            >
              <div className="flex items-center gap-4">
                <div
                  className="bg-center bg-no-repeat aspect-video bg-contain h-6 w-10 shrink-0"
                  style={{ backgroundImage: `url(${card.image_url})` }}
                ></div>
                <div className="flex flex-col justify-center">
                  <p className="text-base font-medium line-clamp-1">{card.card_name}</p>
                  <p className="text-[#9cabba] text-sm line-clamp-2">
                    **** {card.last4 || "1234"}
                  </p>
                </div>
              </div>
              <button 
                // onClick={() => handleRemoveCard(card._id)}
                className="shrink-0 text-[#9cabba]"
              >
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-[#111518] border-t border-[#283139]">
        <div className="flex flex-col gap-3 px-4 py-3">
          <button
            // onClick={handleAddToCart}
            className="h-12 px-5 bg-[#0b80ee] text-white font-bold rounded-full hover:bg-[#0066cc] transition-colors"
          >
            Add Card
          </button>
          <button
            className="h-12 px-5 bg-[#283139] text-white font-bold rounded-full hover:bg-[#1a1f24] transition-colors"
          >
            Remove Card
          </button>
        </div>
        <div className="h-5 bg-[#111518]" />
      </div>
    </div>
  );
};

export default ManageCards;
