import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, UserRound } from "lucide-react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-16 bg-background">
      <div className="max-w-2xl mx-auto p-4 py-6">
        <div className="bg-card rounded-xl px-4 py-3 sm:p-6 space-y-7">
          <div className="text-center ">
            <h1 className="text-2xl sm:text-3xl font-semibold text-primary tracking-wide font-heading ">
              {authUser?.fullName}
            </h1>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col  items-center space-y-6">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-accent hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-primary/90" />
                <Input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-xs sm:text-sm text-primary font-main">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <div className="space-y-1.5">
              <div className="text-sm text-primary flex sm:text-lg items-center gap-2">
                <Mail className="size-4 sm:size-5" />
                Email
              </div>
              <p className="px-4 py-2.5 bg-primary/10 font-sans text-primary text-sm sm:text-lg rounded-lg border">
                {authUser?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-primary/10 rounded-xl p-6">
            <h2 className="text-lg font-heading font-semibold text-primary mb-4">
              Account Information
            </h2>
            <div className="sm:space-y-3 space-y-0  text-sm">
              <div className="flex items-center text-primary font-sans justify-between py-2">
                <span>Member Since</span>
{/*                 <span>{authUser.createdAt?.split("T")[0]}</span> */}
                  <div className="text-primary font-main">
                  {authUser.createdAt?.split("T")[0]}
                </div>
              </div>
              <div className="flex items-center font-sans text-primary justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
