// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../app/slices/cartSlice";
// import { useNavigate } from "react-router-dom";
// import Cart from "../component/Cart";
// import { apiEndpoint } from "../api";
// import RecommendedCards from "../component/RecommendedCards";
// import BenefitsBox from "../component/BenefitsBox";
// import OffersBox from "../component/OffersBox";

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

//         {/* Responsive Boxes Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 mb-8 mx-4">
//           <RecommendedCards />
//           <BenefitsBox />
//           <OffersBox />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from "react";
// import your data-fetching logic and Redux as needed

const cards = [
  {
    title: "Platinum Card",
    last4: "**** 1234",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXM07Kqa8gwdhgaumLbz-SvsIUN0gS8hokUot8q9d2Al4C1OJOF2IG9hCeW-uJfAWDAK5f4FDwUqH098-4sCFnUc2NTUt0tTZrT_-tmlt05fEGZhWfF3bzc17dRgavQ1YXvgG_T4DcQp0a0PW5tl5r-xmCGqw_elwLOxgW9elD1mDgE6MBr7xtvLpzKzd6KyQK6yy6ss6PUNeXsCIRdQSZyFJFt3m01RERcrP4CfYU9Gz-fNH5x5qfNGjRKvVe9JQF0fwST5DeEQ"
  },
  {
    title: "Gold Card",
    last4: "**** 5678",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2fMTiprw_U7SiNhwU_czwS8RwvfXFD2ZGnyLC8FcDYsOdb5o3sxPOsMEpGHYODkMtgAXgRhZ2LAFDLs_fs-moiRF_113MzPRUQgA3KKwW6Rj0fC6tY4c6P13ogDxRIBqEa2S_lIA5lkBlDL5TE3pPtuh7GUEwmh6zK1BcO8jeOcemcGlX84gE1xV_E_VvjU97hc0P1jOkuQzRKyh3p2XND9v4rk395KIpTbwnwf3EkboMEPayzTTOvkwwqCoLoGL91HTMpb6xEw"
  }
];

const recommended = [
  {
    title: "Travel Rewards Card",
    desc: "Earn points on every purchase",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_v4zL_HRiYkMTyDTKATG6rNhcqshxEieRXmNlCPgkChqHQh9r46tOVuK0HC9_Ms3pv14aK4-AcrN7uQsTDNGy-qOrUxs3HVh6eifiWV-LsNxABcTmG_yv4H_AsS-mWceNMjPCvIqUpZRssQ0QXYeu42RRZsxasIKIJP--C1nky9QLLkmpjSRVzkrUQIyISK64kqXGogVjUkSSB97j2dhrK0MATv6fZ0j3_ulX1FqSDCaBOQrKFAvhsIouKDaYKnZqrmS20q0vzg"
  },
  {
    title: "Cash Back Card",
    desc: "Get cash back on everyday spending",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAloUYDZlRh3fhnbyd1xl_Uc4T000V_dfaAWckk6h02wGd-iPxdVKV0jIaPAorPHV1i9KDJCiBxIRE70QeduXG_mr2r5maced5Ek1L8jCSAyNTJybcx2IXexXI4dVt4xq7L9hNSTCc12g9Nyc_ZRBKoZrh4omgRZvW9N2qRraG-mHgRK5uaeVbVNFw0wIVwoj6QMynn5Bp6fv2_o8GcTGbnqpCmZmSCpKbo7MdIOC_VMnVb_navI05lSoR0IV2n0mOGnQZEZdUg2g"
  }
];

const benefits = [
  {
    icon: (
      <svg width="24" height="24" fill="currentColor"><path d="M235.58,128.84,160,91.06V48a32,32,0,0,0-64,0V91.06L20.42,128.84A8,8,0,0,0,16,136v32a8,8,0,0,0,9.57,7.84L96,161.76v18.93L82.34,194.34A8,8,0,0,0,80,200v32a8,8,0,0,0,11,7.43l37-14.81,37,14.81A8,8,0,0,0,176,232V200a8,8,0,0,0-2.34-5.66L160,180.69V161.76l70.43,14.08A8,8,0,0,0,240,168V136A8,8,0,0,0,235.58,128.84ZM224,158.24l-70.43-14.08A8,8,0,0,0,144,152v32a8,8,0,0,0,2.34,5.66L160,203.31v16.87l-29-11.61a8,8,0,0,0-5.94,0L96,220.18V203.31l13.66-13.65A8,8,0,0,0,112,184V152a8,8,0,0,0-9.57-7.84L32,158.24v-17.3l75.58-37.78A8,8,0,0,0,112,96V48a16,16,0,0,1,32,0V96a8,8,0,0,0,4.42,7.16L224,140.94Z"/></svg>
    ),
    title: "Travel Benefits",
    desc: "Enjoy exclusive travel perks and discounts."
  },
  {
    icon: (
      <svg width="24" height="24" fill="currentColor"><path d="M72,88V40a8,8,0,0,1,16,0V88a8,8,0,0,1-16,0ZM216,40V224a8,8,0,0,1-16,0V176H152a8,8,0,0,1-8-8,268.75,268.75,0,0,1,7.22-56.88c9.78-40.49,28.32-67.63,53.63-78.47A8,8,0,0,1,216,40ZM200,53.9c-32.17,24.57-38.47,84.42-39.7,106.1H200ZM119.89,38.69a8,8,0,1,0-15.78,2.63L112,88.63a32,32,0,0,1-64,0l7.88-47.31a8,8,0,1,0-15.78-2.63l-8,48A8.17,8.17,0,0,0,32,88a48.07,48.07,0,0,0,40,47.32V224a8,8,0,0,0,16,0V135.32A48.07,48.07,0,0,0,128,88a8.17,8.17,0,0,0-.11-1.31Z"/></svg>
    ),
    title: "Dining Rewards",
    desc: "Earn rewards on dining and entertainment."
  }
];

const offers = [
  {
    icon: (
      <svg width="24" height="24" fill="currentColor"><path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z"/></svg>
    ),
    title: "Shopping Discount",
    desc: "Get 10% off on your next purchase."
  }
];

const Home = () => (
  <div className="relative min-h-screen flex flex-col bg-[#111518] font-sans text-white">
    {/* Header */}
    <div className="flex items-center bg-[#111518] p-4 pb-2 justify-between">
      <div className="text-white flex size-12 items-center">
        {/* Hamburger Icon */}
        <svg width="24" height="24" fill="currentColor"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"/></svg>
      </div>
    </div>
    {/* Your Cards */}
    <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Your Cards</h2>
    <div className="flex overflow-x-auto px-4 gap-3">
      {cards.map((card, i) => (
        <div key={i} className="flex flex-col gap-4 rounded-lg min-w-60 bg-[#1b2127]">
          <div
            className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-xl"
            style={{ backgroundImage: `url('${card.img}')` }}
          ></div>
          <div>
            <p className="text-base font-medium">{card.title}</p>
            <p className="text-[#9cabba] text-sm">{card.last4}</p>
          </div>
        </div>
      ))}
    </div>
    {/* Recommended Cards */}
    <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Recommended Cards</h2>
    <div className="flex overflow-x-auto px-4 gap-3">
      {recommended.map((card, i) => (
        <div key={i} className="flex flex-col gap-4 rounded-lg min-w-60 bg-[#1b2127]">
          <div
            className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-xl"
            style={{ backgroundImage: `url('${card.img}')` }}
          ></div>
          <div>
            <p className="text-base font-medium">{card.title}</p>
            <p className="text-[#9cabba] text-sm">{card.desc}</p>
          </div>
        </div>
      ))}
    </div>
    {/* Benefits */}
    <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Benefits</h2>
    <div className="flex flex-col gap-2 px-4">
      {benefits.map((b, i) => (
        <div key={i} className="flex items-center gap-4 bg-[#111518] px-4 min-h-[72px] py-2 rounded-lg">
          <div className="flex items-center justify-center rounded-lg bg-[#283139] size-12">{b.icon}</div>
          <div className="flex flex-col justify-center">
            <p className="text-base font-medium">{b.title}</p>
            <p className="text-[#9cabba] text-sm">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
    {/* Offers */}
    <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Offers</h2>
    <div className="flex flex-col gap-2 px-4 pb-24">
      {offers.map((o, i) => (
        <div key={i} className="flex items-center gap-4 bg-[#111518] px-4 min-h-[72px] py-2 rounded-lg">
          <div className="flex items-center justify-center rounded-lg bg-[#283139] size-12">{o.icon}</div>
          <div className="flex flex-col justify-center">
            <p className="text-base font-medium">{o.title}</p>
            <p className="text-[#9cabba] text-sm">{o.desc}</p>
          </div>
        </div>
      ))}
    </div>
    {/* Bottom Navigation */}
    <div className="fixed bottom-0 left-0 w-full border-t border-[#283139] bg-[#1b2127] flex justify-around py-2">
      {/* Example icons - replace with your navigation logic */}
      <div className="flex flex-col items-center text-[#9cabba]">
        <svg width="24" height="24" fill="currentColor"><path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"/></svg>
        <span className="text-xs font-medium">Home</span>
      </div>
      <div className="flex flex-col items-center text-white">
        <svg width="24" height="24" fill="currentColor"><path d="M224,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM136,176H120a8,8,0,0,1,0-16h16a8,8,0,0,1,0,16Zm64,0H168a8,8,0,0,1,0-16h32a8,8,0,0,1,0,16ZM32,88V64H224V88Z"/></svg>
        <span className="text-xs font-medium">Cards</span>
      </div>
      <div className="flex flex-col items-center text-[#9cabba]">
        <svg width="24" height="24" fill="currentColor"><path d="M72,104a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,104Zm8,40h96a8,8,0,0,0,0-16H80a8,8,0,0,0,0,16ZM232,56V208a8,8,0,0,1-11.58,7.15L192,200.94l-28.42,14.21a8,8,0,0,1-7.16,0L128,200.94,99.58,215.15a8,8,0,0,1-7.16,0L64,200.94,35.58,215.15A8,8,0,0,1,24,208V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V195.06l20.42-10.22a8,8,0,0,1,7.16,0L96,199.06l28.42-14.22a8,8,0,0,1,7.16,0L160,199.06l28.42-14.22a8,8,0,0,1,7.16,0L216,195.06Z"/></svg>
        <span className="text-xs font-medium">Transactions</span>
      </div>
      <div className="flex flex-col items-center text-[#9cabba]">
        <svg width="24" height="24" fill="currentColor"><path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"/></svg>
        <span className="text-xs font-medium">Account</span>
      </div>
      <div className="flex flex-col items-center text-[#9cabba]">
        <svg width="24" height="24" fill="currentColor"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"/></svg>
        <span className="text-xs font-medium">Settings</span>
      </div>
    </div>
  </div>
);

export default Home;
