// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// const ProfileField = ({ label, value }) => (
//   <div>
//     <span className="font-semibold">{label}:</span>{" "}
//     <span className="text-gray-700">{value}</span>
//   </div>
// );

// const ageOptions = ["18-24", "25-34", "35-44", "45-54", "55+"];
// const salaryOptions = ["0-10000", "10000-25000", "25000-50000", "50000-100000", "100000+"];
// const expenseOptions = ["0-5000", "5000-15000", "15000-30000", "30000+"];

// const UserProfile = () => {
//   const user = useSelector((state) => state.auth.user);
//   const cards = useSelector((state) => state.cart.cart);

//   const [editMode, setEditMode] = useState(false);
//   const [editUser, setEditUser] = useState({});
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     if (user) {
//         console.log("This is the reduz user: ",user);
//       setEditUser(user);
//     }
//   }, [user]);

//   const handleEdit = () => {
//     setEditUser(user);
//     setEditMode(true);
//   };

//   const handleChange = (e) => {
//     setEditUser({ ...editUser, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     // TODO: Replace with your PATCH/PUT API call and dispatch update
//     setTimeout(() => {
//       // Simulate successful save
//       setEditMode(false);
//       setSaving(false);
//     }, 1000);
//   };

//   const handleCancel = () => {
//     setEditMode(false);
//     setEditUser(user);
//   };

//   if (!user) return <div>Loading...</div>;

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">User Profile</h2>
//       <div className="space-y-4">
//         <ProfileField
//           label="First Name"
//           value={
//             editMode ? (
//               <input
//                 name="firstName"
//                 value={editUser.firstName || ""}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-full"
//               />
//             ) : (
//               user.firstName
//             )
//           }
//         />
//         <ProfileField
//           label="Last Name"
//           value={
//             editMode ? (
//               <input
//                 name="lastName"
//                 value={editUser.lastName || ""}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-full"
//               />
//             ) : (
//               user.lastName
//             )
//           }
//         />
//         <ProfileField
//           label="Email"
//           value={
//             editMode ? (
//               <input
//                 name="email"
//                 value={editUser.email || ""}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-full"
//               />
//             ) : (
//               user.email
//             )
//           }
//         />
//         <ProfileField
//           label="Contact"
//           value={
//             editMode ? (
//               <input
//                 name="contact"
//                 value={editUser.contact || ""}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-full"
//                 placeholder="Enter contact number"
//               />
//             ) : (
//               user.contact || <span className="text-gray-400">N/A</span>
//             )
//           }
//         />
//         <ProfileField
//           label="Age Range"
//           value={
//             editMode ? (
//               <select
//                 name="ageRange"
//                 value={editUser.ageRange || ""}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-full"
//               >
//                 <option value="">Select Age Range</option>
//                 {ageOptions.map((opt) => (
//                   <option key={opt} value={opt}>
//                     {opt}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               user.ageRange || <span className="text-gray-400">N/A</span>
//             )
//           }
//         />
//         <ProfileField
//           label="Salary Range"
//           value={
//             editMode ? (
//               <select
//                 name="salaryRange"
//                 value={editUser.salaryRange || ""}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-full"
//               >
//                 <option value="">Select Salary Range</option>
//                 {salaryOptions.map((opt) => (
//                   <option key={opt} value={opt}>
//                     {opt}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               user.salaryRange || <span className="text-gray-400">N/A</span>
//             )
//           }
//         />
//         <ProfileField
//           label="Expense Range"
//           value={
//             editMode ? (
//               <select
//                 name="expenseRange"
//                 value={editUser.expenseRange || ""}
//                 onChange={handleChange}
//                 className="border rounded px-2 py-1 w-full"
//               >
//                 <option value="">Select Expense Range</option>
//                 {expenseOptions.map((opt) => (
//                   <option key={opt} value={opt}>
//                     {opt}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               user.expenseRange || <span className="text-gray-400">N/A</span>
//             )
//           }
//         />
//         <ProfileField
//           label="Google ID"
//           value={user.googleId || <span className="text-gray-400">N/A</span>}
//         />
//         <ProfileField
//           label="Token"
//           value={
//             user.token
//               ? user.token.slice(0, 20) + "..."
//               : <span className="text-gray-400">N/A</span>
//           }
//         />

//         <div>
//           <span className="font-semibold">Credit Cards Added:</span>
//           {cards && cards.length > 0 ? (
//             <ul className="list-disc ml-6 mt-1">
//               {cards.map((card) => (
//                 <li key={card._id}>
//                   Bank: <span className="font-medium">{card.bank_name}</span>, Name:{" "}
//                   <span className="font-medium">{card.card_name}</span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <span className="ml-2 text-gray-400">None</span>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-end gap-4 mt-6">
//         {!editMode ? (
//           <button
//             onClick={handleEdit}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Edit
//           </button>
//         ) : (
//           <>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
//             >
//               {saving ? "Saving..." : "Save"}
//             </button>
//             <button
//               onClick={handleCancel}
//               disabled={saving}
//               className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, Phone, MapPin, CreditCard, Home, List, Upload } from 'lucide-react';
import BottomNavBar from "../component/BottomNavBar";

// Default avatar SVG as a data URL
const DEFAULT_AVATAR = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a2abb3'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.35 18.5C8.66 17.56 10.27 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5s-3.34-.56-4.65-1.5zm10.79-1.38C16.45 15.8 14.32 15 12 15s-4.45.8-6.14 2.12A7.96 7.96 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.85-.63 3.54-1.86 4.12zM12 6c-1.93 0-3.5 1.57-3.5 3.5S10.07 13 12 13s3.5-1.57 3.5-3.5S13.93 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z'/%3E%3C/svg%3E";

const UserProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cards = useSelector((state) => state.cart.cart);
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [saving, setSaving] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(DEFAULT_AVATAR);

  useEffect(() => {
    if (user) {
      setEditUser(user);
      setAvatarPreview(user.profilePic || DEFAULT_AVATAR);
    }
  }, [user]);

  // Cleanup function for object URLs
  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleEdit = () => {
    setEditUser(user);
    setEditMode(true);
  };

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }
      formData.append('userData', JSON.stringify(editUser));

      const response = await fetch('http://localhost:3000/api/profile', {
        method: 'PUT',
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      // TODO: Update Redux store with new user data
      
      setEditMode(false);
      setAvatarFile(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditUser(user);
    setAvatarPreview(user.profilePic || DEFAULT_AVATAR);
    setAvatarFile(null);
  };

  if (!user) return <div className="text-white">Loading...</div>;

  return (
    <div className="relative flex min-h-screen flex-col bg-[#121416] text-white font-['Manrope']">
      {/* Header */}
      <div className="flex items-center bg-[#121416] p-14 pb-6 justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="text-white flex size-12 shrink-0 items-center"
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
          </svg>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Profile
        </h2>
        {!editMode ? (
          <button
            onClick={handleEdit}
            className="text-white bg-[#2c3135] px-4 py-2 rounded-lg hover:bg-[#3c4145] transition-colors"
          >
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="text-white bg-[#2c3135] px-4 py-2 rounded-lg hover:bg-[#3c4145] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="text-[#a2abb3] bg-[#2c3135] px-4 py-2 rounded-lg hover:bg-[#3c4145] transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Header with Avatar */}
      <div className="flex p-4 @container">
        <div className="flex w-full flex-col gap-4 items-center">
          <div className="flex gap-4 flex-col items-center">
            <div className="relative">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 ring-2 ring-[#2c3135] ring-offset-2 ring-offset-[#121416]"
                style={{ 
                  backgroundImage: `url(${avatarPreview})`,
                  backgroundColor: '#2c3135'
                }}
              />
              {editMode && (
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute bottom-0 right-0 bg-[#2c3135] rounded-full p-2 cursor-pointer hover:bg-[#3c4145] transition-colors"
                >
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <Upload size={20} className="text-white" />
                </label>
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                {editUser.firstName} {editUser.lastName}
              </p>
              <p className="text-[#a2abb3] text-base font-normal leading-normal text-center">
                {editUser.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Section */}
      <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Account
      </h3>

      <div className="divide-y divide-[#2c3135]">
        {/* Personal Information */}
        <div className="flex items-center gap-4 bg-[#121416] px-4 min-h-[72px] py-2">
          <div className="text-white flex items-center justify-center rounded-lg bg-[#2c3135] shrink-0 size-12">
            <User size={24} />
          </div>
          <div className="flex flex-col justify-center flex-1">
            <p className="text-base font-medium line-clamp-1">Personal Information</p>
            {editMode ? (
              <input
                name="firstName"
                value={editUser.firstName || ""}
                onChange={handleChange}
                className="bg-[#2c3135] rounded px-2 py-1 w-full text-white mt-1"
                placeholder="Enter first name"
              />
            ) : (
              <p className="text-[#a2abb3] text-sm font-normal line-clamp-2">
                Manage your personal information
              </p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="flex items-center gap-4 bg-[#121416] px-4 min-h-[72px] py-2">
          <div className="text-white flex items-center justify-center rounded-lg bg-[#2c3135] shrink-0 size-12">
            <Phone size={24} />
          </div>
          <div className="flex flex-col justify-center flex-1">
            <p className="text-base font-medium line-clamp-1">Contact Information</p>
            {editMode ? (
              <input
                name="contact"
                value={editUser.contact || ""}
                onChange={handleChange}
                className="bg-[#2c3135] rounded px-2 py-1 w-full text-white mt-1"
                placeholder="Enter contact number"
              />
            ) : (
              <p className="text-[#a2abb3] text-sm font-normal line-clamp-2">
                {user.contact || "Add contact information"}
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center gap-4 bg-[#121416] px-4 min-h-[72px] py-2">
          <div className="text-white flex items-center justify-center rounded-lg bg-[#2c3135] shrink-0 size-12">
            <MapPin size={24} />
          </div>
          <div className="flex flex-col justify-center flex-1">
            <p className="text-base font-medium line-clamp-1">Address</p>
            {editMode ? (
              <input
                name="address"
                value={editUser.address || ""}
                onChange={handleChange}
                className="bg-[#2c3135] rounded px-2 py-1 w-full text-white mt-1"
                placeholder="Enter address"
              />
            ) : (
              <p className="text-[#a2abb3] text-sm font-normal line-clamp-2">
                {user.address || "Add address"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Cards
      </h3>
      <div className="flex items-center gap-4 bg-[#121416] px-4 min-h-[72px] py-2">
        <div className="text-white flex items-center justify-center rounded-lg bg-[#2c3135] shrink-0 size-12">
          <CreditCard size={24} />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-base font-medium line-clamp-1">Credit Cards</p>
          <p className="text-[#a2abb3] text-sm font-normal line-clamp-2">
            {cards.length > 0 ? `${cards.length} cards added` : "No cards added"}
          </p>
        </div>
      </div>
      <BottomNavBar/>

      {/* Bottom Navigation */}
      {/* <div className="fixed bottom-0 w-full">
        <div className="flex gap-2 border-t border-[#2c3135] bg-[#1e2124] px-4 pb-3 pt-2">
          <NavItem icon={<Home size={24} />} text="Home" href="/home" />
          <NavItem icon={<List size={24} />} text="Transactions" href="/transactions" />
          <NavItem icon={<CreditCard size={24} />} text="Cards" href="/cards" />
          <NavItem icon={<User size={24} />} text="Profile" href="/profile" active />
        </div>
        <div className="h-5 bg-[#1e2124]" />
      </div> */}
    </div>
  );
};

const NavItem = ({ icon, text, href, active = false }) => (
  <a 
    href={href}
    className={`flex flex-1 flex-col items-center justify-end gap-1 ${
      active ? 'text-white' : 'text-[#a2abb3]'
    }`}
  >
    <div className={`flex h-8 items-center justify-center ${
      active ? 'text-white' : 'text-[#a2abb3]'
    }`}>
      {icon}
    </div>
    <p className={`text-xs font-medium leading-normal tracking-[0.015em] ${
      active ? 'text-white' : 'text-[#a2abb3]'
    }`}>
      {text}
    </p>
  </a>
);

export default UserProfile;