/* eslint-disable @typescript-eslint/no-explicit-any */
import { flow, types } from "mobx-state-tree";
import { StoryModel } from '@/app/modules/models/story.model';
import { getFunctions, httpsCallable } from 'firebase/functions';

export const StoryStore = types
  .model("Story", {
    story: StoryModel,
    stories: types.maybe(types.array(StoryModel)),
  })
  .actions((self) => ({
    setPromptStory(prompt: string) {
      const newStory = {
        ...self.story,
        prompt
      }
      self.story = newStory;
    },
    createNewStroy: flow(function* (data: any) {
      try {
        const functions = getFunctions();
        const createNewStroy = httpsCallable(functions, 'createNewStroy');
        createNewStroy({ prompt: "Un pirate qui a perdu son peroquet", urlImage: null, heroName: "léa", language: 'fr' });
      } catch (error) {
        console.log(error);
      }

    })
  }));

export const storyStore = StoryStore.create({
  story: {
    prompt: '',
    urlImage: '',
    storyContent: '',
    heroName: '',
    language: 'en'
  },
  stories: []
});
