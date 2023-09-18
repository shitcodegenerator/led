<script setup>
import Notification from './Notification.vue';

</script>
<template>

        <div class="flex flex-col items-center gap-4  overflow-y-scroll max-h-[55vh] mb-10">
          <h2 class="font-bold text-2xl">活動注意事項</h2>
        <div class="px-4 leading-6 py-4 text-xs sm:text-sm text-gray">
          <Notification />
        </div>
        </div>
</template>

<style lang="scss" scoped>
label:not(.checkbox)::before {
  content: "*";
  @apply text-red-500;
}

input:not(.checkbox) {
  @apply flex-[2] border pl-4 border-[#d9d9d9] rounded-sm h-20 sm:h-9 min-w-[208px] border-solid sm:w-auto w-full sm:py-0 py-2;
}

.enroll span {
  border: 1px solid;
}
</style>
