<script setup>
import onclick from '../assets/onclick.svg'
import call from '../assets/call.svg'
import gift from '../assets/gift.svg'
import eyetest from '../assets/eyetest.png'
import upload from '../assets/upload.svg'
import fb from '../assets/fbig.svg'

const steps = [
  `按右方「點我報名」，填寫報名資料`,
  `主辦單位以電話確認資料無誤後，會寄送活動道具，包含：小博士醫師袍(140cm)+視力測量表+遮眼板`,
  `收到活動道具後，拍攝喜光護眼小博士為家人測量視力畫面`,
  `上傳至個人FB或IG限時動態並@喜光官方社群，上傳後截圖`,
  `回到活動頁按右方「上傳照片」後將截圖上傳`,
  `完成上述活動步驟，方擁有抽獎資格，祝您幸運中獎！`,
];

const stepsCircle = [
  `點擊右方按鈕<br>「點我報名」`,
  `主辦單位電話確認資料<br>並寄送活動道具`,
  `收到道具後<br>依照指示拍攝指定畫面`,
  `上傳至個人 FB 或 IG 限時動態<br>@喜光官方社群，上傳後截圖`,
  `回到活動頁按右方「上傳照片」<br>上傳步驟四之截圖`,
  `完成上述步驟獲得抽獎資格<br>祝您幸運中獎！`,
];
const images = [
onclick,
call,
eyetest,
fb,
upload,
gift,
]
</script>
<template>
  <div class="max-w-[1180px] mx-auto pb-10">
    <div
      class="flex flex-row items-center justify-center mx-auto gap-5 sm:gap-10 my-10 sm:my-20"
    >
      <img src="../assets/event.png" class="w-10 sm:w-20" />
      <h2 class="text-3xl sm:text-4xl font-bold text-primary">
        活動報名步驟
      </h2>
    </div>
    <ul
      class="list-disc text-left max-w-[720px] mx-auto leading-loose sm:px-0 px-8 bg-[#d5efff80] py-4 rounded text-sm sm:text-base"
    >
      <li v-for="(content, index) in steps">
        <span class="font-bold">STEP {{ index + 1 }}：</span>
        {{ content }}
      </li>
    </ul>

    <div
      class="mt-20 gap-0 sm:gap-10 grid grid-cols-3 mx-auto items-center juesitfy-center"
    >
      <div v-for="(i, index) in stepsCircle" class="steps">
        <div class="w-20 h-20 rounded-full ">
          <img :src="images[index]"/>
        </div>
        <div class="font-bold">STEP {{ index + 1 }}</div>
        <p class="w-3/4 text-gray sm:text-sm text-xs" v-html="i"></p>
      </div>
    </div>
  </div>

  <div class="mt-10 bg-[#efefef] pt-10 pb-10 sm:pb-20">
    <h2 class="text-2xl font-bold text-gray pb-10">上傳照片範例及社群連結</h2>

    <div class="flex flex-row gap-8 max-w-[720px] mx-auto">
      <div class="flex flex-col items-center gap-2 justify-center flex-1">
        <a class="text-[#666] font-bold flex items-center gap-2" href="https://www.facebook.com/sylstarled" target="_blank">
          <img src="../assets/fb.png" class="w-6"/>Facebook</a>
        <img
          class="w-3/4 rounded-md  bg-cover bg-center"
          src="../assets/fb_ex.png"
        />
      </div>

      <div class="flex flex-col items-center gap-2 justify-center flex-1">
        <a class="text-[#666] font-bold flex items-center gap-2" href="https://www.instagram.com/sylstarled" target="_blank">
          <img src="../assets/instagram.png" class="w-6"/>Instagram</a>
        <img
          class="w-3/4 rounded-md  bg-cover bg-center"
          src="../assets/ig.png"
        />
      </div>


    </div>
  </div>
</template>

<style lang="scss" scoped>
.steps {
  @apply flex relative flex-col items-center justify-start flex-1 h-full;
  &:first-child,
  &:nth-child(2),
  &:nth-child(3) {
    @apply mb-10;
  }
  &:nth-child(1)::before,
  &:nth-child(2)::before,
  &:nth-child(4)::before,
  &:nth-child(5)::before {
    @apply w-8 sm:w-10 bg-contain bg-center h-10 absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2;
    content: "";
    background-image: url("../assets/right.png");
  }
}
</style>
