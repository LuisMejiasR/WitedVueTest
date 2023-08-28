<script setup lang='ts'>
import { ref } from 'vue'
import { IPost } from '../models/post.model';

interface IPostModal {
    post: IPost
}

defineProps<IPostModal>()

const open = ref(false)

</script>
<template>
    <div class='flex flex-col items-center'>
        <button @click='open = !open' type='button'
            class='mt-3 py-2 px-6 btn bg-blue-600 text-white font-semibold rounded-xl btn-small btn-tertiary hover:bg-blue-700'>
            Más detalles...
        </button>
    </div>
    <div v-if='open' @click='open = false'
        class='fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center items-center z-50'>
        <div class='bg-white p-10 rounded-lg relative mx-auto w-auto max-w-lg flex-row justify-center items-center '>
            <div class=''>
                <span class='font-bold'>Titulo del post: </span>
                {{ post.title }}
            </div>
            <div class=''>
                <span class='font-bold'>Cuerpo del post: </span>
                {{ post.body }}
            </div>
            <div class=''>
                <span class='font-bold'>Id del post: </span>
                {{ post.id }}
            </div>
            <div class=''>
                <span class='font-bold'>Id del autor: </span>
                {{ post.userId }}
            </div>
            <div class='flex justify-center items-center mt-5'>
                <button @click='open = !open'
                    class='mt-3 py-2 px-40 w-auto bg-blue-400 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600'>
                    Cerrar
                </button>
            </div>
        </div>
    </div>
    <div v-if='open' @click='open = false' class='fixed z-40 inset-0 opacity-25 bg-black'></div>
</template>