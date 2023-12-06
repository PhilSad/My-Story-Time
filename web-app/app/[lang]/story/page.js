"use client";
import withAuth from '@/app/components/protectedRoute/protectedRoute';
import React, { useEffect, useState, useRef } from 'react'
import { useStore } from '@/app/store/root.store';
import { observer } from 'mobx-react-lite';
import { getAuth } from 'firebase/auth';
import getUid from '@/app/utils/utils';
import HTMLFlipBook from 'react-pageflip';
import useMobile from '@/app/hooks/useMobile.hook';

const Page = observer(() => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uidUser = getUid(user);
  const { storyStore } = useStore();
  const isMobile = useMobile();
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (storyStore.story.status != 'done') storyStore.startListening(uidUser);

  }, []);
  useEffect(() => {
    if (storyStore.story.status == 'done') {
      setIsLoading(false);
      createBook();
    }
  }, [storyStore.story.status]);
  const [pages, setPage] = useState([]);

  const createBook = () => {
    const book = [];
    storyStore.story.story.forEach((chapter) => {

      let title = "";

      chapter.paragraphs.forEach((paragraph) => {
        if (title != chapter.chapter_title) {
          title = chapter.chapter_title;
          const page = {
            title: chapter.chapter_title,
            paragraph: paragraph
          }
          book.push(page);
        } else {
          const page = {
            paragraph: paragraph
          }
          book.push(page);
        }
        
        
        if (paragraph.image) {
          book.push(paragraph.image);
        } else {
          book.push(paragraph.image_url);

        }
      });

    }
    );
    setPage(book);
    console.log("book", book);
  }
  return (
    <div className="flex min-h-screen text-black bg-cover bg-night font-agbalumo">
      {!isLoading ?


        <HTMLFlipBook
          width={!isMobile ? 650 : 350}
          height={!isMobile ? 650 : 350}
          size={'fixed'}
          showCover
          className='m-auto'
        >
          <div className='text-black bg-white'>{storyStore.story.prompt}</div>
          {pages.map((story, index) => {
            return (
              <div key={index} className='text-black bg-white '>
                {
                  index % 2 === 0 ?
                    <div className='m-5 space-y-5 lg:ml-28 lg:mr-28'>
                      {story.title && <h1 className='pt-5 text-xl lg:text-3xl xs:pt-3'>{story.title}</h1>}
                      <p className={!isMobile ? "text-xl" : "text-base"}>{story.paragraph.text}</p>
                    </div> :

                    <img src={story} alt="My Image" />
                }
              </div>
            )
          })
          }

        </HTMLFlipBook> :
        <div className='flex flex-col items-center justify-center'>
          <span className="loading loading-lg loading-spinner text-warning"></span>
          <div className='text-2xl text-white'>The generation can take up to 10 minutes</div>
        </div>
      }
    </div >
  )
});
export default withAuth(Page);
