<script setup>
import { ref, watch } from "vue";
import downIcon from '../assets/down.svg'
import Btn from "../components/Btn.vue";

const emit = defineEmits(['onClickUpload', 'openErrorDialog'])

const isHidden = ref(true)

const form = ref([
  {
    label: "護眼小博士暱稱",
    value: "",
    required: true,
    rules: (value) => {
      return value !== ''
    },
    errorMsg: '請輸入護眼小博士暱稱',
    isError: false,
    maxlength: 20,
    placeholder: "小博士暱稱將會公開於活動頁，以供識別",
  },
  {
    label: "報名者手機",
    value: "",
    required: true,
    rules: (value) => {
      const regex = /^09\d{8}$/
      console.log(value)
      return regex.test(value)
    },
    isError: false,
    maxlength: 10,
    errorMsg: '請輸入報名者手機',
    placeholder: "ex: 0912345678",
  },
  {
    label: "上傳照片",
    value: [],
    required: true,
    type: 'photo',
  },

]);

const hide = () => {
  isHidden.value = !isHidden.value
}



const onFileChange = (v) => {
  console.log(form.value[2].value[0])
  const isOverTwoMb = (form.value[2].value[0].size / 1024 / 1024).toFixed() > 2
  if(isOverTwoMb) {
    emit('openErrorDialog', '檔案大小不得超過 2MB')
    form.value[2].value = []
    return
  }
  createImage(form.value[2].value[0])
}

const preview = ref()

const createImage = (file) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    preview.value = e.target.result
    console.log(preview.value)
  }
  reader.readAsDataURL(file)
}

const isAgreeEvent = ref(false);
const isError = ref(false);


const onClickUpload = () => {
  if(form.value[2].value.length === 0) {
    emit('openErrorDialog', '請上傳照片')
    return
  }
  validate()
}
const validate = () => {

  form.value.forEach(i => {
    if (i.rules) {
      const isPassed = i.rules(i.value)
      i.isError = !isPassed
    }
  })

  const isAllPassed = form.value.every((i) => !i.isError)
  if (!isAllPassed) return

  if (!isAgreeEvent.value) {
    isError.value = true;
    return;
  }
  emit('onClickUpload')

}

const validateField = (index) => {
  if (!form.value[index].rules) return
  const isPassed = form.value[index].rules(form.value[index].value)
  form.value[index].isError = !isPassed
}
</script>
<template>
  <div class="gap-4 flex flex-col mb-12 overflow-y-scroll max-h-[70vh] sm:max-h-[55vh]">
    <div v-for="(i, index) in form" class="flex sm:flex-row flex-col gap-1 sm:gap-4 
items-start sm:items-center">
      <label v-if="i.type !== 'photo'" class="text-[#666666] flex-1">{{ i.label }}</label>
      <div v-if="i.type !== 'photo'" class="relative w-full  sm:flex-[2]">
        <input class="input" :maxlength="i.maxlength" :disabled="index > 2 && isTheSame" @input="validateField(index)"
          v-if="i.type !== 'checkbox'" v-model="i.value" :placeholder="i.placeholder" :type="i.type ?? 'text'" />
        <div class="block sm:absolute -bottom-4 text-xs text-red-500" v-show="i.isError">{{ i.errorMsg }}</div>
      </div>

      <div v-if="i.type == 'photo'" class="flex sm:flex-row flex-col gap-4">
        <label class="text-[#666666] flex-1 w-[162px]">{{ i.label }}</label>
        <div
          class="flex flex-col relative border-[#d9d9d9] border rounded h-[135px] w-[208px] flex items-center justify-center">
          <img src="../assets/upload.svg" class="w-[90px]" />
          <span class="text-sm text-red-400">*檔案大小不得超過2M</span>
          <v-file-input accept="image/*" class="file" v-model="i.value" type="file" @change="onFileChange" />
        </div>

        <img :src="preview" class="w-24" />
      </div>
    </div>



    <div class="enroll">
      <div
        class="flex flex-row items-center justify-center bg-[#d9d9d9] py-2 text-dark font-bold text-center hover:opacity-80 cursor-pointer rounded-t"
        @click="hide">活動注意事項
        <img :src="downIcon" />
      </div>
      <div v-show="isHidden" class="px-4 text-sm leading-6 py-4 border border-[#d9d9d9] text-gray">
        ● 活動道具僅限活動拍攝使用，使用時需家長陪同。不建議三歲以下兒童使用。<br/>
        ● 喜光護眼小博士參加年齡建議參加為5歲以上至國小學齡兒童。<br/>
        <p>● 活動期間：2023/10/01 00:00 ～ 2024/1/03 23:59。</p>
        ● 活動共分三個階段，每位報名者僅限參加其中一個階段活動，每階段報名數量有限，將依報名順序而定。<br/>
        ● 得獎名單將於2023/10/31、2023/11/30、2024/01/03，於此活動頁中公布得獎者，得獎者須在公布得獎名單後，10個工作日內「自行聯繫」主辦單位：eyeprotector@sylstar.com.tw，並提供「參加的活動名稱」、「得獎人真實姓名」、「手機電話」、「獎品收件地址(含郵遞區號)」等相關個人資料驗證得獎資格，以利後續獎品寄送領取及聯繫。<br/>
        ● 得獎者領獎注意事項：依中華民國稅法規定，中獎金額價值累計
        NT$1,000(含)以上者，需提供身份證正反面影本，以利申報中獎扣繳憑單，提供後始能領取獎項。獎項金額超過新臺幣2萬元者，本國人及外籍人士(住滿183天)需負擔10％機會中獎稅；外籍人士(居住未滿183天)不論得獎人中獎金額，須就中獎金額代扣20%機會中獎稅，繳完稅後始能領取獎項。
        若得獎者未於公布得獎名單後，10個工作日內自行聯繫主辦單位，以及未能提供上述領獎憑證者，即表示放棄得獎資格。<br/>
        ● 此活動主辦方為喜光有限公司。<br/>
        ● 報名者於參加本活動時，即同意接受本活動包括得獎等活動辦法與注意事項規範，如有違反，本公司得取消其活動資格。<br/>
        ● 本公司向您蒐集之個人資料，將於本公司存續期間內使用於本公司合於營業登記項目或章程所載及業務需要、消費者與客戶管理服務、提供活動獎品、依法扣繳所得稅金及開立扣繳憑單、徵信、行銷及營業範圍內相關服務使用。但依法您得主張之權利如下：請求查詢、請求閱覽、請求製給複製本、請求補充、請求更正、請求停止蒐集，處理、利用及刪除。若您不願提供相關之個人資料予本公司，將無法取得活動道具及獎品及收到本公司提供之相關活動訊息。<br/>
        ● 本活動道具及獎品寄送地區僅限台澎金馬地區，如非台澎金馬地區報名者，主辦單位不處理郵寄活動道具及獎品至海外地區之事宜，請註明指定台澎金馬地區之收件地址。<br/>
        ● 本公司保留隨時變更、修正、暫停或終止本活動之權利，若有未盡事宜，本公司保有最終修改內容之權利。<br/>
        ● 報名參加本活動即視為同意本活動上述所有包括活動規則、得獎等活動辦法及注意事項規範，如有違反，本公司得取消其活動資格。
      </div>
    </div>
  </div>

  <div class="flex items-center flex-row mb-10">
    <input type="checkbox" v-model="isAgreeEvent" @change="check" id="isAgree" name="isAgree" checked />
    <label for="isAgree" class="relative text-sm text-[#666] px-2">已充分瞭解並同意上述《活動注意事項》
      <span v-show="isError" class="absolute left-2 -bottom-5 text-red-500 text-sm">請勾選我同意《活動注意事項》</span></label>
  </div>

  <Btn @click="onClickUpload">上傳抽獎</Btn>
</template>

<style lang="scss" scoped>
label:not(.checkbox)::before {
  content: "*";
  @apply text-red-500;
}

.input:not(.checkbox) {
  @apply w-full border pl-4 border-[#d9d9d9] rounded-sm h-20 sm:h-9 min-w-[208px] border-solid w-full sm:py-0 py-2;

  &:disabled {
    background: #ececec;
  }
}

.enroll span {
  border: 1px solid;
}

.file {
  @apply cursor-pointer;
  position: absolute;
  z-index: 10;
  width: 208px;
  left: 0;
  height: 100%;
  background: transparent;
  display: flex;
}

:deep(.v-input__details) {
  display: none;
}

:deep(.v-input__control) {
  @apply w-full
}

.file :deep(.v-input__prepend) {
  display: none;
}
</style>
