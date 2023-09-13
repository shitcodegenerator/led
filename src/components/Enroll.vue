<script setup>
import { ref, watch } from "vue";
import downIcon from '../assets/down.svg'
import Btn from "../components/Btn.vue";

const emit = defineEmits(['onClickEnroll'])

const isHidden = ref(true)
const isTheSame = ref(false)

const form = ref([
  {
    label: "報名者真實姓名",
    type: 'name',
    value: "",
    required: true,
    rules: (value) => {
      return value !== ''
    },
    placeholder: "請輸入真實姓名",
    errorMsg: '請輸入真實姓名',
    maxlength: 10,
    isError: false
  },
  {
    label: "報名者手機",
    value: "",
    type: 'mobile',
    required: true,
    maxlength: 10,
    rules: (value) => {
      const regex = /^09\d{8}$/
      return regex.test(value)
    },
    placeholder: "ex: 0912345678",
    errorMsg: '請輸入符合格式的手機號碼(ex:0912345678)',
    isError: false
  },



  {
    label: "報名者Email",
    value: "",
    required: true,
    type: 'email',
    maxlength: 40,
    rules: (value) => {
      const regex = /\S+@\S+.\S+/;
      return regex.test(value)
    },
    placeholder: "",
    errorMsg: '請輸入正確的 Email',
    isError: false
  },

  {
    label: "收件者資訊同上",
    value: "",
    type: "checkbox",
    placeholder: "",
    
    errorMsg: '請輸入',
    isError: false
  },

  {
    label: "收件者真實姓名",
    value: "",
    required: true,
    maxlength: 10,
    type: 'receiver_name',
    rules: (value) => {
      return value !== ''
    },
    placeholder: "",
    errorMsg: '請輸入收件者真實姓名',
    isError: false
  },
  {
    label: "收件者手機",
    value: "",
    type: 'receiver_mobile',
    required: true,
    maxlength: 10,
    rules: (value) => {
      const regex = /^09\d{8}$/
      return regex.test(value)
    },
    errorMsg: '請輸入符合格式的手機號碼(ex:0912345678)',
    isError: false
  },
  {
    label: "收件者地址",
    value: "",
    required: true,
    maxlength: 40,
    type: 'receiver_addr',
    rules: (value) => {
      return value !== ''
    },
    placeholder: "（請註明清楚樓層等詳細地址）",
    errorMsg: '請輸入完整地址',
    isError: false
  },
]);

const hide = () => {
  isHidden.value = !isHidden.value
}

watch(() => isTheSame.value, (v) => {
  if (!v) return
})
const isAgreeEvent = ref(false);
const isError = ref(false);


const onClickEnroll = () => {
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
  if(!isAllPassed) return

  if (!isAgreeEvent.value) {
    isError.value = true;
    return;
  }
  emit('onClickEnroll')

}

const validateField = (index) => {
  if (isTheSame.value && index < 3) {
    form.value[4].value = form.value[0].value
    form.value[5].value = form.value[1].value
    form.value[6].value = form.value[2].value
  }
  if (!form.value[index].rules) return
  const isPassed = form.value[index].rules(form.value[index].value)
  form.value[index].isError = !isPassed
}


watch(() => isTheSame.value, (same) => {
  if (same) {
    form.value[4].value = form.value[0].value
    form.value[5].value = form.value[1].value
    form.value[6].value = form.value[2].value
  }
})
</script>
<template>
  <div class="gap-6 sm:gap-4 flex flex-col mb-12 overflow-y-scroll max-h-[70vh] sm:max-h-[55vh]">
    <div v-for="(i, index) in form" class="flex sm:flex-row flex-col gap-1 sm:gap-4 
items-start sm:items-center">
      <label v-if="i.type !== 'checkbox'" class="text-[#666666] flex-1">{{ i.label }}</label>
      <div v-if="i.type !== 'checkbox'" class="relative flex-1 sm:flex-[2]">
        <input class="input" :maxlength="i.maxlength" :disabled="index > 2 && isTheSame" @input="validateField(index)" v-if="i.type !== 'checkbox'"
          v-model="i.value" :placeholder="i.placeholder" :type="i.type ?? 'text'" />
        <div class="absolute -bottom-4 text-xs text-red-500" v-show="i.isError">{{ i.errorMsg}}</div>
      </div>
      <div v-if="i.type === 'checkbox'" class="gap-2 flex flex-row items-center justify-center self-start">
        <input class="checkbox" v-model="isTheSame" :placeholder="i.placeholder" :type="i.type ?? 'text'" />
        <label class="checkbox text-[#666666] flex-1">{{ i.label }}</label>
      </div>
    </div>

    <div class="enroll">
      <div
        class="flex flex-row items-center justify-center bg-[#d9d9d9] py-2 text-dark font-bold text-center hover:opacity-80 cursor-pointer rounded-t"
        @click="hide">活動注意事項
        <img :src="downIcon" />
      </div>
      <div v-show="isHidden" class="px-4 text-sm leading-6 py-4 border border-[#d9d9d9] text-gray">
        活動道具僅限活動拍攝使用，使用時需家長陪同。不建議三歲以下兒童使用。
        喜光護眼小博士參加年齡建議參加為5歲以上至國小學齡兒童。
        <p>活動期間：2023/10/01 00:00 ～ 2024/1/03 23:59。</p>
        活動共分三個階段，每位報名者僅限參加其中一個階段活動，每階段報名數量有限，將依報名順序而定。
        得獎名單將於
        2023/10/31、2023/11/30、2024/01/03，於此活動頁中公布得獎者，得獎者須在公布得獎名單後，10個工作日內「自行聯繫」主辦單位：eyeprotector@sylstar.com.tw，並提供「參加的活動名稱」、「得獎人真實姓名」、「手機電話」、「獎品收件地址(含郵遞區號)」等相關個人資料驗證得獎資格，以利後續獎品寄送領取及聯繫。
        得獎者領獎注意事項：依中華民國稅法規定，中獎金額價值累計
        NT$1,000(含)以上者，需提供身份證正反面影本，以利申報中獎扣繳憑單，提供後始能領取獎項。獎項金額超過新臺幣2萬元者，本國人及外籍人士(住滿183天)需負擔10％機會中獎稅；外籍人士(居住未滿183天)不論得獎人中獎金額，須就中獎金額代扣20%機會中獎稅，繳完稅後始能領取獎項。
        若得獎者未於公布得獎名單後，10個工作日內自行聯繫主辦單位，以及未能提供上述領獎憑證者，即表示放棄得獎資格。
        此活動主辦方為喜光有限公司。
        報名者於參加本活動時，即同意接受本活動包括得獎等活動辦法與注意事項規範，如有違反，本公司得取消其活動資格。
        本公司向您蒐集之個人資料，將於本公司存續期間內使用於本公司合於營業登記項目或章程所載及業務需要、消費者與客戶管理服務、提供活動獎品、依法扣繳所得稅金及開立扣繳憑單、徵信、行銷及營業範圍內相關服務使用。但依法您得主張之權利如下：請求查詢、請求閱覽、請求製給複製本、請求補充、請求更正、請求停止蒐集，處理、利用及刪除。若您不願提供相關之個人資料予本公司，將無法取得活動道具及獎品及收到本公司提供之相關活動訊息。
        本活動道具及獎品寄送地區僅限台澎金馬地區，如非台澎金馬地區報名者，主辦單位不處理郵寄活動道具及獎品至海外地區之事宜，請註明指定台澎金馬地區之收件地址。
        本公司保留隨時變更、修正、暫停或終止本活動之權利，若有未盡事宜，本公司保有最終修改內容之權利。
        報名參加本活動即視為同意本活動上述所有包括活動規則、得獎等活動辦法及注意事項規範，如有違反，本公司得取消其活動資格。
      </div>
    </div>
  </div>
  <div class="flex items-center flex-row mb-10">
    <input type="checkbox" v-model="isAgreeEvent" id="isAgree" name="isAgree" checked />
    <label for="isAgree" class="relative text-sm text-[#666] px-2">已充分瞭解並同意上述《活動注意事項》
      <span v-show="isError" class="absolute left-2 -bottom-5 text-red-500 text-sm">請勾選我同意《活動注意事項》</span></label>
  </div>

  <Btn @click="onClickEnroll">參加活動</Btn>
</template>

<style lang="scss" scoped>
label:not(.checkbox)::before {
  content: "*";
  @apply text-red-500;
}

.input:not(.checkbox) {
  @apply border pl-4 border-[#d9d9d9] rounded-sm h-9 min-w-[208px] border-solid sm:w-auto w-full sm:py-0 py-2 px-2;

  &:disabled {
    background: #ececec;
  }
}

.enroll span {
  border: 1px solid;
}
</style>
