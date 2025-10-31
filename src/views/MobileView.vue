<script setup>
import { ref, onMounted } from 'vue'
import { createClient } from '@supabase/supabase-js'

// Supabase 接続
const supabaseUrl = 'https://vbotsoegyhgiiauxegav.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZib3Rzb2VneWhnaWlhdXhlZ2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNzkyNTYsImV4cCI6MjA3Njc1NTI1Nn0.1AQJ_UILjbxdr20_Cl_GgTeUJDwedMRrNlzPaUKQRGM'
const supabase = createClient(supabaseUrl, supabaseKey)

// メニュー一覧
const menus = ref([])

// メニュー取得
const getMenu = async () => {
  const { data, error } = await supabase.from('menu').select('*')
  if (error) console.error(error)
  else menus.value = data
}

// 注文送信
const sendOrder = async (menu_id, quantity = 1) => {
  const { data, error } = await supabase.from('order').insert([{ menu_id, quantity }])
  

  if (error) {
    console.error('注文送信エラー:', error)
    alert('注文失敗！')
  } else {
    console.log('注文送信完了:', data)
    alert('注文完了！')
  }
}

onMounted(() => {
  getMenu()
})
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">メニュー一覧</h1>
    <div v-if="menus.length === 0">読み込み中...</div>
    <ul>
      <li v-for="menu in menus" :key="menu.id" class="mb-3 border p-2 rounded">
        <img v-if="menu.image_url" :src="menu.image_url" width="200px"/>
        <p class="font-semibold">{{ menu.name }}</p>
        <p>¥{{ menu.price }}</p>
        <button
          @click="sendOrder(menu.id)"
          class="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          注文する
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>
