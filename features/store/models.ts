// @filename: models.ts
import {Models} from '@rematch/core';
import {home} from '../home/home.reducer';
import {news} from '../news/news.reducer';
export interface RootModel extends Models<RootModel> {
  home: typeof home;
  news: typeof news;
}
export const models: RootModel = {home, news};
