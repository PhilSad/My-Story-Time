"use client";
import withAuth from '@/app/components/protectedRoute/protectedRoute';
import React, { useEffect, useState, useRef } from 'react'
import { useStore } from '@/app/store/root.store';
import { observer } from 'mobx-react-lite';
import { getAuth } from 'firebase/auth';
import getUid from '@/app/utils/utils';
import HTMLFlipBook from 'react-pageflip';

const Page = observer(() => {
  const { storyStore } = useStore();

  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const demoUserId = "2lMgGYvewOS0ipWhUNos2CXf3iw2";
  const demoStoryId = "C0i8n5LhbfRX6bng7at9";

  useEffect(() => {
    console.log("ss", storyStore.story.status);
    storyStore.getStoryById(demoStoryId, demoUserId);

    // if (storyStore.story.status != 'done') storyStore.startListening(uidUser);
    //   const fetchData = async () => {
    //     await storyStore.getStoryById("ej4PmjBLv03SUf1bOdC1", uidUser);
    //     setIsLoading(false);
    //     createBook();
    //   }
    //   // call the function
    //   fetchData()
    //     // make sure to catch any error
    //     .catch(console.error);

  }, []);
  useEffect(() => {
    console.log(storyStore.story.status);
    if (storyStore.story.status == 'done') {
      setIsLoading(false);
      createBook();
    }
  }, [storyStore.story.status])
  const [pages, setPage] = useState([]);

  const createBook = () => {
    const book = [];
    console.log("storyStore.story", storyStore.story.story)
    storyStore.story.story.forEach((chapter) => {
      chapter.paragraphs.forEach((paragraph) => {
        const page = {
          title: chapter.chapter_title,
          paragraph: paragraph
        }
        book.push(page);
        book.push(paragraph.image);
      });

    }
    );
    setPage(book);
    console.log("book", book);
  }
  return (
    <div className="flex flex-row justify-center min-h-screen text-black bg-cover bg-night font-agbalumo">
      {!isLoading ?
        <HTMLFlipBook
          width={650}
          height={650}
          size={'fixed'}
        >
          <div></div>
          <div className='text-black bg-white'>{storyStore.story.prompt}</div>
          {pages.map((story, index) => {
            return (
              <div key={index} className='text-black bg-white '>
                {
                  index % 2 === 0 ?
                    <div className='m-5 space-y-5 ml-28 mr-28'>
                      <h1 className='pt-5 text-3xl'>{story.title}</h1>
                      <p className='text-xl'>{story.paragraph.text}</p>
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
          <div className='text-2xl text-white'>Generation can take up to 10mn</div>
        </div>}
    </div>
  )
});
export default withAuth(Page);
