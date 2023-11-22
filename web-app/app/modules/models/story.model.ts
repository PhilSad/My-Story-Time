import { Instance, types } from "mobx-state-tree";

export const StoryModel = types.model("StoryModel", {
  prompt: types.optional(types.string, ""),
  urlImage: types.optional(types.string, ""),
  storyContent: types.optional(types.string, ""),
  heroName: types.optional(types.string, ""),
  language: types.maybe(types.enumeration("language", ['en', 'fr'])),

});

export type StoryModelType = Instance<typeof StoryModel>;
