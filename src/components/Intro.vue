<script setup>
import Title from "./Title.vue";

import onclick from '../assets/onclick.svg'
import call from '../assets/call.svg'
import gift from '../assets/gift.svg'
import pic from '../assets/pic.svg'
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
pic,
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
      <img src="../assets/one.png" class="w-10 sm:w-20" />
      <h2 class="text-2xl sm:text-4xl font-bold text-primary">
        兒童護眼檯燈第一品牌
      </h2>
    </div>
    <p
      class=" text-left max-w-[720px] text-sm sm:text-base mx-auto leading-loose sm:px-0 px-8 py-4 "
    >
    喜光領導團隊擁有三十年照明專業經驗，一路走來堅持「優質好光，呵護健康」。<br />
嚴格把關光的品質、用心研發最懂你的燈、打造舒適的用光環境。
喜光全光譜護眼科技，專為孩子閱讀設計，避免孩子從小近視，先從環境調整。
還有獨家PLF光濾淨技術、博物館等級高演色性、無藍光危害、防眩光、無頻閃、國際認證AA級照度，眼科院長權威推薦最安心。
  </p>
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
