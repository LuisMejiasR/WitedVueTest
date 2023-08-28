<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import axiosClient from './utils/axios'
import { usePostStore } from './stores/postStore'
import PageHeader from "./components/PageHeader.vue"

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

// when component mounts, call fn
onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <PageHeader />
  <div v-for="post in postsArr">
    {{ post.title }}
  </div>
</template>
