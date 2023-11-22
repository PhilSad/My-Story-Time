"use client";
import withAuth from '@/app/components/protectedRoute/protectedRoute';
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useStore } from '@/app/store/root.store';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const Page = observer(() => {

  const router = useRouter()
  const { storyStore } = useStore();
  const updatePrompt = () => {
    //storyStore.createNewStroy(null);
  }
  return (
    <div className="flex flex-row min-h-screen bg-cover bg-night font-agbalumo">
      <div className='container flex grid flex-col content-center mx-48 space-y-10 basis-3/4'>
        <div className='text-3xl'>Ajoute des photos</div>
        <div className="w-48 h-48 shadow-xl btn card bg-base-100">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faPlus} size="2xl"/>
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='btn' onClick={() => router.push('/newStory')}>Annuler</div>
          <div className='btn' onClick={updatePrompt}>Valider</div>
          <div>{storyStore.story.prompt}</div>
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
