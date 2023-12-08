import { InjectionKey } from "vue";

import { Post } from "../types/Post";

export interface IApiFeedService {
  listAll(query: FeedQueryRequestDto): Promise<Post[]>;
}

export const IApiFeedServiceKey = Symbol() as InjectionKey<IApiFeedService>;

export type FeedQueryRequestDto = {
  pageSize?: number;
  page?: number;
  keywords?: string;
};