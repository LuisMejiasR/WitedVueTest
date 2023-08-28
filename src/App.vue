<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import axiosClient from './utils/axios'
import { usePostStore } from './stores/postStore'
import PageHeader from './components/PageHeader.vue'
import PostList from './components/PostList.vue'
import { IPost } from './models/post.model';

// pinia store
const postStore = usePostStore()
const { postsArr } = storeToRefs(postStore)

// async fn calling axios and setting state of pinia store
const fetchPosts = async () => {
  try {
    const response = await axiosClient.get('/')
    postStore.loadPost(response.data)
  } catch (error) {
    console.log(error)
  }
}

// search ref
const search = ref('')
const filteredPost = ref<IPost[]>([])

//fn to search posts from user input
const filterPosts = () => {
  filteredPost.value = postsArr.value.filter((post) => post.title.toLowerCase().includes(search.value.toLowerCase()))
}

// when component mounts, call fn
onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <PageHeader />
  <div class='max-auto px-6'>
    <div class='mb-8'>
      <input type=' text' class='border border-gray-300 rounded w-full p-2 px-4' placeholder='Buscar post'
        @input='filterPosts' v-model='search'>
    </div>
    <PostList :postsArr='filteredPost.length > 0 ? filteredPost.slice(0, 10) : []' />
  </div>
</template>
