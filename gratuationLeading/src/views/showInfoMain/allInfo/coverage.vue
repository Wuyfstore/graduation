<template>
  <el-scrollbar class="coverage">
    <el-tree
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

<script lang="ts" setup>
import { ElTree } from 'element-plus'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Cartesian3, Color, HeightReference } from 'cesium'
import type { HoleInfoType } from '@/types/HoleInfoType'
import { getAllDatas } from '@/server/https'
import useCesiumStore from '@/stores/cesiumStore'
import { storeToRefs } from 'pinia'

const cesiumStore = useCesiumStore()
const { defaultCheckedBox, defaultChecked } = storeToRefs(cesiumStore)

const treeRef = ref<InstanceType<typeof ElTree>>()
const data = ref<HoleInfoType[]>([])
const pointColor = ref<any>()
const holeType: Array<string | null> = [
  '标贯孔',
  '静探孔',
  '取样孔',
  '取样标贯孔',
  '水文地质钻孔',
  '未知'
]

//判断数组中是否具有什么元素
const isHasElement = (array: any, ele: any) => {
  if (array.indexOf(ele) === -1) {
    return false
  } else {
    return true
  }
}

const changePointColor = (tar: any) => {
  switch (tar) {
    case '标贯孔': {
      pointColor.value = Color.YELLOW
      break
    }
    case '静探孔': {
      pointColor.value = Color.MAROON
      break
    }
    case '取样孔': {
      pointColor.value = Color.LIGHTSLATEGRAY
      break
    }
    case '取样标贯孔': {
      pointColor.value = Color.GREEN
      break
    }
    case '水文地质钻孔': {
      pointColor.value = Color.BLUE
      break
    }
    case '未知': {
      pointColor.value = Color.WHITE
      break
    }
  }
}

const createEntity = (id: any, lon: any, lat: any) => {
  window.Cesium.addEntity({
    id: id,
    position: Cartesian3.fromDegrees(lon, lat, 0),
    point: {
      show: true,
      pixelSize: 15,
      color: pointColor.value,
      heightReference: HeightReference.CLAMP_TO_GROUND
    }
  })
}

const check = (data: any, status: any) => {
  switch (typeof data.id) {
    case 'string': {
      if (isHasElement(status.checkedKeys, data.id)) {
        for (let item of data.children) {
          changePointColor(item.holetype)
          // console.log(item.id, item.lon, item.lat)
          createEntity(item.id, item.lon, item.lat)
        }
      } else {
        for (let item of data.children) {
          window.Cesium.removeEntityById(item.id)
        }
      }
      break
    }
    case 'number': {
      if (isHasElement(status.checkedKeys, data.id)) {
        changePointColor(data.holetype)
        createEntity(data.id, data.lon, data.lat)
      } else {
        window.Cesium.removeEntityById(data.id)
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

onMounted(async () => {
  await getData()
  setTimeout(() => {
    treeRef.value?.setCheckedKeys(defaultCheckedBox.value)
    for (let i = 0; i < defaultChecked.value.length; i++) {
      check(
        { id: defaultChecked.value[i][0], children: data.value[i].children },
        { checkedKeys: defaultChecked.value[i] }
      )
    }
  }, 0)
})

onBeforeUnmount(() => {
  // 获取选中的keys
  const checkedkeys = treeRef.value?.getCheckedKeys() ?? []
  if (checkedkeys.length !== 0) cesiumStore.changeDefaultCheckedNodeKeys(checkedkeys)
  // 获取默认选中节点
  const checkedNodes = treeRef.value?.getCheckedNodes(false, true) ?? []
  // console.log(checkedNodes)

  const idList = []
  if (checkedNodes.length !== 0) {
    for (const item of checkedNodes) {
      idList.push(item.id)
    }
  }
  const result = idList.reduce((acc, cur) => {
    if (typeof cur === 'string') {
      acc.push([cur])
    } else {
      acc[acc.length - 1].push(cur)
    }
    return acc
  }, [])
  cesiumStore.changeDefaultCheckedNodes(result)
  // console.log(defaultChecked.value)

  // 移除创建的实体
  for (const id of defaultCheckedBox.value) {
    if (typeof id === 'number') {
      window.Cesium.removeEntityById(id)
    }
  }
})
</script>

<style lang="less" scoped>
.coverage {
  top: 2%;
  left: 1%;
  padding: 0.5% 0;
  width: 18%;
  height: 29%;
  overflow: auto;
  position: absolute;
  // background: rgba(160, 160, 160, 0.24);
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.42),
      rgba(255, 255, 255, 0)
    )
    1 1;
  backdrop-filter: blur(10px);
  pointer-events: auto;

  .el-tree {
    background: rgba(0, 0, 0, 0);
  }

  :deep(.el-tree-node__label) {
    color: rgb(55, 53, 53);
  }

  :deep(.el-tree-node__content) {
    background: rgba(0, 0, 0, 0);
  }

  :deep(.el-tree-node__content:hover) {
    background: rgba(136, 136, 136, 0.24);
  }

  :deep(.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content) {
    // 设置颜色
    background-color: rgba(136, 136, 136, 0.24);
  }
}
</style>
