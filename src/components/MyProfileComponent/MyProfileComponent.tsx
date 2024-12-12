'use client';

import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useGetUserDetailQuery } from '@/redux/service/user';
import { useUpdateUserProfileMutation } from '@/redux/service/user';

export default function MyProfileComponent() {
    const router = useRouter();
    const [userUUID, setUserUUID] = useState('');
    const { data: userData } = useGetUserDetailQuery({ uuid: userUUID });
    const [updateUserProfile] = useUpdateUserProfileMutation();

    useEffect(() => {
        setUserUUID(localStorage.getItem('userUUID') || '');
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            bio: '',
        },
        onSubmit: (values) => {
            // Make API call to update profile
            // console.log('Updated values:', values);
            updateUserProfile({ userProfile: values })
        },
    });

    useEffect(() => {
        if (userData?.data) {
            formik.setValues({
                name: userData.data.name || '',
                bio: userData.data.bio || '',
            });
        }
    }, [userData]);

    return (
        <div>
            {/* header */}
            <div className="flex justify-between">
                <p className="text-text_title_20 text-text_color_light dark:text-text_color_dark">Profile</p>
                <div className="flex gap-3 text-text_body_16 text-text_color_desc_light dark:text-text_color_desc_dark">
                    <button onClick={() => router.push('/blogHistory')}>
                        Blog <span className="hidden md:inline-block">History</span>
                    </button>
                    <span>/</span>
                    <button onClick={() => router.push('/scanHistory')}>
                        Scan <span className="hidden md:inline-block">History</span>
                    </button>
                    <span>/</span>
                    <p className="text-ascend_color">Profile <span className="hidden md:inline-block">Setting</span></p>
                </div>
            </div>

            {/* section */}
            <section>
                <div className="relative mt-[30px] bg-card_color_light dark:bg-background_dark_mode rounded-3xl">
                    {/* Particle Container */}
                    <div className="h-44 rounded-t-3xl overflow-hidden relative bg-black">
                        {/* <ParticlesComponent id="particles" /> */}
                    </div>
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white">
                            <img
                                className="w-full h-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${userData?.data?.profile}`}
                                alt="profile"
                                onError={(e) => (e.currentTarget.src = '/images/default-profile.jpg')}
                            />
                        </div>
                        <div className="text-center pt-3">
                            <p>{userData?.data?.name}</p>
                            <p>{userData?.data?.email}</p>
                        </div>
                    </div>

                    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 pt-36 md:pt-44 pb-10 md:pb-5 px-10">
                        <div className="flex flex-col md:flex-row md:items-center gap-3">
                            <p className="md:w-[35%]">Username</p>
                            <input
                                type="text"
                                name="name"
                                className="border border-text_color_desc_light text-text_color_desc_light w-full p-3 rounded-lg"
                                placeholder={userData?.data?.name || 'Your Username'}
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
                                placeholder={userData?.data?.bio || 'Add a short bio...'}
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className="flex items-center justify-start gap-3">
                            <p className="w-[35%] hidden md:block">Password</p>
                            <div className='w-full'>
                                <button className='border border-secondary_color text-text_color_light md:bg-secondary_color md:border-none p-3 rounded-lg mt-0'>Change Password</button>
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
