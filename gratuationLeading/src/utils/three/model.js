import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

export class Model {
  constructor() {
    this.scene = null //场景
    this.camera = null //相机
    this.width = null //画布宽
    this.height = null //画布高
    this.scale = null //三维场景的控制系数 系数越大 显示的范围越大
    this.renderer = null //渲染器
    this.labelRenderer = null //标签渲染器
    this.loader = null //three中的读取器
    this.lineGroup = null //存 线组
    this.holeGroup = null //存 圆柱
    this.box = null //包围盒
    this.center = null //用于存储计算出的几何中心
    this.element = null //dom元素
    this.raycaster = null //光线投射器
    this.axesHelper = null //三维辅助坐标系
    this.chooseMesh = null //被拾取的mesh
    this.labelCss2Obj = null
    this.listenerFnId = null //监听器id
    return this
  }

  init(dom, isUse = true) {
    this.element = dom
    this.width = this.element.offsetWidth
    this.height = this.element.offsetHeight
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    this.labelRenderer = new CSS2DRenderer()
    this.loader = new THREE.FileLoader()
    this.lineGroup = new THREE.Group()
    this.holeGroup = new THREE.Group()
    this.loader.setResponseType('json')
    if (isUse) {
      this.axesHelper = new THREE.AxesHelper(300)
      this.scene.add(this.axesHelper)
    }
  }

  //删除场景对象中Scene一个子对象Group，并释放组对象Group中所有网格模型几何体的顶点缓冲区占用内存
  deleteObject(group, type = 'Mesh') {
    group.traverse((obj) => {
      console.log(obj.type)
      // if (obj.type === type) {
      //   obj.geometry.dispose()
      //   obj.material.dispose()
      // }
    })
    // this.scene.remove(group)
  }

  //利用读取器读取json文件 并绘制边界 这是利用本地请求
  readJsonBound(path) {
    return new Promise((resolve) => {
      this.loader.load(path, (data) => {
        data.features.forEach((area) => {
          if (area.geometry.type === 'Polygon') {
            area.geometry.coordinates = [area.geometry.coordinates]
          }
          // 解析所有封闭轮廓边界坐标area.geometry.coordinates
          const group = this.boundaryLine(area.geometry.coordinates)
          // console.log(group);
          this.lineGroup.add(group) //省份边界轮廓插入组对象lineGroup
          this.deleteObject(this.lineGroup)
        })
        this.scene.add(this.lineGroup)
        resolve()
      })
    })
  }

  //直接拿到geojson数据，进行绘制
  drawBoundary(data) {
    data.features.forEach((area) => {
      if (area.geometry.type === 'Polygon') {
        area.geometry.coordinates = [area.geometry.coordinates]
      }
      // 解析所有封闭轮廓边界坐标area.geometry.coordinates
      const group = this.boundaryLine(area.geometry.coordinates)
      console.log(group)
      this.lineGroup.add(group) //省份边界轮廓插入组对象lineGroup
    })
    this.scene.add(this.lineGroup)
  }

  //将几何对象存入group中
  boundaryLine(pointsArrs) {
    var group = new THREE.Group()
    pointsArrs.forEach((polygon) => {
      var pointArr = [] //边界线顶点坐标
      polygon[0].forEach((elem) => {
        pointArr.push(elem[0], elem[1], 0)
      })
      group.add(this.forBoundaryLine(pointArr))
    })
    return group
  }

  //创建几何对象
  forBoundaryLine(pointArr, isLoop = true) {
    let line
    const geometry = new THREE.BufferGeometry()
    const vertices = new Float32Array(pointArr)
    const attribute = new THREE.BufferAttribute(vertices, 3) //3个为一组，表示一个顶点的xyz坐标
    geometry.attributes.position = attribute
    const material = new THREE.LineBasicMaterial({
      color: 0x00ffff
    })
    if (isLoop) {
      line = new THREE.LineLoop(geometry, material) //首尾顶点连线，轮廓闭合
      return line
    }
    line = new THREE.Line(geometry, material) //不进行首位相连
    return line
  }

  //将返回的模型存入group中
  stateLineLoop(arr) {
    const group = new THREE.Group()
    group.add(this.forBoundaryLine(arr))
    this.lineGroup.add(group)
    this.scene.add(this.lineGroup)
  }

  //计算包围盒
  measureBox() {
    this.box = new THREE.Box3()
    this.box.expandByObject(this.lineGroup)
    //scaleV3表示包围盒长宽高尺寸
    const scaleV3 = new THREE.Vector3()
    // .getSize()计算包围盒长宽高尺寸
    this.box.getSize(scaleV3)
    // 查看控制台包围盒大小，辅助设置相机参数
    // console.log('查看包围盒尺寸', scaleV3)
    this.scale = (scaleV3.x + scaleV3.y) / 2

    //scaleV3表示包围盒的几何体中心
    this.center = new THREE.Vector3()
    // .getCenter()计算一个层级模型对应包围盒的几何体中心
    this.box.getCenter(this.center)
    // console.log('查看几何中心', this.center)
  }

  //绘制整个圆柱体
  drawCylinder(pointData) {
    const geometry = new THREE.CylinderGeometry(0.005, 0.005, 1)
    // geometry.computeVertexNormals()
    geometry.rotateX(Math.PI / 2) //旋转使柱子沿着z轴方向
    geometry.translate(0, 0, 0)
    for (const hole of pointData) {
      const height = hole.drillingDepth
      const material = new THREE.MeshLambertMaterial({
        color: 0x00ffff,
        transparent: true,
        opacity: 0.5
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.scale.set(1, 1, height * 0.002)
      mesh.position.set(hole.lon, hole.lat, -(height / 2 - hole.groundElevation) * 0.002)
      // mesh.position.set(hole.lon, hole.lat, 0)
      this.holeGroup.add(mesh)
    }
    this.scene.add(this.holeGroup)
  }

  //绘制item圆柱体
  drawChildCylinder(pointData) {
    const geometry = new THREE.CylinderGeometry(0.005, 0.005, 1)
    // geometry.computeVertexNormals()
    geometry.rotateX(Math.PI / 2)
    geometry.translate(0, 0, 0)
    for (const hole of pointData) {
      // const lenght = hole.drillingDepth
      //地面标高
      const elevation = hole.items[0].thickness + hole.items[0].elevation
      let d = 0
      for (const item of hole.items) {
        const height = item.thickness
        const distance = elevation - d
        const material = new THREE.MeshLambertMaterial({
          // color: item.histogramTypeColor
          color: 0x00ffff,
          transparent: true,
          opacity: 0.5
        })
        const mesh = new THREE.Mesh(geometry, material)
        mesh.name = `${hole.id}` + '-' + `${item.id}`
        mesh.position.set(hole.lon, hole.lat, -(height / 2 - distance) * 0.002)
        mesh.scale.set(1, 1, height * 0.002)
        d += height
        this.holeGroup.add(mesh)
      }
      this.scene.add(this.holeGroup)
    }
  }

  //绘制三角网
  drawTriangulatedMesh() {}

  //绘制模型
  drawModel() {}

  //拾取对象
  getTarObject(pointData) {
    const id = window.addEventListener('mousemove', (e) => {
      if (this.chooseMesh) {
        this.chooseMesh.material.color.set(0x00ffff) //恢复原来颜色
        this.chooseMesh.material.transparent = true
      }
      const Sx = e.clientX
      const Sy = e.clientY - 20
      //屏幕坐标转成WeblGl标准设备坐标
      const x = (Sx / this.width) * 2 - 1
      const y = -(Sy / this.height) * 2 + 1
      //创建一个射线投射器
      this.raycaster = new THREE.Raycaster()
      this.raycaster.setFromCamera(new THREE.Vector2(x, y), this.camera)
      const intersects = this.raycaster.intersectObjects(this.holeGroup.children)
      if (intersects.length > 0) {
        const obj = intersects[0].object
        this.chooseMesh = obj
        const numbers = obj.name.split('-').map(Number)
        const hole = pointData.filter((holes) => holes.id === numbers[0])
        const holeitem = hole[0].items.filter((data) => data.id === numbers[1])
        obj.material.color.set(holeitem[0].histogramTypeColor)
        obj.material.transparent = false
        this.implementTag(obj, hole[0], holeitem[0])
      }
    })
    return id
  }

  //实现标签
  implementTag(mesh, hole, obj) {
    // if (this.labelRenderer.domElement) {
    //   this.labelRenderer.domElement.remove()
    // }
    if (this.labelCss2Obj) {
      this.scene.remove(this.labelCss2Obj)
    }
    //创建dic元素作为标签
    const div = document.createElement('div')
    div.className = 'labelDiv'
    div.style.padding = '10px'
    div.style.color = '#fff'
    div.style.position = 'absolute'
    div.style.width = '100px'
    div.style.fontSize = '16px' // 设置字体大小为 16 像素
    div.style.backgroundColor = 'rgba(25,25,25,0.5)'
    div.style.borderRadius = '5px'

    const span1 = document.createElement('span')
    span1.innerHTML = hole.label
    span1.style.fontSize = '12px' // 设置字体大小为 16 像素
    span1.style.display = 'flex' // 设置为 flex 布局，以便垂直居中文本
    span1.style.alignItems = 'center' // 垂直居中文本
    span1.style.justifyContent = 'center' // 水平居中文本
    div.appendChild(span1)

    const span2 = document.createElement('span')
    span2.innerHTML = obj.histogramType
    span2.style.fontSize = '12px' // 设置字体大小为 16 像素
    span2.style.display = 'flex' // 设置为 flex 布局，以便垂直居中文本
    span2.style.alignItems = 'center' // 垂直居中文本
    span2.style.justifyContent = 'center' // 水平居中文本
    div.appendChild(span2)

    const span3 = document.createElement('span')
    span3.innerHTML = obj.characterization
    span3.style.fontSize = '12px' // 设置字体大小为 16 像素
    span3.style.display = 'flex' // 设置为 flex 布局，以便垂直居中文本
    span3.style.alignItems = 'center' // 垂直居中文本
    span3.style.justifyContent = 'center' // 水平居中文本
    div.appendChild(span3)

    //这个类似于网格模型，有位置等等属性
    this.labelCss2Obj = new CSS2DObject(div)
    this.labelCss2Obj.position.copy(mesh.position)
    this.scene.add(this.labelCss2Obj)

    //创建一个css2渲染器css2Render
    this.labelRenderer.setSize(this.width, this.height)
    this.labelRenderer.domElement.style.position = 'absolute'
    this.labelRenderer.domElement.style.top = '0px'
    this.labelRenderer.domElement.style.left = '-100px'
    //设置.pointerEvents = none 以免模型标签HTML元素遮挡鼠标选择场景模型
    this.labelRenderer.domElement.style.pointerEvents = 'none'
    this.element.appendChild(this.labelRenderer.domElement)
  }

  //设置相机
  setCamera() {
    const k = this.width / this.height
    this.camera = new THREE.OrthographicCamera(
      -this.scale * k,
      this.scale * k,
      this.scale,
      -this.scale,
      1,
      10000
    )
    this.camera.position.set(this.center.x, -200 + this.center.y, 200) //这里需要找一个合适的相机位置
    this.camera.lookAt(...this.center)
  }

  //设置光源
  setLight() {
    //平行光1
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.7)
    directionalLight1.position.set(400, 200, 300)
    this.scene.add(directionalLight1)
    //平行光2
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.7)
    directionalLight2.position.set(-400, -200, -300)
    this.scene.add(directionalLight2)
    //环境光
    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    this.scene.add(ambient)
  }

  //渲染
  render() {
    this.renderer.setSize(this.width, this.height)
    //设置背景颜色
    this.renderer.setClearColor(0x444444)
    this.element.appendChild(this.renderer.domElement)
    //渲染函数
    const startRendering = () => {
      this.labelRenderer.render(this.scene, this.camera)
      this.renderer.render(this.scene, this.camera)
      window.requestAnimationFrame(startRendering)
    }
    startRendering()
  }

  //执行渲染
  renderAction() {
    this.render()
    const orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
    orbitControls.target.set(...this.center)
    orbitControls.update()
  }
}

const model = new Model()
export default model
