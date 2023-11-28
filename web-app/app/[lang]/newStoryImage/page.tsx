"use client";
import withAuth from '@/app/components/protectedRoute/protectedRoute';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useStore } from '@/app/store/root.store';
import { observer } from 'mobx-react-lite';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/app/config/firebase.config';
import { getAuth } from 'firebase/auth';
import getUid from '@/app/utils/utils';
import AddIcon from '@mui/icons-material/Add';

const Page = observer(() => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uidUser = getUid(user);
  const router = useRouter()
  const { storyStore, userStore } = useStore();

  const createNewStroy = async () => {
    const result = await storyStore.createNewStory();
    router.push("/story");
  }

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    getUid(user);
    const downloadURL = await storyStore.uploadProfilImage(file, uidUser);
    userStore.setUserImages(downloadURL, uidUser);
  };

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const selectImage = (urlImage: string) => {
    storyStore.setUrlImageStory(urlImage);
  }

  useEffect(() => {
    userStore.getUserImages(uidUser);
  }, []);

  return (
    <div className='min-h-screen space-y-20 bg-cover bg-night font-agbalumo lg:space-y-52'>
      <div className='w-full pt-9 basis-1/5'>
        <h1 className='text-5xl text-center text-white'>My Bedtime Story</h1>
      </div>
      <div className='flex flex-col mx-4 space-y-4 overflow-hidden lg:m-48 md:mx-28'>
        <div className='text-3xl text-white'>Ajoute des photos</div>
        <div className='flex overflow-x-auto flex-nowrap'>
          <div className="w-32 h-32 m-2 shadow-xl btn card bg-base-100" onClick={handleClick}>
            <div className="flex items-center">
              <input type="file" id="fileInput" hidden onChange={(e) => handleFileChange(e)}></input>
              <AddIcon />
            </div>
          </div>
          {userStore.user.userImages.map((imageUrl, i) => {
            return(
              <div key={i} className={`w-32 h-32 m-2 shadow-xl card btn bg-base-100" ${imageUrl == storyStore.story.urlImage ? "btn-success" : ""}`} onClick={() => selectImage(imageUrl)}>
                <img src={imageUrl} alt="My Image"/>
              </div>
            )
          })}
          
        </div>
        <div className='flex justify-between'>
          <div className='text-white btn btn-error' onClick={() => router.push('/newStory')}>Annuler</div>
          <div className='text-white btn btn-success' onClick={createNewStroy}>Valider</div>
        </div>

      </div>
      <div className='flex w-full h-full basis-1/4'>
        <div className='absolute bottom-0 right-0 z-10'>
          <Image
            src="/assets/images/martien.png"
            width={250}
            height={250}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  )
});
export default withAuth(Page);
