<script lang='ts' setup>
import VueOfficePptx from '@vue-office/pptx'
import {ref, watch} from 'vue'
import type {PreviewProps} from '../../preview.interface'
import {getFileRenderByFile} from '../../utils/utils'

const props = withDefaults(
    defineProps<PreviewProps>(),
    {
      url: () => null,
      file: () => null,
    },
)

const fileRender = ref(null)
watch(
    () => props.file,
    () => {
      getFileRenderByFile(props.file).then((render) => {
        fileRender.value = render
      })
    },
    {immediate: true},
)

function renderedHandler(): void {
  console.log('PPT渲染完成')
}

function errorHandler(): void {
  console.log('PPT渲染失败')
}
</script>

<template>
  <div class="ppt-preview">
    <VueOfficePptx :src="fileRender" @rendered="renderedHandler" @error="errorHandler"/>
  </div>
</template>

<style scoped lang='scss'>
.ppt-preview {
  width: 100%;
  height: 100vh;
  overflow: auto;
}
</style>
