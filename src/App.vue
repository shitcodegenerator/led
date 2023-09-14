<script setup>
import { reactive, onMounted, ref } from "vue";
import Title from "./components/Title.vue";
import Btn from "./components/Btn.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import scrollReveal from "scrollreveal";
import Steps from "./components/Steps.vue";
import Enroll from "./components/Enroll.vue";
import Upload from "./components/Upload.vue";
import Footer from "./components/Footer.vue";
import Notify from "./components/Notify.vue";

const dialog = ref(false);
const upload = ref(false);
const successDialog = ref(false);
const successMsg = ref("");
const dialogType = ref("");
const notifyDialog = ref(false);
const modalDialog = ref(false);
const errorDialog = ref(false);
const errorMsg = ref('');

const openErrorDialog = (msg) => {
  errorMsg.value = msg
  errorDialog.value = true
  setTimeout(() => {
    errorDialog.value = false
  }, 1500)
}

const floatBtns = [
  {
    title: "點我報名",
    value: "event",
  },
  {
    title: "上傳照片",
    value: "upload",
  },
  // {
  //   title: "得獎名單",
  //   value: "winners",
  // },
  {
    title: "注意事項",
    value: "notification",
  },
];

const onBtnClick = (type) => {
  dialogType.value = type;
  switch (type) {
    case "event":
      dialog.value = true;
      break;
    case "upload":
      upload.value = true;
      break;
    case "notification":
      notifyDialog.value = true;
      break;
  }
};

const isAgreeEvent = ref(true);
const isError = ref(false);

const onClickEnroll = () => {
  console.log('click')
  dialog.value = false;
  successDialog.value = true;
  successMsg.value =
    "您已報名喜光護眼小博士活動，請等候主辦單位與您聯繫。<br>並請在收到活動道具後，於2023/10/27前上傳活動照片。";
};

const onClickUpload = () => {
  upload.value = false;
  successDialog.value = true;
  successMsg.value = "照片需等候主辦單位審核，審核無誤將會露出於活動頁";
};

const check = () => {
  if (isAgreeEvent.value) {
    isError.value = false;
  }
};

const onClickModal = (i) => {
  modalDialog.value = true
}

const floatClass = ref('')
const isScrolling = ref(false)

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY || window.pageYOffset;

  if (scrollPosition > 0) {
    floatClass.value = 'sm:opacity-20'
    isScrolling.value = true
  } else {
    floatClass.value = ''
  }
});

const lastScrollPosition = ref(window.scrollY || window.pageYOffset);

function handleScroll() {
  var scrollPosition = window.scrollY || window.pageYOffset;

  if (scrollPosition > lastScrollPosition.value) {
    floatClass.value = 'opacity-20'
  } else {
    floatClass.value = ''
  }

  lastScrollPosition.value = scrollPosition;
}

window.addEventListener('scroll', handleScroll);
</script>

<template>
  <div>
    <!-- FLOAT BTNS -->
    <div
      class="fixed top-1/4 gap-4 right-1 sm:right-10 z-10 flex items-center flex-col justify-center"
      :class="floatClass"
    >
      <div
        @click="onBtnClick(i.value)"
        class="float-btn"
        v-for="i in floatBtns"
        :key="i.value"
      >
        {{ i.title }}
      </div>
    </div>

    <!-- 注意事項 -->
    <v-dialog offset="200" v-model="notifyDialog" class="relative" width="auto">
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div class="w-[90vw] sm:w-[600px] relative p-10 h-[95vh] sm:max-h-[80vh]">
          <Notify />

          <Btn @click="notifyDialog = false">確定</Btn>
        </div>
      </v-card>
    </v-dialog>

      <!-- 出錯 -->
      <v-dialog offset="0" v-show="errorDialog" v-model="errorDialog" class="relative" width="auto">
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div class="w-[90vw] text-center flex items-center justify-center flex-col  sm:w-[300px] relative p-10 ">
          <svg class="text-primary w-[100px] h-[100px] mx-auto fill-[#f1ac52]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"></path></svg>
          <p class="mt-2 font-bold">{{ errorMsg  }}</p>

          <!-- <Btn @click="errorDialog = false">確定</Btn> -->
        </div>
      </v-card>
    </v-dialog>

    

    <!-- 報名 -->
    <v-dialog offset="200" v-model="dialog" class="relative" width="auto">
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div class="w-[90vw] sm:w-[600px] relative p-10 h-[95vh] sm:max-h-[80vh]">
          <div
            @click="dialog = false"
            class="cursor-pointer absolute rounded-full w-8 h-8 flex items-center justify-center z-10 bg-[#ef5350] text-white -right-4 -top-4 left-[unset]"
          >
            X
          </div>

          <Enroll @onClickEnroll="onClickEnroll" @openErrorDialog="openErrorDialog" />

          
        </div>
      </v-card>
    </v-dialog>

    <!-- 上傳照片 -->
    <v-dialog offset="200" v-model="upload" class="relative" width="auto">
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div class="w-[90vw] sm:w-[600px] relative p-10 h-[95vh] sm:max-h-[80vh]">
          <div
            @click="upload = false"
            class="cursor-pointer absolute rounded-full w-8 h-8 flex items-center justify-center z-10 bg-[#ef5350] text-white -right-4 -top-4 left-[unset]"
          >
            X
          </div>

          <Upload @onClickUpload="onClickUpload" @openErrorDialog="openErrorDialog" />

          

          
        </div>
      </v-card>
    </v-dialog>

    <!-- 成功 -->
    <v-dialog
      offset="200"
      v-model="successDialog"
      class="relative"
      width="auto"
    >
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div class="w-[90vw] sm:w-[600px] relative p-10 max-h-[55vh]">
          <div
            class="flex flex-col items-center justify-center gap-4 mx-auto mb-10"
          >
            <img src="./assets/check.svg" />
            <h5 class="text-3xl font-bold text-primary">報名成功</h5>
            <p v-html="successMsg" class="text-[#666] leading-loose"></p>
          </div>

          <Btn @click="successDialog = false">確定</Btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- 照片 -->
    <v-dialog
      offset="200"
      v-model="modalDialog"
      class="relative"
      width="auto"
    >
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div
            @click="modalDialog = false"
            class="cursor-pointer absolute rounded-full w-8 h-8 flex items-center justify-center z-10 bg-[#ef5350] text-white -right-4 -top-4 left-[unset]"
          >
            X
          </div>
        <div class="w-[90vw] sm:w-[600px] relative p-10 h-[65vh] sm:max-h-[80vh]">
          <div
          class="h-[40vh] aspect-[3/4] mx-auto bg-cover bg-center"
          style="
            background-image: url('https://lh3.google.com/u/0/d/1_JeJjpqN5N3Y72dHIGsm9IiKJyYBLD-Y=w2778-h1834-iv1');
          "
        ></div>
        <div class="mx-auto w-full text-center font-bold my-10">護眼小博士：{{ '花枝丸' }}</div>
          <Btn @click="modalDialog = false">確定</Btn>
        </div>
      </v-card>
    </v-dialog>

    <Carousel  :autoplay="2000" :wrapAround="true">
      <Slide :key="2">
        <div class="carousel__item carousel__item--first">
          <img src="./assets/banner_1.webp" />
        </div>
      </Slide>
      <Slide :key="1">
        <div class="carousel__item carousel__item--second">
          <img src="./assets/banner_2.webp" />
        </div>
      </Slide>
    </Carousel>

    <Steps />

    <div class="flex flex-row items-center justify-center mx-auto gap-5 sm:gap-10 py-10 sm:py-20 border-t border-primary border-dashed">
      <img src="./assets/photo.svg" class="w-10 sm:w-20" />
      <h2 class="text-3xl sm:text-4xl font-bold text-primary">第一階段 喜光護眼小博士</h2>
    </div>

    <!-- 護眼小博士 -->
    <div class="grid grid-cols-2 sm:px-0 px-4 sm:grid-cols-4 gap-8 max-w-[1180px] mx-auto">
      <div
      @click="onClickModal"
        class="flex flex-col cursor-pointer hover:shadow-lg hover:scale-[1.05] transition duration-300 gap-4 items-center justify-center border border-[#555] rounded"
        v-for="i in 20"
      >
        <div
          class="w-full aspect-[3/4] bg-cover bg-center"
          style="
            background-image: url('https://lh3.google.com/u/0/d/1_JeJjpqN5N3Y72dHIGsm9IiKJyYBLD-Y=w2778-h1834-iv1');
          "
        ></div>
        <div class="flex flex-col w-full gap-4 items-center justify-center px-4">
          <span class="font-bold">花枝丸小博士</span>
        <div class="gap-2  text-gray bg-[#d9d9d9] mb-6  w-full rounded py-2 flex items-center justify-center">
          <img src="./assets/eye.svg" class="w-5"/>
          查看圖片</div>
        </div>
      </div>
    </div>

      <div class="w-full bg-[#efefef] flex flex-row items-center justify-center mt-20">
      <img src="./assets/star.png" class="w-10 sm:w-14" />
      <h2 class="text-3xl sm:text-4xl font-bold text-primary">活動贊助商</h2>
    </div>

    <Footer />
  </div>
</template>

<style lang="scss">
.float-btn {
  @apply leading-[1.25] font-bold sm:p-0 p-2 w-[60px] h-[60px] sm:w-[90px] flex shadow-lg sm:h-[90px] cursor-pointer hover:scale-[1.1]  transition duration-300 flex items-center justify-center  text-primary border border-primary backdrop-blur-lg bg-white/60  rounded-full;
  &:first-of-type {
    @apply bg-primary text-white border-white;
  }
}

.carousel__item {
  // min-height: 50vh;
  width: 100%;
  background-color: var(--vc-clr-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.carousel__slide {
  /* padding: 10px; */
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
