import { inject } from "vue";
import { IApiFeedService, IApiFeedServiceKey } from "./IApiFeedService";

export const useFeedService = () => {
  return inject(IApiFeedServiceKey) as IApiFeedService;
};
