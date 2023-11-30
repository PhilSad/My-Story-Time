"use client";
import withAuth from '@/app/components/protectedRoute/protectedRoute';
import React, { useEffect, useState, useRef } from 'react'
import { useStore } from '@/app/store/root.store';
import { observer } from 'mobx-react-lite';
import { getAuth } from 'firebase/auth';
import getUid from '@/app/utils/utils';
import HTMLFlipBook from 'react-pageflip';
import { Button } from '@mui/material';
import { db } from '@/app/config/firebase.config';
import { functions } from '@/app/config/firebase.config';
import { useSearchParams } from 'next/navigation'
import { HttpsCallable } from 'firebase/functions';

const Page = observer(() => {
  const auth = getAuth();
  const user = auth.currentUser;
  const uidUser = getUid(user);
  const { storyStore } = useStore();

  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams()

  useEffect(() => {
    console.log(storyStore.story);

    // if sharedStoryId in url, get the story from the shared stories collection
    if (searchParams.get('sharedStoryId')) {
      db.collection('SharedStories').doc(searchParams.get('sharedStoryId')).get().then((doc) => {
        if (doc.exists) {
          storyStore.setStory(doc.data());
        } else {
          console.log("No such document!");
        }
      })
    }
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
      chapter.paragraphs.forEach((paragraph) => {
        const page = {
          title: chapter.chapter_title,
          paragraph: paragraph
        }
        book.push(page);
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
    <div className="flex flex-row justify-center min-h-screen text-black bg-cover bg-night font-agbalumo">
      {!isLoading ?


        <HTMLFlipBook
          width={650}
          height={650}
          size={'fixed'}
        >
          <div>
            {!searchParams.get('sharedStoryId') &&

              <Button variant="contained" color="primary" onClick={() => {
                const shareStory = functions.httpsCallable('shareStory');
                shareStory({ userId: uidUser, storyId: storyStore.story.id }).then((result) => {
                  console.log(result.data);
                });
              }
              }>
                Share this story
              </Button>
            }

          </div>
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
          <div className='text-2xl text-white'>The generation can take up to 10 minutes</div>
        </div>
      }
    </div >
  )
});
export default withAuth(Page);
