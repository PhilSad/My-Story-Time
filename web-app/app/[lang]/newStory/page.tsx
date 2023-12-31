"use client";
import withAuth from '@/app/components/protectedRoute/protectedRoute';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useStore } from '@/app/store/root.store';
import { observer } from 'mobx-react-lite';
import useMobile from '@/app/hooks/useMobile.hook';


const Page = observer(() => {
  const isMobile = useMobile();
  const { storyStore } = useStore();
  const [promptInput, setInputPrompt] = useState(storyStore.story.prompt);
  const [heroName, setHeroName] = useState(storyStore.story.heroName);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [style, setStyle] = useState('Cute children book style');

  const router = useRouter()

  const updatePrompt = () => {
    storyStore.setPromptStory(promptInput);
    storyStore.setHeroName(heroName);
    storyStore.setLanguage(selectedLanguage);
    router.push("/newStoryImage");
  }

  const handleLanguageChange = (event: { target: { value: any; }; }) => {
    const selectedValue = event.target.value;
    setSelectedLanguage(selectedValue);
  };

  return (
    <div className='min-h-screen space-y-24 bg-cover bg-night font-agbalumo lg:space-y-24'>
      <div className='w-full pt-9 basis-1/5'>
        <h1 className='text-5xl text-center text-white'>My Bedtime Story</h1>
      </div>
      <div className="flex flex-row ">
        <div className='flex grid content-center w-full mx-5 space-y-5 lg:mx-48 md:mx-28'>
          <div className='text-3xl text-white'>What's the story about</div>
          <input type="text" value={promptInput} placeholder="A pirate lost his parrot" className="w-full input input-bordered" onChange={(e) => setInputPrompt(e.target.value)} />
          <label className="w-full form-control">
            <div className="label">
              <span className="text-lg text-white label-text">What is the character name?</span>
            </div>
            <input type="text" value={heroName} placeholder="Emilie" className="w-full input input-bordered" onChange={(e) => setHeroName(e.target.value)} />
          </label>
          <label className="w-full form-control">
            <div className="label">
              <span className="text-lg text-white label-text">What style ?</span>
            </div>
            <input type="text" value={style} placeholder="Style" className="w-full input input-bordered" onChange={(e) => setStyle(e.target.value)} />
          </label>
          <select
            className="w-full max-w-xs select select-bordered"
            onChange={handleLanguageChange} 
            value={selectedLanguage}
          >
            <option disabled>
              Choose a language
            </option>
            <option value="fr">French</option>
            <option value="en">English</option>
          </select>

          <div className='flex justify-between'>
            <div className='text-white btn btn-error' onClick={() => router.push('/')}>Annuler</div>
            <div className={`text-white btn btn-success ${promptInput == '' || heroName == '' || selectedLanguage == '' ? "btn-disabled" : ""}`} onClick={updatePrompt}>Submit</div>
          </div>
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
    </div>

  )
});
export default withAuth(Page);
