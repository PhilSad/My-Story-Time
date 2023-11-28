import Header from '@/app/components/header/header';
import "./page.css";
import HomePage from '@/app/[lang]/homePage/page';
import Link from 'next/link';
import SpeechBubble from '@/app/components/speechBubble/speechBubble';
import ButtonMenu from '@/app/components/buttonMenu/buttonMenu';
import { getDictionary } from '@/app/[lang]/dictionnaries';
import Image from "next/image";
export default async function Home({ params: { lang } }: any) {
  const dict = await getDictionary(lang) // en

  return (
    <main>
      <div className="relative home">
        <Header />
        <div className="h-full overflow-hidden">
          <h1 className='text-5xl text-center pt-9'>My Bedtime Story</h1>
          <div className="text-color-white">
            <SpeechBubble text={"Bienvenue ! Je suis Tobby ! Je créé des histoires grace à ton idée et une photo de toi ! "} />
          </div>
          <div className='flex'>
            <Link href={"/newStory"} className='flex justify-center w-full'>
              <div className='absolute z-10 bottom-20'>
                <ButtonMenu text={dict.home.newStory} />
              </div>
              <div className='absolute z-10 bottom-40'>
                <Image
                  src={"/assets/images/livre.png"}
                  width={300}
                  height={300}
                  alt="Picture of the author"
                />
              </div>
              <div className='absolute overflow-hidden -bottom-10'>
                <Image
                  src={"/assets/images/meteorite.webp"}
                  width={300}
                  height={300}
                  alt="Picture of the author"
                />
              </div>
            </Link>
            <Link href={"/savedStories"} className='flex justify-center w-full'>
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
            </Link>
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

      </div>
    </main>
  )
}
