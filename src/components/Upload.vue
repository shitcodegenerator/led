<script setup>
import { ref, watch } from "vue";
import downIcon from '../assets/down.svg'
import Btn from "../components/Btn.vue";
import Notification from "./Notification.vue";

const emit = defineEmits(['onClickUpload', 'openErrorDialog'])

const isHidden = ref(true)

const form = ref([
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
    label: "護眼小博士暱稱",
    value: "",
    required: true,
    rules: (value) => {
      return value !== ''
    },
    errorMsg: '請輸入護眼小博士暱稱',
    isError: false,
    maxlength: 8,
    placeholder: "至多8個字，將公開於活動頁供識別",
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


  emit('onClickUpload', {
    file: form.value[2].value[0],
    doctor_name: form.value[1].value,
    mobile: form.value[0].value
  })

}

const validateField = (index) => {
  if (!form.value[index].rules) return
  const isPassed = form.value[index].rules(form.value[index].value)
  form.value[index].isError = !isPassed
}
</script>
<template>
  <div class="gap-4 flex flex-col mb-12 overflow-y-scroll h-full">
    <p class="text-sm -mb-4 text-red-500">*請填寫與報名時相同手機號</p>
    <div v-for="(i, index) in form" class="flex sm:flex-row flex-col gap-1 sm:gap-4 
items-start sm:items-center">
      <label v-if="i.type !== 'photo'" class="text-[#666666] flex-1">{{ i.label }}</label>
      <div v-if="i.type !== 'photo'" class="relative w-full  sm:flex-[2]">
        <input class="input" :maxlength="i.maxlength" :disabled="index > 2 && isTheSame" @input="validateField(index)"
          v-if="i.type !== 'checkbox'" v-model="i.value" :placeholder="i.placeholder" :type="i.type ?? 'text'" />
        <div class="block sm:absolute -bottom-4 text-xs text-red-500" v-show="i.isError">{{ i.errorMsg }}</div>
      </div>

      <div v-if="i.type == 'photo'" class="flex  flex-col gap-4">
        <label class="text-[#666666] flex-1 w-[162px]">{{ i.label }}</label>
        <div
          class="flex flex-col relative border-[#d9d9d9] border rounded h-[135px] w-[208px] flex items-center justify-center">
          <img src="../assets/upload.svg" class="w-[90px]" />
          <span class="text-sm text-red-400">*檔案大小不得超過2M</span>
          <v-file-input accept="image/*" class="file" v-model="i.value" type="file" @change="onFileChange" />
        </div>

        <img :src="preview" class="w-24" />
        <span v-if="preview" class="text-green-500 font-bold -mt-4 text-sm">上傳成功 {{  }}</span>
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
    <input type="checkbox" v-model="isAgreeEvent" @change="check" id="isAgree" name="isAgree" checked />
    <label for="isAgree" class="relative text-sm text-[#666] px-2">已充分瞭解並同意上述《活動注意事項》
      <span v-show="isError" class="absolute left-2 -bottom-5 text-red-500 text-sm">請勾選我同意《活動注意事項》</span></label>
  </div>

  <Btn @click="onClickUpload">上傳抽獎</Btn>
  </div>


</template>

<style lang="scss" scoped>
label:not(.checkbox)::before {
  content: "*";
  @apply text-red-500;
}

.input:not(.checkbox) {
  @apply w-full border pl-4 border-[#d9d9d9] rounded-sm h-9  min-w-[208px] border-solid w-full sm:py-0 py-2;

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
:deep(.v-field__input) {
  @apply hidden;
}

.file :deep(.v-input__prepend) {
  display: none;
}
</style>
