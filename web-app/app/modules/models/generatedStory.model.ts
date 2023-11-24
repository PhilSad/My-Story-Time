import { Instance, types } from "mobx-state-tree";

const ParagraphsModel = types.model("ParagraphsModel", {
  image_desc: types.string,
  image_url: types.string,
  text: types.string,
});

export const GeneratedStoryModel = types.model("GeneretedStoryModel", {
  chapter_title: types.string,
  paragraphs: types.array(ParagraphsModel),
  
});

export type GeneratedStoryModelType = Instance<typeof GeneratedStoryModel>;
