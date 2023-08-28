<script setup lang='ts'>
import { IPost } from '../models/post.model'
import PostModal from './PostModal.vue'
import { capitalize } from '../utils/capitalize';

interface IPostCardProps {
    post: IPost
}

defineProps<IPostCardProps>()

</script>

<template>
    <h4 class='text-center text-xl font-bold text-gray-500 mb-5'>
        {{ capitalize(post.title) }}
    </h4>
    <div>
        {{ capitalize(post.body) }}
    </div>
    <div class='bottom-0 relative mt-auto'>
        <PostModal :post='post' />
    </div>
</template>