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


import React, { useEffect } from "react";
import { Plane, Utensils, Tag } from 'lucide-react';  // Add this import
import { useState } from "react";
import axios from "axios"; 
import { apiEndpoint } from "../api";  // Adjust the import path as necessary
import { useDispatch } from "react-redux"; 
import { useSelector } from 'react-redux';
import{ useNavigate } from "react-router-dom";
import { addToCart } from "../app/slices/cartSlice";  // Adjust the import path as necessary
import BottomNavBar from "../component/BottomNavBar";



// const cards = [
//   {
//     title: "Platinum Card",
//     last4: "**** 1234",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXM07Kqa8gwdhgaumLbz-SvsIUN0gS8hokUot8q9d2Al4C1OJOF2IG9hCeW-uJfAWDAK5f4FDwUqH098-4sCFnUc2NTUt0tTZrT_-tmlt05fEGZhWfF3bzc17dRgavQ1YXvgG_T4DcQp0a0PW5tl5r-xmCGqw_elwLOxgW9elD1mDgE6MBr7xtvLpzKzd6KyQK6yy6ss6PUNeXsCIRdQSZyFJFt3m01RERcrP4CfYU9Gz-fNH5x5qfNGjRKvVe9JQF0fwST5DeEQ"
//   },
//   {
//     title: "Gold Card",
//     last4: "**** 5678",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2fMTiprw_U7SiNhwU_czwS8RwvfXFD2ZGnyLC8FcDYsOdb5o3sxPOsMEpGHYODkMtgAXgRhZ2LAFDLs_fs-moiRF_113MzPRUQgA3KKwW6Rj0fC6tY4c6P13ogDxRIBqEa2S_lIA5lkBlDL5TE3pPtuh7GUEwmh6zK1BcO8jeOcemcGlX84gE1xV_E_VvjU97hc0P1jOkuQzRKyh3p2XND9v4rk395KIpTbwnwf3EkboMEPayzTTOvkwwqCoLoGL91HTMpb6xEw"
//   }
// ];
// const token = localStorage.getItem("token");  
// useEffect(()=>{
//   const fetchRecommendation=async()=>{
//     try{
//       const response  = await axios.get(`${apiEndpoint}/api/v1/auth/login`,
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       )
//       console.log("this is response  from the recommendatio",response)
//     }catch(error){

//     }
//   }
// },[])

// const recommended = [
//   {
//     title: "Travel Rewards Card",
//     desc: "Earn points on every purchase",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_v4zL_HRiYkMTyDTKATG6rNhcqshxEieRXmNlCPgkChqHQh9r46tOVuK0HC9_Ms3pv14aK4-AcrN7uQsTDNGy-qOrUxs3HVh6eifiWV-LsNxABcTmG_yv4H_AsS-mWceNMjPCvIqUpZRssQ0QXYeu42RRZsxasIKIJP--C1nky9QLLkmpjSRVzkrUQIyISK64kqXGogVjUkSSB97j2dhrK0MATv6fZ0j3_ulX1FqSDCaBOQrKFAvhsIouKDaYKnZqrmS20q0vzg"
//   },
//   {
//     title: "Cash Back Card",
//     desc: "Get cash back on everyday spending",
//     img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAloUYDZlRh3fhnbyd1xl_Uc4T000V_dfaAWckk6h02wGd-iPxdVKV0jIaPAorPHV1i9KDJCiBxIRE70QeduXG_mr2r5maced5Ek1L8jCSAyNTJybcx2IXexXI4dVt4xq7L9hNSTCc12g9Nyc_ZRBKoZrh4omgRZvW9N2qRraG-mHgRK5uaeVbVNFw0wIVwoj6QMynn5Bp6fv2_o8GcTGbnqpCmZmSCpKbo7MdIOC_VMnVb_navI05lSoR0IV2n0mOGnQZEZdUg2g"
//   }
// ];

const benefits = [
  {
    icon: <Plane size={24} />,
    title: "Travel Benefits",
    desc: "Enjoy exclusive travel perks and discounts."
  },
  {
    icon: <Utensils size={24} />,
    title: "Dining Rewards",
    desc: "Earn rewards on dining and entertainment."
  }
];

const offers = [
  {
    icon: <Tag size={24} />,
    title: "Shopping Discount",
    desc: "Get 10% off on your next purchase."
  }
];



const Home = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const cards = useSelector((state) => state.cart.cart);
const[recommended,setRecommendation]=useState({})
console.log("Cards in Home:", cards);
const token = localStorage.getItem("token");  
useEffect(()=>{
  const fetchRecommendation=async()=>{
    try{
      const recommended  = await axios.get(`${apiEndpoint}/api/v1/card/recommendedcard`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log("this is response  from the recommendatio",recommended)
      setRecommendation(recommended.data.cards)
    }catch(error){

    }
  }
  fetchRecommendation();
},[token])
  
return (
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
    <div className="flex overflow-x-auto px-4 gap-3 scrollbar-hide">
      {cards.map((card, i) => (
        <div key={i} className="flex flex-col gap-4 rounded-lg min-w-60 bg-[#1b2127]">
          <div
            className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-xl">
            {/* // style={{ backgroundImage: `url('${card.img}')` }} */}
            <img
                src={card.image_url || "https://via.placeholder.com/150"}
                alt={card.card_name}
                className="w-full h-full object-contain"
            />
          </div>
          <div>
            <p className="text-base font-large">{card.card_name}</p>
            <p className="text-[#9cabba] text-sm">{card.last4}</p>
          </div>
        </div>
      ))}
    </div>
    {/* Recommended Cards */}
    <h2 className="text-[22px] font-bold px-4 pb-3 pt-5">Recommended Cards</h2>
    <div className="flex overflow-x-auto px-4 gap-3">
      {recommended && (
          <div className="flex flex-col gap-4 rounded-lg min-w-60 bg-[#1b2127]">
            <div
              className="w-full aspect-video bg-center bg-no-repeat bg-cover rounded-xl"
              // style={{ backgroundImage: `url('${recommended.img}')` }}
            >
               <img
                src={recommended.image_url || "https://via.placeholder.com/150"}
                alt={recommended.card_name}
                className="w-full h-full object-contain"
            />
            </div>
            <div>
              <p className="text-base font-medium">{recommended.card_name}</p>
              {/* <p className="text-[#9cabba] text-sm">{recommended.desc}</p> */}
            </div>
          </div>
        )}
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
    <BottomNavBar/>
  </div>
)
}

export default Home;
