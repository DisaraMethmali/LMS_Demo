import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import profile from '../assets/profile.png';
const UserInfo = () => {
    const { user } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleProfileClick = () => {
        setIsProfileOpen(prevState => !prevState);  // Toggle profile details visibility
    };

    // If user is not logged in, render a default image and handle the "Not Logged In" message
    if (!user) {
        return (
            <div className="relative">
                {/* Default Profile Picture */}
                <div 
                    className="cursor-pointer w-12 h-12 rounded-full overflow-hidden border-4 border-blue-500 mb-4 absolute top-[-150px] right-0"
                    onClick={handleProfileClick}
                >
                    <img
                        src="/assets/default-profile.png" // Fallback to default image if no user
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* "Not Logged In" Message */}
                {isProfileOpen && (
                    <div className="absolute top-20 right-0 p-4 bg-white border border-gray-200 rounded-md shadow-lg mt-2 w-60">
                        <p className="text-lg font-semibold text-blue-500">Not Logged In</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="relative">
            {/* User Profile Picture */}
            <div 
                className="cursor-pointer w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500 mb-1 absolute top-[-60px] right-[180px]"
                onClick={handleProfileClick}
            >
                <img
                    src={profile} // Fallback to default image if none
                    alt="Profile"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Conditionally render user profile details (profile picture, username, email, role) inside a bigger box */}
            {isProfileOpen && (
                <div className="absolute top-20 right-0 p-6 bg-white border border-gray-200 rounded-lg shadow-xl mt-2 w-80 top-[20px] right-[20px]">
                    {/* Profile Picture */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 mb-4 mx-auto shadow-md">
                        <img
                            src={profile}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Username */}
                    <p className="text-2xl font-semibold text-blue-600 mb-2 text-center">{user.username}</p>
                    {/* Email */}
                    <p className="text-xl font-semibold text-black-500 mb-2">Email: {user.email}</p>
                    {/* Role */}
                    <p className="text-xl font-semibold text-black-500">Role: {user.role}</p>
                </div>
            )}
        </div>
    );
};

export default UserInfo;

