"use client";

import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import {
  useGetUserDetailQuery,
  useUpdateUserProfileMutation,
} from "@/redux/service/user";
import { useUploadSingleFileMutation } from "@/redux/service/fileupload";
import { FaEdit } from "react-icons/fa";
import ParticlesComponent from "../Particle/ParticlesComponent";
import { useToast } from "../hooks/use-toast";

type FormValues = {
  profile: string; 
  name: string;
  bio: string;
};

export default function MyProfileComponent() {

  const {toast} = useToast();

  const router = useRouter();

  const [userUUID, setUserUUID] = useState("");

  const { data: userData } = useGetUserDetailQuery({ uuid: userUUID });

  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [uploadFile] = useUploadSingleFileMutation();

  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    setUserUUID(localStorage.getItem("userUUID") || "");
  }, []);

  // handle update user profile
  const handleUpdateProfile = async (values: FormValues) => {
    try {
      await updateUserProfile({ userProfile: values }).unwrap();
      toast({
        description: "Profile updated successfully!",
        variant: "success",
      });
    } catch {
    
      toast({
        description: "Failed to update profile. Please try again.",
        variant: "error",
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      bio: "",
      profile: "",
    },
    onSubmit: async (values) => {
     
      const updateValue = {
        ...values,
        profile: previewImage || values?.profile
      }

      await handleUpdateProfile(updateValue);
   
    },
  });

  useEffect(() => {
    if (userData?.data) {
      formik.setValues({
        name: userData.data.name || "",
        bio: userData.data.bio || "",
        profile: userData.data.profile || "",
      });
      
    }
  }, [userData]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {

    const file = e.target.files ? e.target.files[0] : null;

    if(file)
    {
      const fullUrl = await handleFileUpload(file);
      
      if (fullUrl) {

        setPreviewImage(fullUrl);

      }
    
    }
   
  };

  const handleFileUpload = async (file: any) => {

    const formData = new FormData();

    formData.append("file", file);


    try {

      const response = await uploadFile({ file: formData }).unwrap();
  
      // Check the response structure to ensure `fullUrl` exists
      if (response?.data?.fullUrl) {
        return response.data.fullUrl; // Return the full URL
      } else {
        toast({
          description: "Failed to upload file. Please try again.",
          variant: "error",
        });
        return ""; // Return an empty string in case of failure
      }
    } catch  {
      toast ({
        description: "Failed to upload file. Please try again.",
        variant: "error",
      })
      return ""; // Return an empty string if an error occurs
    }
  };

  return (
    <div>
      {/* header */}
      <div className="flex justify-between">
        <p className="text-text_title_20 text-text_color_light dark:text-text_color_dark">
          Profile
        </p>
        <div className="flex gap-3 text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
          <button onClick={() => router.push("/blogHistory")}>
            Blog <span className="hidden md:inline-block">History</span>
          </button>
          <span>/</span>
          <button onClick={() => router.push("/scanHistory")}>
            Scan <span className="hidden md:inline-block">History</span>
          </button>
          <span>/</span>
          <p className="text-ascend_color">
            Profile <span className="hidden md:inline-block">Setting</span>
          </p>
        </div>
      </div>

      {/* section */}
      <section>
        <div className="relative mt-[30px] bg-card_color_light dark:bg-card_color_dark rounded-3xl">
          {/* Particle Container */}
          <div className="absolute translate-x-0 rounded-md flex flex-col items-center h-44 w-full">
            <div className="absolute">
              <ParticlesComponent id="particles" />
            </div>
          <div className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
            {/* Profile Image Container */}
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-white group">
              <img
                className="w-full h-full object-cover"
                src={previewImage || userData?.data?.profile ||  "/images/default-profile.jpg"}
                alt="profile"
              />
              {/* Edit Overlay */}
              <button className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                <label className="cursor-pointer flex flex-col items-center justify-center gap-2 w-full h-full rounded-full">
                  <div className="flex gap-3">
                    <FaEdit className="text-white" />
                    <span className="text-white">Edit</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </button>
            </div>
            <div className="text-center pt-3">
              <p>{userData?.data?.name}</p>
              <p>{userData?.data?.email}</p>
            </div>
          </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col justify-center items-stretch pt-80 gap-5 md:pt-[360px] pb-10 md:pb-5 px-10"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <p className="md:w-[35%]">Username</p>
              <input
                type="text"
                name="name"
                className="border border-text_color_desc_light text-text_color_desc_light w-full p-3 rounded-lg"
                placeholder={userData?.data?.name || "Your Username"}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="md:w-[35%] flex flex-col">
                <p>Bio</p>
                <p className="text-text_color_desc_light dark:text-text_color_desc_dark hidden md:block">
                  Write a short introduction about yourself
                </p>
              </div>
              <textarea
                name="bio"
                className="border border-text_color_desc_light text-text_color_desc_light w-full p-3 rounded-lg"
                placeholder={userData?.data?.bio || "Add a short bio..."}
                value={formik.values.bio}
                onChange={formik.handleChange}
              />
            </div>
            <div className="flex items-center justify-start gap-3">
              <p className="w-[35%] hidden md:block">Password</p>
              <div className="w-full">
                <button
                  onClick={() => router.push("/change-password")}
                  className="border border-secondary_color text-text_color_light md:bg-secondary_color md:border-none p-3 rounded-lg mt-0"
                >
                  Change Password
                </button>
              </div>
            </div>
            <div className="flex md:justify-end">
              <button
                type="submit"
                className="text-text_color_light bg-primary_color p-3 rounded-lg w-full md:w-auto"
              >
                Save Changes
              </button>
            </div>
          
          </form>
        </div>
      </section>
    </div>
  );
}
