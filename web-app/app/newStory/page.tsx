"use client";
import withAuth from '@/app/components/protectedRoute/protectedRoute';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useStore } from '@/app/store/root.store';
import { observer } from 'mobx-react-lite';


const Page = observer(() => {
  const { storyStore } = useStore();
  const [promptInput, setInputPrompt] = useState(storyStore.story.prompt);
  const router = useRouter()
  const updatePrompt = () => {
    storyStore.setPromptStory(promptInput);
    router.push("/newStoryImage");
  }
  return (
    <div className="flex flex-row min-h-screen bg-cover bg-night font-agbalumo">
      <div className='container flex grid flex-col content-center mx-48 space-y-10 basis-3/4'>
        <div className='text-3xl'>Que raconte l’histoire ?</div>
        <input type="text" value={promptInput} placeholder="Un pirate a perdu son pérroquet.." className="w-full input input-bordered" onChange={(e) => setInputPrompt(e.target.value)} />
        <div className='flex justify-between'>
          <div className='btn' onClick={() => router.push('/')}>Annuler</div>
          <div className='btn' onClick={updatePrompt}>Valider</div>
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
