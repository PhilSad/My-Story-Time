"use client";
import React, { useEffect } from 'react'
import withAuth from '@/app/components/protectedRoute/protectedRoute';
import { getAuth } from 'firebase/auth';
import getUid from '@/app/utils/utils';
import { useStore } from '@/app/store/root.store';
import { observer } from 'mobx-react-lite';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

const page = observer(() => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uidUser = getUid(user);
  const router = useRouter();

  const { storyStore } = useStore();

  useEffect(() => {
    storyStore.getStories(uidUser);
  }, []);

  const onClick = (story: any) => {
    storyStore.reset();
    storyStore.getStoryById(story.storyId, uidUser);
    router.push("/story");
  }

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-night font-agbalumo">
      <div className='w-full pt-9 pb-9 basis-1/5'>
        <h1 className='text-5xl text-center text-white'>My Stories</h1>
      </div>
      <div className='flex flex-wrap justify-center'>
        {storyStore.stories.map((story, index) => {
          return (
            <div key={index} className='relative flex justify-center m-5'>
              <div className='absolute m-auto text-xl rounded-3xl btn btn-lg top-1/2 bottom-1/2' onClick={() => onClick(story)}>{story.prompt}</div>
              <div className=''>
                <Image
                  src="/assets/images/meteorite.webp"
                  width={250}
                  height={250}
                  alt="Picture of the author"
                />
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
});

export default withAuth(page);
