import { observable } from 'mobx';
import { sql } from '@vercel/postgres'

const likeStore = observable({
  likes: {},
  isLiked: {},

  handleLike(id: string) {

    if(!this.isLiked[id]){
      this.likes[id]++;
      this.isLiked[id] = true;
    } else {
      this.likes[id]--;
      this.isLiked[id] = false;
    }

  },

  getLikes(id: string){
    return this.likes[id] = this.likes[id] || 0;
  },

  getIsLiked(id: string){
    return this.isLiked[id];
  }
});

export default likeStore;