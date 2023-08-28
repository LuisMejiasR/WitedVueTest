import { defineStore } from 'pinia'
import { IPost, IPostsResponse } from '../models/post.model'

export const usePostStore = defineStore('post', {
    //initial state
    state: (): IPostsResponse => ({
        postsArr: []
    }),

    //setting actions to change state
    actions: {
        loadPost(posts: IPost[]) {
            this.postsArr = posts
        }
    }

})
