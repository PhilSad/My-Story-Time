import React, { useEffect } from 'react';
import ButtonMenu from '@/app/components/buttonMenu/buttonMenu';
import SpeechBubble from '@/app/components/speechBubble/speechBubble';
import Link from 'next/link';
import { getDictionary } from '../dictionnaries'
import Image from "next/image";

const HomePage = async ({ params: { lang } }:any) => {
  const dict = await getDictionary(lang) // en
  
  return (
    <div className="h-full overflow-hidden">
      <h1 className='text-5xl text-center pt-9'>My Story TIme</h1>
      <div className="text-color-white">
        <SpeechBubble text={dict.home.tobbyWelcome} />
      </div>
      <div className='flex'>
        <Link href={"/newStory"} className='flex justify-center w-full'>
          <div className='absolute z-10 bottom-20'>
            <ButtonMenu text={dict.home.newStory} />
          </div>
          <div className='absolute z-10 bottom-40'>
            <Image
              src={"../assets/images/livre.png"}
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
          <div className='absolute overflow-hidden -bottom-10'>
            <img
              src={"/assets/images/meteorite.webp"}
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
        </Link>
        <Link href={"/savedStories"} className='flex justify-center w-full'>
          <div className='absolute z-10 bottom-20'>
            <ButtonMenu text={dict.home.savedStories} />
          </div>
          <div className='absolute z-10 bottom-40'>
            <img
              src="/assets/images/stories.png"
              width={200}
              height={200}
              alt="Picture of the author"
            />
          </div>
          <div className='absolute -bottom-10'>
            <img
              src="/assets/images/meteorite.webp"
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
        </Link>
        <div className='flex w-full h-full'>
          <div className='absolute right-0 z-10 bottom-40'>
            <img
              src="/assets/images/martien.png"
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
          <div className='absolute right-0 -bottom-10'>
            <img
              src="/assets/images/meteorite.webp"
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
        </div>
      </div>
    </div>

  )
}

export default HomePage;


