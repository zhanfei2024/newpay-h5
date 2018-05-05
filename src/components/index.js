import header from './header.vue'
import block from './my-block.vue'
import grid from './grid.vue'
import gridItem from './grid-item.vue'
import iconArrow from './icon-arrow.vue'
import centerHeader from './center-header.vue'
import search from './search.vue'
import bottomPopup from './bottom-popup.vue'
import radio from './radio.vue'
import cell from './cell.vue'
import noInfo from './no-info.vue'
import searchStatic from './search-static.vue'
// import datetime from "./datetime";
var getChildrenTextContent = function (children) {
  return children.map(function (node) {
    return node.children
      ? getChildrenTextContent(node.children)
      : node.text
  }).join('')
}
export default (Vue)=>{
  Vue.component(header.name,header)
  Vue.component(iconArrow.name,iconArrow)
  Vue.component(block.name,block)
  Vue.component(grid.name,grid)
  Vue.component(gridItem.name,gridItem)
  Vue.component(centerHeader.name,centerHeader)
  Vue.component(search.name,search)
  Vue.component(radio.name,radio)
  Vue.component(bottomPopup.name,bottomPopup)
  Vue.component(cell.name,cell)
  Vue.component(noInfo.name,noInfo)
  Vue.component(searchStatic.name,searchStatic)
  // Vue.component(datetime.name, datetime);

  Vue.component('anchored-heading', {
    render: function (createElement) {
      // create kebabCase id
      var headingId = getChildrenTextContent(this.$slots.default)
        .toLowerCase()
        .replace(/\W+/g, '-')
        .replace(/(^\-|\-$)/g, '')
      return createElement(
        'h' + this.level,
        [
          createElement('a', {
            attrs: {
              name: headingId,
              // href: '#' + headingId
            },
            on:{
              click:()=>{
                this.fnClick();
              }
          }
          }, '查看')
        ]
      )
    },
    props: {
      level: {
        type: Number,
        required: true
      },
      aaa:false
    },
    methods:{
      fnClick(){
        this.aaa=true;
        console.log("this:",this.aaa);
      }
    }
  })
}