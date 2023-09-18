<script setup>
import { ref, watch } from "vue";
import downIcon from '../assets/down.svg'
import Btn from "../components/Btn.vue";
import Notification from "./Notification.vue";

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
    maxlength: 20,
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
    placeholder: "請輸入 Email",
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
    placeholder: "請輸入真實姓名",
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
    placeholder: "請輸入收件者手機",
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
    placeholder: "請註明清楚樓層等詳細地址",
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
  emit('onClickEnroll', {
    name: form.value[0].value,
    mobile: form.value[1].value,
    email: form.value[2].value,
    receiver_name: form.value[4].value,
    receiver_mobile: form.value[5].value,
    receiver_address: form.value[6].value,
  })

}

const validateField = (index) => {
  if (isTheSame.value && index < 3) {
    form.value[4].value = form.value[0].value
    form.value[5].value = form.value[1].value
  }
  if (!form.value[index].rules) return
  const isPassed = form.value[index].rules(form.value[index].value)
  form.value[index].isError = !isPassed
}


watch(() => isTheSame.value, (same) => {
  if (same) {
    form.value[4].value = form.value[0].value
    form.value[5].value = form.value[1].value
  }
})
</script>
<template>
 <div class="gap-6 sm:gap-4 flex flex-col mb-12 overflow-y-scroll h-full ">
    <p class="text-sm -mb-4 text-red-500">*以下資訊僅供寄送與聯絡，不公開於活動頁</p>
    <div v-for="(i, index) in form" class="flex sm:flex-row flex-col gap-1 sm:gap-4 
items-start sm:items-center">
      <label v-if="i.type !== 'checkbox'" class="text-[#666666] flex-1">{{ i.label }}</label>
      <div v-if="i.type !== 'checkbox'" class="relative w-full sm:flex-[2]">
        <input class="input" :maxlength="i.maxlength" :disabled="index > 2 && index < 6 && isTheSame" @input="validateField(index)" v-if="i.type !== 'checkbox'"
          v-model="i.value" :placeholder="i.placeholder" :type="i.type ?? 'text'" />
        <div class="block sm:absolute -bottom-4 text-xs text-red-500" v-show="i.isError">{{ i.errorMsg}}</div>
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
        <Notification />
      </div>
    </div>
    <div class="flex items-center flex-row mb-10">
    <input type="checkbox" v-model="isAgreeEvent" id="isAgree" name="isAgree" checked />
    <label for="isAgree" class="relative text-sm text-[#666] px-2">已充分瞭解並同意上述《活動注意事項》
      <span v-show="isError" class="absolute left-2 -bottom-5 text-red-500 text-sm">請勾選我同意《活動注意事項》</span></label>
  </div>

  <Btn @click="onClickEnroll">報名活動</Btn>
  </div>
</template>

<style lang="scss" scoped>
label:not(.checkbox)::before {
  content: "*";
  @apply text-red-500;
}

.input:not(.checkbox) {
  @apply border pl-4 border-[#d9d9d9] rounded-sm h-9 min-w-[208px] border-solid sm:w-full w-full sm:py-0 py-2 px-2;

  &:disabled {
    background: #ececec;
  }
}

.enroll span {
  border: 1px solid;
}
</style>
