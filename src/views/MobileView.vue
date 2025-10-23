<script setup>
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

//データベースURL
const supabaseUrl = 'https://vbotsoegyhgiiauxegav.supabase.co'
//データベースkey
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZib3Rzb2VneWhnaWlhdXhlZ2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNzkyNTYsImV4cCI6MjA3Njc1NTI1Nn0.1AQJ_UILjbxdr20_Cl_GgTeUJDwedMRrNlzPaUKQRGM' // Supabaseの設定画面「Project Settings → API」にある
const supabase = createClient(supabaseUrl, supabaseKey)

const menus = ref([])

const getMenu = async () => {
  const { data, error } = await supabase.from('menu').select('*')
  if (error) {
    console.error(error)
  } else {
    menus.value = data
    console.log(data)
  }
}

onMounted(() => {
    getMenu()
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-2">メニュー一覧</h1>
    <div v-if="menus.length === 0">読み込み中...</div>
    <ul>
      <li v-for="menu in menus" :key="menu.id" class="mb-3 border p-2 rounded">
        <img v-if="menu.image_url" :src="menu.image_url" width="200px"/>
        <p class="font-semibold">{{ menu.name }}</p>
        <p>¥{{ menu.price }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>
