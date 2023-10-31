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
import logo1 from "./assets/logo1.png";
import logo2 from "./assets/jk.png";
import logo3 from "./assets/logo3.png";

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

const floatBtns = ref([
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
]);

const onBtnClick = (type) => {
  dialogType.value = type;
  switch (type) {
    case "event":
      if(isDeadline.value) return
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

function debounce(func, delay = 250) {
  let timer = null;
 
  return function(...args) {
    let context = this;
 
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  }
}
// https://ledbackend.vercel.app

const getPhotos = async (size = 100) => {
  try {
    const res = await http.get(`https://ledbackend.vercel.app/getPhoto?page=1&size=${size}`);
    photos.value = res.data.data.data;
  } catch (err) {
    console.log(err);
  }
};

const isDeadline = ref(false)

onMounted(async() => {
  await getPhotos(100);
  // setTimeout(async () => {
  //   await getPhotos(2);
  // })
  // await getPhotos(1);
  if(new Date().getTime() > new Date('2023-10-21 00:00:00').getTime()) {
    floatBtns.value[0].title = '報名已截止'
    isDeadline.value = true
  }
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

function handleScroll() {
  var scrollPosition = window.scrollY || window.pageYOffset;

  if(scrollPosition > 50) {
    floatClass.value = 'sm:flex-col asdf flex-col top-[10vh] right-[16px] left-[unset] -translate-x-0'
  } else {
    floatClass.value = 'md:flex-col xs:flex-row top-[500px] sm:top-[10vh] sm:left-[unset] sm:right-[16px] left-1/2 sm:left-[unset] -translate-x-1/2 sm:-translate-x-[unset]'
  }

}

window.addEventListener('scroll', handleScroll);
const timeout = ref()


function checkActivity() {

  floatClass.value = `${floatClass.value}`
  var scrollPosition = window.scrollY || window.pageYOffset;
  if(scrollPosition < 50) return
  clearTimeout(timeout.value);
   timeout.value = setTimeout(function () {
    floatClass.value = `${floatClass.value} opacity-20`
    }, 1000);
  
}
document.addEventListener('keydown', debounce(checkActivity));
document.addEventListener('scroll', debounce(checkActivity));
document.addEventListener('mousedown', debounce(checkActivity));
document.addEventListener('mousemove', debounce(checkActivity));

onMounted(() => {
  window.scrollTo({
    left: 0,
    top: 1,
  })
})

const fontFamily = {
  fontFamily: `"Lucida Grande","Helvetica","Arial","微軟正黑體修正","微軟正黑體",sans-serif`
}

const p1_list_light = [
  {
    name: '黃O吉',
    kid: 'Casper'
  },
  {
    name: '王O萱',
    kid: '小可愛'
  },
  {
    name: '蘇O州',
    kid: '蘇祐民'
  },
  {
    name: '劉O寧',
    kid: '小蘋果小博士'
  },
  {
    name: '林O惠',
    kid: 'Wayne'
  },
]
const p1_list_park = [
  {
    name: '廖O怡',
    kid: '昀倢'
  },
  {
    name: '王O瑋',
    kid: '土豆'
  },
  {
    name: '柯O恩',
    kid: '喬喬'
  },
  {
    name: '鄭O燕',
    kid: '樂樂小獵豹'
  },
  {
    name: '陳O君',
    kid: '阿蓁護眼小博士'
  },
  {
    name: '蔡O芸',
    kid: '咪乓'
  },
  {
    name: '黃O旋',
    kid: '霓霓護眼小博士'
  },
  {
    name: '陳O琳',
    kid: '華琳護眼小博士'
  },
  {
    name: '張O倫',
    kid: '桐桐'
  },
  {
    name: '古O晴',
    kid: '小嬡'
  },
]
const p1_list_house = [
  {
    name: '劉O梅',
    kid: '漢堡'
  },
  {
    name: '呂O蓁',
    kid: '彩緹'
  },
]
const p1_list_beyond = [
  {
    name: '呂O婷',
    kid: '恩恩'
  },
  {
    name: '陳O琪',
    kid: '糖果兔'
  },
  {
    name: '張O彥',
    kid: 'Billy張'
  },
  {
    name: '黃O婷',
    kid: '阿肥仔兄妹二人組'
  },
  {
    name: '黃O涵',
    kid: '我是眼科小醫生'
  },
  {
    name: '林O慧',
    kid: '星星'
  },
  {
    name: '張O旻',
    kid: '小妤兒'
  },
  {
    name: '温O美',
    kid: '芯芯'
  },
  {
    name: '尤O如',
    kid: '云云護眼小博士'
  },
  {
    name: '劉O茹',
    kid: '樂樂'
  },
]
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
      ref="btns"
      class="fixed gap-4 z-10 transition duration-300 flex items-center justify-center"
      :class="floatClass"
    >
      <div
        @click="onBtnClick(i.value)"
        class="float-btn"
        :style="isDeadline && i.value === 'event' && 'background: gray;cursor: not-allowed;font-size: 12px;'"
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
    <v-dialog offset="200" v-model="winnersDialog" class="relative" width="auto">
      <v-card class="rounded-lg overflow-visible relative overflow-auto">
        <div
          class="w-[90vw] sm:w-[600px] relative p-10 h-[80vh] sm:h-[560px]"
        >
        <div class="flex flex-col items-center gap-4  overflow-y-scroll h-[70vh] sm:h-[480px] mb-10">
          <div
            class="flex flex-col w-full items-start justify-center gap-4 mx-auto mb-10"
          >
            <p><span class="font-bold text-lg">第一階段獎項：</span><br/><br/>
              <span class="font-bold">(1) 喜光全光譜兒童護眼檯燈</span><br/>
中獎人數：5人，每人可得<span class="font-bold text-primary">『全光譜兒童護眼檯燈乙台』＋『網紅同款-限量護眼小博士暱稱吊牌乙個』
</span><br/><br/>
<p class="text-sm text-gray-500">
  全光譜兒童護眼檯燈-蓋亞白<br/>
全光譜兒童護眼檯燈-樂芙白NEO<br/>
全光譜兒童護眼檯燈-樂芙白<br/>
</p>
<span class="text-red-500 text-xs">＊以上三款隨機出貨</span>
<br/>
<span class="text-red-500 text-xs">＊限量吊牌為電繡客製．暱稱同上傳照片時所填寫之護眼小博士暱稱</span>
</p>

<div class="flex flex-col gap-2 border  rounded-lg overflow-hidden">
  <div class="flex flex-row text-sm font-bold border-b bg-[#f3f3f3]">
  <span class="block w-40 pl-4 pt-2 pb-2">得獎者姓名</span>
  <span class="block w-40 pt-2 pb-2">小博士暱稱</span>
</div>

<div v-for="i in p1_list_park" class="flex py-1 items-center justify-center flex-row text-sm ">
  <span class="block w-40 pl-4">{{ i.name }}</span>
  <span class="block w-40">{{ i.kid }}</span>
</div>
</div>


<p>
              <span class="font-bold">(2) 大魯閣遊戲愛樂園入場券</span><br/>
中獎人數：10人，每人可得<span class="font-bold text-primary">『入場券 1 張』</span><br/><br/>
<p class="text-sm text-gray-500">
  使用期限：<br/>
  2023年10月31日～ 2024年06月30日
</p>
<br/>
<p class="text-sm text-gray-500">
  使用辦法：<br/>
  不限身高12歲以下：中壢中原萌獸公園店、中壢大潤發海洋公園店、新竹湳雅糖果公園店、台中新時代魔法公園店、高雄夢時代樹屋公園店、高雄Kuroro星際公園店
<br/>
限身高128公分以下：台北信義A8店、台北天母店、台南南紡店、高雄左營店<br/>
</p>
<br/>
<p class="text-sm text-gray-500">
  遊玩時間：<br/>
  平日不限時，假日限時兩小時
<br/>
</p>
</p>

<div class="flex flex-col gap-2 border  rounded-lg overflow-hidden">
  <div class="flex flex-row text-sm font-bold border-b bg-[#f3f3f3]">
  <span class="block w-40 pl-4 pt-2 pb-2">得獎者姓名</span>
  <span class="block w-40 pt-2 pb-2">小博士暱稱</span>
</div>

<div v-for="i in p1_list_park" class="flex py-1 items-center justify-center flex-row text-sm ">
  <span class="block w-40 pl-4">{{ i.name }}</span>
  <span class="block w-40">{{ i.kid }}</span>
</div>
</div>

<p>
              <span class="font-bold">(3) 晶工</span><br/>
中獎人數：2人，每人可得<span class="font-bold text-primary">『晶工小家電乙台』</span><br/>
<p class="text-gray-500 text-sm ">
  美式咖啡壺JK-917
<br/>
9L電烤箱 JK-709
<br/>
<span class="text-red-500 text-xs">＊以上兩款隨機出貨，不可挑選品項</span>
</p>
</p>

<div class="flex flex-col gap-2 border  rounded-lg overflow-hidden">
  <div class="flex flex-row text-sm font-bold border-b bg-[#f3f3f3]">
  <span class="block w-40 pl-4 pt-2 pb-2">得獎者姓名</span>
  <span class="block w-40 pt-2 pb-2">小博士暱稱</span>
</div>

<div v-for="i in p1_list_house" class="flex py-1 items-center justify-center flex-row text-sm ">
  <span class="block w-40 pl-4">{{ i.name }}</span>
  <span class="block w-40">{{ i.kid }}</span>
</div>
</div>

<p>
              <span class="font-bold">(4) Beyond Time</span><br/>
中獎人數：10人，每人可得<span class="font-bold text-primary">『胺基酸多元潔顏慕斯150ml乙罐』</span><br/>

</p>

<div class="flex flex-col gap-2 border  rounded-lg overflow-hidden">
  <div class="flex flex-row text-sm font-bold border-b bg-[#f3f3f3]">
  <span class="block w-40 pl-4 pt-2 pb-2">得獎者姓名</span>
  <span class="block w-40 pt-2 pb-2">小博士暱稱</span>
</div>

<div v-for="i in p1_list_beyond" class="flex py-1 items-center justify-center flex-row text-sm ">
  <span class="block w-40 pl-4">{{ i.name }}</span>
  <span class="block w-40">{{ i.kid }}</span>
</div>
</div>
<br/>
          </div>
          <Btn @click="winnersDialog = false" class="w-full">確定</Btn>
        </div>

          
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
          <div class="mx-auto w-full text-center font-bold my-4 sm:my-10">
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
          <img class="sm:block hidden" src="./assets/banner_2.png" />
          <img class="block sm:hidden" src="./assets/banner_2_m.png" />
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
        <div class="flex-row flex sm:gap-2 text-primary">護眼小博士</div>
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

      <div class="flex  max-w-[720px] mx-auto gap-4 px-4 sm:px-0">
      <img :src="logo1" class="h-[60px] sm:h-[80px] mx-auto"/>
      <img :src="logo2" class="h-[60px] sm:h-[80px] mx-auto"/>
      <img :src="logo3" class="h-[80px] sm:h-[100px] mx-auto"/>
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
