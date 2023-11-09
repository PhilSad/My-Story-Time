import React from 'react';
import "./homePage.css";
import Image from 'next/image'
import ButtonMenu from '@/app/components/buttonMenu/buttonMenu';

const HomePage = () => {
  return (
    <div className="homePage relative overflow-hidden">
      <h1>My Bedtime Story</h1>

      <div className='flex'>
        <div className='flex w-full justify-center'>
          <div className='absolute bottom-20 z-10'>
            <ButtonMenu text="Nouvelle histoire" />
          </div>
          <div className='absolute bottom-40 z-10'>
            <Image
              src="/assets/images/livre.png"
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
          <div className='absolute -bottom-10 overflow-hidden'>
            <Image
              src="/assets/images/meteorite.webp"
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
        </div>
        <div className='flex w-full justify-center'>
          <div className='absolute bottom-20 z-10'>
            <ButtonMenu text="Histoires enregistrées" />
          </div>
          <div className='absolute bottom-40 z-10'>
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
        <div className='flex h-full w-full'>
          <div className='absolute bottom-40 right-0 z-10'>
            <Image
              src="/assets/images/martien.png"
              width={300}
              height={300}
              alt="Picture of the author"
            />
          </div>
          <div className='absolute -bottom-10 right-0'>
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
