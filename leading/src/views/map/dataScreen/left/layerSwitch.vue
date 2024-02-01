<template>
  <PanelCard :title="config.leftTopTitle">
    <template #body>
      <el-scrollbar :class="$style.el_scrollbar">
        <el-tree
          :class="$style.el_tree"
          ref="treeRef"
          :data="data"
          node-key="id"
          show-checkbox
          highlight-current
          @check="check"
          :default-expanded-keys="defaultCheckedBox"
        />
      </el-scrollbar>
    </template>
  </PanelCard>
</template>

<script setup lang="ts">
import type { ElTree } from 'element-plus'
import type { HoleInfoType } from '@/types/HoleInfoType'

import { onMounted, ref } from 'vue'
import { getAllDatas } from '@/server/https'
import useCesiumStore from '@/stores/cesiumStore'
import { storeToRefs } from 'pinia'
import { addIcon, removeEntityById } from '@/utils/cesium/addicons'

import config from '@/config'
import PanelCard from '@/components/common/panelCard/index.vue'

const cesiumStore = useCesiumStore()
const { defaultCheckedBox, defaultChecked } = storeToRefs(cesiumStore)

const treeRef = ref<InstanceType<typeof ElTree>>()
const data = ref<HoleInfoType[]>([])
const pointColor = ref<any>()

const holeType = ['标贯孔', '静探孔', '取样孔', '取样标贯孔', '水文地质钻孔', '未知']

//判断数组中是否具有什么元素
const isHasElement = (array: any, ele: any) => {
  if (array.indexOf(ele) === -1) {
    return false
  } else {
    return true
  }
}

const check = (data: any, status: any) => {
  switch (typeof data.id) {
    case 'string': {
      if (isHasElement(status.checkedKeys, data.id)) {
        // console.log(data)
        setIconsByDatas(data)
      } else {
        data.children.forEach((item: any) => {
          removeEntityById(item.id + '')
        })
      }
      break
    }
    case 'number': {
      if (isHasElement(status.checkedKeys, data.id)) {
        // console.log(data)
        const path = config.holeType[data.holetype]
        const position = { longitude: data.lon, latitude: data.lat, height: 0 }
        addIcon(position, path, data.id + '')
      } else {
        removeEntityById(data.id + '')
      }
      break
    }
  }
}

const getData = async () => {
  const Datas = await getAllDatas('/ntproject')
  for (let i = 0; i < holeType.length; i++) {
    data.value.push({ id: 'P' + i, label: holeType[i], children: [] })
    const target = Datas.data.filter((item: any) => item.holetype === holeType[i])
    data.value[i].children = target
  }
}

const setIconsByDatas = (Datas: HoleInfoType) => {
  // console.log('Datas', Datas)
  const path = config.holeType[Datas.label]
  Datas.children.forEach((item) => {
    const position = { longitude: item.lon, latitude: item.lat, height: 0 }
    addIcon(position, path, item.id + '')
  })
}

onMounted(async () => {
  await getData()

  // console.log(import.meta.url)

  // console.log('data', data)
  // console.log(config.holeType['取样孔'])

  // setTimeout(() => {
  //   treeRef.value?.setCheckedKeys(defaultCheckedBox.value)
  //   for (let i = 0; i < defaultChecked.value.length; i++) {
  //     check(
  //       { id: defaultChecked.value[i][0], children: data.value[i].children },
  //       { checkedKeys: defaultChecked.value[i] }
  //     )
  //   }
  // }, 0)
})
</script>

<style lang="scss" module>
.el_scrollbar {
  width: 100%;
  height: 250px;
}

.el_tree {
  background: #ffffff00;
  --el-color-primary-light-9: #1a4069;
  --el-fill-color-light: #1a4069;
  --el-tree-node-content-height: 30px;
  --el-font-size-base: 17px;
  --el-text-color-regular: #cfcdcd;
}
:deep(.el-tree) {
  background: #ffffff00;
}
</style>
