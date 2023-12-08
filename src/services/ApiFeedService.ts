import { Post } from "../types/Post";
import { FeedQueryRequestDto, IApiFeedService } from "./IApiFeedService";

export class ApiFeedService implements IApiFeedService {
  async listAll(query: FeedQueryRequestDto): Promise<Post[]> {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?q=${query.keywords}&_page=${query.page}&_limit=${query.pageSize}`
    );

    if (response.status !== 200) {
      throw new Error(`Post list query error`);
    }

    return (await response.json()) as Post[];
  }
}
