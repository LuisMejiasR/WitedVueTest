<script setup lang='ts'>
import { IPostsResponse } from '../models/post.model'
import PostCard from '../components/PostCard.vue'

defineProps<IPostsResponse>()
</script>

<template>
    <div class='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3'>
        <div v-for='post in postsArr' class='rounded p-3 shadow-md flex flex-col items-center'>
            <PostCard :post='post' />
        </div>
    </div>
</template>