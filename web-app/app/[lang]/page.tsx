"use client";
import Header from '@/app/components/header/header';
import "./page.css";
import Link from 'next/link';
import ButtonMenu from '@/app/components/buttonMenu/buttonMenu';
import { getDictionary } from '@/app/[lang]/dictionnaries';
import Image from "next/image";
import useMobile from '@/app/hooks/useMobile.hook';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Home({ params: { lang } }: any) {
  const isMobile = useMobile();
  const router = useRouter()
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    async function fetchDictionary() {
      const dictionary = await getDictionary(lang);
      setDict(dictionary);
    }

    fetchDictionary();
  }, [lang]);
  const tryMe = () => {
    router.push("/demoStory");

  }
  return (
    <main>
      <div className="relative home">
        <div className="container flex flex-col h-screen px-4 pt-4 mx-auto">
          <Header />

          <div className='w-full pt-9 basis-1/5'>
            <h1 className='text-5xl text-center text-white'>My Bedtime Story</h1>
          </div>
          <div className={!isMobile ? `basis-2/5 ` : `basis-1/5 mt-5`}>
            <div className='text-center text-white lg:text-3xl sm:text-lg'>Bienvenue ! Je suis Tobby ! </div>
            <div className='text-center text-white lg:text-3xl sm:text-lg'>Je créé des histoires grace à ton idée et une photo de toi ! </div>
            <div className='flex justify-center w-full mt-4 mb-2'>
              <button className="text-lg btn" onClick={tryMe}>Try me</button>

            </div>
            {!isMobile && <div className='absolute right-0 z-10'>
              <Image
                src="/assets/images/martien.png"
                width={300}
                height={300}
                alt="Picture of the author"
              />
            </div>}
          </div>
          {!isMobile ? <div className='flex flex-row w-full basis-2/5'>
            <Link href={"/savedStories"} className='relative flex justify-center w-full'>
              <div className='absolute z-20 bottom-20'>
                <ButtonMenu text="Histoires enregistrées"  />
              </div>
              <div className='absolute z-10 bottom-40'>
                <Image
                  src={"/assets/images/stories.png"}
                  width={200}
                  height={200}
                  alt="Picture of the author"
                />
              </div>
              <div className='absolute overflow-hidden -bottom-10'>
                <Image
                  src={"/assets/images/meteorite.webp"}
                  width={250}
                  height={250}
                  alt="Picture of the author"
                />
              </div>
            </Link>
            <Link href={"/newStory"} className='flex justify-center w-full'>
              <div className='absolute z-10 bottom-20'>
                {dict != null && dict.home != null && <ButtonMenu text={dict.home.newStory} />}
              </div>
              <div className='absolute z-10 bottom-40'>
                <Image
                  src={"/assets/images/livre.png"}
                  width={250}
                  height={250}
                  alt="Picture of the author"
                />
              </div>
              <div className='absolute overflow-hidden -bottom-10'>
                <Image
                  src="/assets/images/meteorite.webp"
                  width={250}
                  height={250}
                  alt="Picture of the author"
                />
              </div>
            </Link>
            <div className='flex justify-center w-full h-full'>
              <div className='absolute right-0 z-10 bottom-40'>
                {/* <Image
                  src="/assets/images/martien.png"
                  width={300}
                  height={300}
                  alt="Picture of the author"
                /> */}
              </div>
              {/* <div className='absolute right-0 -bottom-10'>
                <Image
                  src="/assets/images/meteorite.webp"
                  width={300}
                  height={300}
                  alt="Picture of the author"
                />
              </div> */}
            </div>
          </div> :
            //Mobile Version
            <div className='flex flex-col w-full basis-3/5'>
              <Link href={"/newStory"} className='flex w-full'>
                <div className='z-10 flex flex-row items-center bottom-40'>
                  <Image
                    src={"/assets/images/livre.png"}
                    width={150}
                    height={150}
                    alt="Picture of the author"
                  />
                  {dict && dict.home && <ButtonMenu text={dict.home.newStory} />}
                </div>
              </Link>
            <Link href={"/savedStories"} className='relative flex justify-center w-full'>
              <div className=''>
              </div>
                <div className='z-10 flex flex-row items-center bottom-40'>
                <Image
                  src={"/assets/images/stories.png"}
                  width={100}
                  height={100}
                  alt="Picture of the author"
                  />
                  <ButtonMenu text="Histoires enregistrées" />

              </div>
            </Link>
            
            <div className='flex justify-center w-full h-full'>
              <div className='absolute bottom-0 right-0 z-10'>
                <Image
                  src="/assets/images/martien.png"
                  width={150}
                  height={150}
                  alt="Picture of the author"
                />
              </div>
              {/* <div className='absolute right-0 -bottom-10'>
                <Image
                  src="/assets/images/meteorite.webp"
                  width={300}
                  height={300}
                  alt="Picture of the author"
                />
              </div> */}
            </div>
          </div>
}
        </div>

      </div>
    </main>
  )
}
