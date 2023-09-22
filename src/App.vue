<script setup>
import { reactive, onMounted, ref } from "vue";
import Btn from "./components/Btn.vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import Steps from "./components/Steps.vue";
import Intro from "./components/Intro.vue";
import Enroll from "./components/Enroll.vue";
import Upload from "./components/Upload.vue";
import Footer from "./components/Footer.vue";
import http from "./http";
import Notify from "./components/Notify.vue";
import logo from "./assets/sylstarlogo.png";

const showLoading = ref(false);
const winnersDialog = ref(false);
const dialog = ref(false);
const upload = ref(false);
const successDialog = ref(false);
const successMsg = ref("");
const dialogType = ref("");
const notifyDialog = ref(false);
const modalDialog = ref(false);
const errorDialog = ref(false);
const errorMsg = ref("");

const openErrorDialog = (msg) => {
  errorMsg.value = msg;
  errorDialog.value = true;
  setTimeout(() => {
    errorDialog.value = false;
  }, 1500);
};

const floatBtns = [
  {
    title: "點我報名",
    value: "event",
  },
  {
    title: "上傳照片",
    value: "upload",
  },
  {
    title: "得獎名單",
    value: "winners",
  },
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
    case "winners":
      winnersDialog.value = true;
      break;
  }
};

const photos = ref([]);

const getPhotos = async () => {
  try {
    const res = await http.get(`https://ledbackend.vercel.app/getPhoto?page=1&size=10`);
    photos.value = res.data.data.data;
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  getPhotos();
});

const onClickEnroll = async (data) => {
  showLoading.value = true;
  try {
    // await http.post("https://ledbackend.vercel.app/enroll", data);
    await http.post('https://ledbackend.vercel.app/enroll', data)
    showLoading.value = false;
  } catch (err) {
    showLoading.value = false;
    openErrorDialog(err?.data?.message ?? "不明錯誤，請聯繫活動主辦單位。");
    return;
  }
  dialog.value = false;
  successDialog.value = true;
  successMsg.value =
    "您已報名喜光護眼小博士活動，請等候主辦單位與您電話聯繫。<br>並請在收到活動道具後，於2023/10/27前上傳活動照片。";
};

const onClickUpload = async (data) => {
  showLoading.value = true;
  try {
    await http.post(
      `https://ledbackend.vercel.app/upload?mobile=${data.mobile}&doctor_name=${data.doctor_name}`,
      {
        file: data.file,
      }
    );
    showLoading.value = false;
  } catch (err) {
    showLoading.value = false;
    openErrorDialog(err?.data?.message ?? "不明錯誤，請聯繫活動主辦單位。");
    return;
  }
  upload.value = false;
  successDialog.value = true;
  successMsg.value = "照片需等候主辦單位審核，審核無誤將會露出於活動頁";
};
const modalPhoto = ref();
const modalName = ref('');
const onClickModal = (photoUrl, name) => {
  modalPhoto.value = photoUrl;
  modalName.value = name;
  modalDialog.value = true;
};

const floatClass = ref("");
const isScrolling = ref(false);

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY || window.pageYOffset;

  if (scrollPosition > 0) {
    floatClass.value = "sm:opacity-20";
    isScrolling.value = true;
  } else {
    floatClass.value = "";
  }
});

const lastScrollPosition = ref(window.scrollY || window.pageYOffset);

function handleScroll() {
  var scrollPosition = window.scrollY || window.pageYOffset;

  if (scrollPosition > lastScrollPosition.value) {
    floatClass.value = "opacity-20";
  } else {
    floatClass.value = "";
  }

  lastScrollPosition.value = scrollPosition;
}

window.addEventListener("scroll", handleScroll);

const fontFamily = {
  fontFamily: `"Lucida Grande","Helvetica","Arial","微軟正黑體修正","微軟正黑體",sans-serif`
}
</script>

<template>
  <div>
    <a
      href="https://www.sylstarled.com.tw/V2/Login/Index/?rt=https%3a%2f%2fwww.sylstarled.com.tw%2fv2%2fVipMember%2fProfile&unLoginId=ba311df0-1253-4f60-94d4-44e9e68b3760&officialShopId=34501&reason=notlogin&authRedirectType=Default#/"
      target="_blank"
      class="bg-[#24b554] w-full block py-[7px] text-sm"
      ><span class="text-[#ffffff] text-[13px]" :style="fontFamily">
        加入會員｜官方Line 最高再領$250購物金🎁<i
          style="
            text-decoration: none;
            vertical-align: middle;
            margin: -3px 0 0 8px;
            font-size: 12px;
            font-weight: 600;
          "
          class="icon icon-slim-arrow-right"
        ></i></span
    ></a>

    <Teleport to="body">
    <div
      v-show="showLoading"
      class="fixed top-0 left-0 w-full h-full z-[99999] bg-gray-500 flex flex-col items-center justify-center"
    >
      <v-progress-circular
        :width="3"
        :color="'white'"
        indeterminate
        class="z-10"
        :size="100"
      ></v-progress-circular>
      <div class="text-white z-10 pt-6 leading-loose">處理中請稍候</div>
      <div class="bg-black opacity-50 absolute top-0 w-full h-full"></div>
    </div>
  </Teleport>

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
        <div
          class="w-[90vw] sm:w-[600px] relative p-10 h-[80vh] sm:max-h-[80vh]"
        >
          <Notify />

          <Btn @click="notifyDialog = false">確定</Btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- 出錯 -->
    <v-dialog v-model="errorDialog" class="relative" width="auto">
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div
          class="w-[90vw] text-center flex items-center justify-center flex-col sm:w-[300px] relative p-10"
        >
          <svg
            class="text-primary w-[100px] h-[100px] mx-auto fill-[#f1ac52]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            role="img"
            aria-hidden="true"
          >
            <path d="M13 14H11V9H13M13 18H11V16H13M1 21H23L12 2L1 21Z"></path>
          </svg>
          <p class="mt-2 font-bold">{{ errorMsg }}</p>

          <!-- <Btn @click="errorDialog = false">確定</Btn> -->
        </div>
      </v-card>
    </v-dialog>

    <!-- 報名 -->
    <v-dialog offset="200" v-model="dialog" class="relative" width="auto">
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div
          class="w-[90vw] sm:w-[600px] relative p-10 h-[80vh] sm:max-h-[80vh]"
        >
          <div
            @click="dialog = false"
            class="cursor-pointer absolute rounded-full w-8 h-8 flex items-center justify-center z-10 bg-[#ef5350] text-white right-4 top-2 sm:-right-4 sm:-top-4 left-[unset]"
          >
            X
          </div>

          <Enroll @onClickEnroll="onClickEnroll" />
        </div>
      </v-card>
    </v-dialog>

    <!-- 上傳照片 -->
    <v-dialog offset="200" v-model="upload" class="relative" width="auto">
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div
          class="w-[90vw] sm:w-[600px] relative p-10 h-[80vh] sm:max-h-[80vh]"
        >
          <div
            @click="upload = false"
            class="cursor-pointer absolute rounded-full w-8 h-8 flex items-center justify-center z-10 bg-[#ef5350] text-white right-4 top-2 sm:-right-4 sm:-top-4 left-[unset]"
          >
            X
          </div>

          <Upload
            @onClickUpload="onClickUpload"
            @openErrorDialog="openErrorDialog"
          />
        </div>
      </v-card>
    </v-dialog>

    <!-- winnersDialog -->
    <v-dialog
      offset="200"
      v-model="winnersDialog"
      class="relative"
      width="auto"
    >
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div class="w-[90vw] sm:w-[600px] relative p-10 max-h-[55vh]">
          <div
            class="flex flex-col items-center justify-center gap-4 mx-auto mb-10"
          >
            <p><span class="font-bold">第一階段獎項：</span><br/>
1. 喜光檯燈，共＊名<br/>
2.＊＊＊＊＊，共＊名
</p>
          </div>

          <Btn @click="winnersDialog = false">確定</Btn>
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
    <v-dialog offset="200" v-model="modalDialog" class="relative" width="auto">
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div
          @click="modalDialog = false"
          class="cursor-pointer absolute rounded-full w-8 h-8 flex items-center justify-center z-10 bg-[#ef5350] text-white right-4 top-2 sm:-right-4 sm:-top-4 left-[unset]"
        >
          X
        </div>
        <div
          class="w-[90vw] sm:w-[600px] relative p-10 h-[65vh] sm:max-h-[80vh]"
        >
          <div
            class="h-[40vh] aspect-[3/4] mx-auto bg-cover bg-center"
            :style="{ backgroundImage: 'url(' + modalPhoto + ')' }"
          ></div>
          <div class="mx-auto w-full text-center font-bold my-10">
            護眼小博士：{{ modalName }}
          </div>
          <Btn @click="modalDialog = false">確定</Btn>
        </div>
      </v-card>
    </v-dialog>

    <Carousel :autoplay="5000" :wrapAround="true">
      <Slide :key="2">
        <div class="carousel__item carousel__item--first">
          <img class="sm:block hidden" src="./assets/banner_1.png" />
          <img class="block sm:hidden" src="./assets/banner_1_m.png" />
        </div>
      </Slide>
      <Slide :key="1">
        <div class="carousel__item carousel__item--second">
          <img class="sm:block hidden" src="./assets/banner_1.png" />
          <img class="block sm:hidden" src="./assets/banner_1_m.png" />
        </div>
      </Slide>
    </Carousel>

    <Intro />
    <Steps />

    <div
      class="flex flex-row items-center justify-center mx-auto gap-5 sm:gap-10 py-10 sm:py-20 border-t border-primary border-dashed"
    >
      <img src="./assets/photo.svg" class="w-10 sm:w-20" />
      <h2 class="text-2xl sm:text-4xl font-bold text-primary">
        <div class="sm:flex-row flex-col flex sm:gap-2 text-primary"><span class="text-primary">第一階段</span>護眼小博士</div>
      </h2>
    </div>

    <!-- 護眼小博士 -->
    <div
      v-if="photos.length"
      class="grid grid-cols-2 sm:px-0 px-4 sm:grid-cols-4 gap-8 max-w-[1180px] mx-auto"
    >
      <div
        class="flex flex-col cursor-pointer hover:shadow-lg hover:scale-[1.05] transition duration-300 gap-4 items-center justify-center border border-[#555] rounded"
        v-for="i in photos"
        @click="onClickModal(i.photo, i.doctor_name)"
      >
        <div
          class="w-full aspect-[3/4] bg-cover bg-center"
          :style="{ backgroundImage: 'url(' + i.photo + ')' }"
        ></div>
        <div
          class="flex flex-col w-full gap-4 items-center justify-center text-sm sm:text-base px-4"
        >
          <span class="font-bold">{{ i.doctor_name }}</span>
          <div
            class="gap-2 text-gray bg-[#d9d9d9] mb-6 w-full rounded py-2 flex items-center justify-center"
          >
            <img src="./assets/eye.svg" class="w-5" />
            查看圖片
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full bg-[#efefef] items-center justify-center mt-20 pb-20"
    >
    <div class="flex flex-row mx-auto items-center justify-center py-10">

      <img src="./assets/star.png" class="w-10 sm:w-14" />
      <h2 class="text-2xl sm:text-4xl font-bold text-primary">活動贊助商</h2>
    </div>

      <div class="grid grid-cols grid-cols-3  max-w-[1180px] mx-auto gap-8 px-4 sm:px-0">
      <img :src="logo" class="max-h-[40px] mx-auto"   v-for="i in 3"/>
    </div>

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
  @apply h-auto sm:h-[80vh];
  max-height: 660px;
  background-color: var(--vc-clr-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
  img {
    @apply sm:w-full w-auto h-full sm:h-auto;

  }
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
