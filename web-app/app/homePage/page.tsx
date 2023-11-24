"use client";
import React, { useEffect } from 'react';
import "./homePage.css";
import Image from 'next/image'
import ButtonMenu from '@/app/components/buttonMenu/buttonMenu';
import SpeechBubble from '@/app/components/speechBubble/speechBubble';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.clear();
  }, [])
  
  return (
    <div className="overflow-hidden homePage">
      <h1>My Bedtime Story</h1>
      <div className="text-color-white">
        <SpeechBubble text={"Bienvenue ! Je suis Tobby ! Je créé des histoires grace à ton idée et une photo de toi ! "} />
      </div>
      <div className='flex'>
        <Link href={"/newStory"} className='flex justify-center w-full'>
          <div className='absolute z-10 bottom-20'>
            <ButtonMenu text="Nouvelle histoire" />
          </div>
          <div className='absolute z-10 bottom-40'>
            <Image
              src="/assets/images/livre.png"
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
          <div className='absolute overflow-hidden -bottom-10'>
            <Image
              src="/assets/images/meteorite.webp"
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
        </Link>
        <div className='flex justify-center w-full'>
          <div className='absolute z-10 bottom-20'>
            <ButtonMenu text="Histoires enregistrées" />
          </div>
          <div className='absolute z-10 bottom-40'>
            <Image
              src="/assets/images/stories.png"
              width={200}
              height={200}
              alt="Picture of the author"
            />
          </div>
          <div className='absolute -bottom-10'>
            <Image
              src="/assets/images/meteorite.webp"
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className='flex w-full h-full'>
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
    </div>

  )
}

export default HomePage;
