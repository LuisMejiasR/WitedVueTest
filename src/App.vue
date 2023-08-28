<script setup lang='ts'>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import axiosClient from './utils/axios'
import { usePostStore } from './stores/postStore'
import PageHeader from './components/PageHeader.vue'
import PostList from './components/PostList.vue'
import { IPost } from './models/post.model';

// pinia store
const postStore = usePostStore()
const { postsArr } = storeToRefs(postStore)
// search ref
const search = ref('')
const filteredPost = ref<IPost[]>([])
// pagination ref
const page = ref(1)
const postPerPage = ref(10)
const paginatedPost = ref<IPost[]>([])

// async fn calling axios and setting state of pinia store
const fetchPosts = async () => {
  try {
    const response = await axiosClient.get('/')
    postStore.loadPost(response.data)
  } catch (error) {
    console.log(error)
  }
}

// fn to search posts from user input
const filterPosts = () => {
  filteredPost.value = postsArr.value.filter((post) => post.title.toLowerCase().includes(search.value.toLowerCase()))
}

// fn to slice the array of post to show new pages
const slicePostArr = (currentPost: IPost[]) => {
  const firtIndex = (page.value - 1) * postPerPage.value
  const lastInex = page.value * postPerPage.value
  paginatedPost.value = currentPost.slice(firtIndex, lastInex)
}

const changePage = (newPage: number) => {
  page.value = newPage
}

// when component mounts, call fn to fetch posts
onMounted(() => {
  fetchPosts()
})

watch([postsArr, page], () => {
  slicePostArr(postsArr.value)
})
</script>

<template>
  <PageHeader />
  <div class='max-auto px-6'>
    <div class='mb-8'>
      <input type=' text' class='border border-gray-300 rounded w-full p-2 px-4' placeholder='Buscar post'
        @input='filterPosts' v-model='search'>
    </div>
    <div v-if='filteredPost.length === 0 && search.length > 0' class='flex flex-col items-center shadow-md mb-6'>
      <span class='mb-4 font-semibold text-lg'>
        No encontramos lo que estabas buscando...
      </span>
      <span class='mb-4 font-semibold text-xl'>
        Mira estos otros post que te podrían interesar:
      </span>
    </div>
    <div class='mb-8 flex justify-center space-x-6'>
      <button @click='() => changePage(page - 1)'
        class='border border-gray-300 rounded px-8 py-1 hover:bg-gray-200'>Anterior</button>
      <button @click='() => changePage(page + 1)'
        class='border border-gray-300 rounded px-8 py-1 hover:bg-gray-200'>Siguiente</button>
    </div>
    <PostList :postsArr='paginatedPost' />
    <div class='my-8 flex justify-center space-x-6'>
      Numero total de post: {{ postsArr.length }}
    </div>
  </div>
</template>
