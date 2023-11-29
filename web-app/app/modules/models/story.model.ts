import { Instance, types } from "mobx-state-tree";
import { GeneratedStoryModelType } from './generatedStory.model';

export const StoryModel = types.model("StoryModel", {
  storyId: types.optional(types.string, ""),
  prompt: types.optional(types.string, ""),
  urlImage: types.maybeNull(types.string),
  heroName: types.optional(types.string, ""),
  language: types.maybe(types.enumeration("language", ['en', 'fr'])),
  story: types.maybeNull(types.array(types.frozen<GeneratedStoryModelType>())),
  status: types.maybeNull(types.string),

});

export type StoryModelType = Instance<typeof StoryModel>;
