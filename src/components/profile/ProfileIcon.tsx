import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "react-toastify";

function ProfileIcon() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const useAuth =  useContext(AuthContext);
    if (!useAuth) {
      throw new Error("useAuth must be used within AuthProvider");
    }
    const user = useAuth.user;

    // Close dropdown when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          profileRef.current &&
          !profileRef.current.contains(event.target as Node)
        ) {
          setIsProfileOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
      try {
        setIsProfileOpen(false);
        await useAuth.logout();

        // Success actions
        toast.success("Logged out successfully");
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Failed to log out. Please try again.");
      }
    };

  return (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="User profile menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-200">
          {!user ? (
            <>
              <NavLink
                to="/signin"
                onClick={() => setIsProfileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-blue-50 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Login
                </div>
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setIsProfileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-blue-50 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Register
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                onClick={() => setIsProfileOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-blue-50 text-primary font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Profile
                </div>
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full cursor-pointer block px-4 py-2 text-sm transition-colors text-gray-700 hover:bg-gray-100 hover:text-red-600"
              >
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </div>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileIcon;
