<script setup>
import { ref, computed } from "vue";

const message = computed(() => {
    return "Hello! <strong>" + myname.value + "</strong>";
});
const welcomeColor = ref("red");
const myname = ref(""); // ここでmynameを定義
</script>

<template>
    <div>
        <h1>Vue 3</h1>
        <p>お名前は?? : <input type="text" size="30" v-model="myname" /></p>
        <p
            v-html="message"
            :style="{ 'background-color': welcomeColor, color: white }"
        ></p>
    </div>
</template>
