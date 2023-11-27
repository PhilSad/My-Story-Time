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
    <div className="flex flex-row min-h-screen bg-cover bg-night font-agbalumo">
      <div className='container flex grid flex-col content-center mx-48 space-y-10 basis-3/4'>
        <div className='text-3xl'>Ajoute des photos</div>
        <div className='flex flex-row space-x-5 '>
          {userStore.user.userImages.map((imageUrl, i) => {
            return(
              <div key={i} className={`w-48 h-48 shadow-xl card btn bg-base-100" ${imageUrl == storyStore.story.urlImage ? "btn-success" : ""}`} onClick={() => selectImage(imageUrl)}>
                <img src={imageUrl} alt="My Image"/>
              </div>
            )
          })}
          <div className="w-48 h-48 shadow-xl btn card bg-base-100" onClick={handleClick}>
            <div className="flex items-center">
              <input type="file" id="fileInput" hidden onChange={(e) => handleFileChange(e)}></input>
              {/* <FontAwesomeIcon icon={faPlus} size="2xl" /> */}
            </div>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='btn' onClick={() => router.push('/newStory')}>Annuler</div>
          <div className='btn' onClick={createNewStroy}>Valider</div>
        </div>

      </div>
      <div className='flex w-full h-full basis-1/4'>
        <div className='absolute right-0 z-10 bottom-40'>
          <Image
            src="/assets/images/martien.png"
            width={300}
            height={300}
            alt="Picture of the author"
          />
        </div>
        <div className='absolute right-0 -bottom-10'>
          <Image
            src="/assets/images/meteorite.webp"
            width={300}
            height={300}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  )
});
export default withAuth(Page);
