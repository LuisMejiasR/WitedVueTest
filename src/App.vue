<script setup lang="ts">
import { onMounted, ref } from 'vue'

import PageHeader from "./components/PageHeader.vue"
import axiosClient from './utils/axios'

import { IPost } from './models/post.model'

const posts = ref<IPost[]>([])

const fetchPosts = async () => {
  try {
    const { data } = await axiosClient.get('/')
    posts.value = data
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <PageHeader />
  <div v-for="post in posts">
    {{ post.title }}
  </div>
</template>
