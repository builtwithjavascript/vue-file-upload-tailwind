<script setup lang="ts">
import { computed } from 'vue'
import FileValidatorRowComponent from './FileValidatorRow.component.vue'
import type { IFileInfo, IFileValidatorItem } from '@builtwithjavascript/file-input-validator'

type IProps = {
  id: string
  model: IFileInfo
  successClass?: string
  errorClass?: string
  showOnlyErrors?: boolean
  roundedCorners?: boolean
  validatorItems: IFileValidatorItem[]
}

const props = withDefaults(defineProps<IProps>(), {
  showOnlyErrors: true,
  roundedCorners: false,
  successClass: 'success bg-green-600',
  errorClass: 'error bg-red-600'
})

const computedValidatorItems = computed(() => {
  return props.validatorItems.filter((x) => !props.showOnlyErrors || x.hasError)
})
</script>

<template>
  <div v-show="model.displayName.length > 0" class="file-validator">
    <div
      v-show="model.message"
      :class="`file-validator-item px-4 py-2 flex items-center ${model.isValid ? props.successClass : props.errorClass} text-white`"
    >
      <span class="flex-none mr-2">{{ model.isValid ? 'File:' : 'Error:' }}</span>
      <span class="" :title="model.isValid ? model.displayName : model.message">
        {{ model.isValid ? model.displayName : model.message }}
      </span>
    </div>

    <div v-show="!model.message" class="file-validator-inner">
      <FileValidatorRowComponent
        v-for="(item, index) in computedValidatorItems"
        :key="`file-validator-row-${item.key}`"
        :index="index"
        :totItemsCount="computedValidatorItems.length"
        :roundedCorners="roundedCorners"
        :model="item"
      />
    </div>
  </div>
</template>
