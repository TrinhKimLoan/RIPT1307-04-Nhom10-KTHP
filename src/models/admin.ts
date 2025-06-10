import { useState } from 'react';
import { 
  searchPostsByTitle,
  getVoteCount
} from '@/services/Admin/index';
import useCommonPosts from '@/models/posts';
import type { Post } from '@/services/Posts/typings';

export default () => {
  const common = useCommonPosts();
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  const searchPosts = (keyword: string): Post[] => {
    const results = searchPostsByTitle(keyword);
    setSearchResults(results);
    return results;
  };

  return {
    ...common,
    searchPosts,
    searchResults,
    getVoteCount
  };
};