import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import moment from 'moment'
import store from './store'
import request from './utils/request'
Vue.prototype.$request = request
Vue.prototype.$moment = moment
Vue.config.productionTip = false
Vue.filter('showCount', function(count){
  count = Math.floor(count/10000)>=1?Math.floor(count/10000) + '万':count
  return count
})
Vue.filter('detailTime', function(dt){
  let m = Math.floor(dt / 1000 / 60)
    m = m<10? '0' + m:m
    let s = Math.floor(dt / 1000 % 60)
    s = s<10? '0' + s:s
    const detailtime = m+':'+s 
    return detailtime
})
Vue.filter('needChange',needChangeType => {
  return needChangeType.filter(item => {
    return item  == this.currentType
  })
})
Vue.directive('lazyLoading',{
  bind: function(el,binding) {
    let imgObserver = new IntersectionObserver(entries => {
      entries.forEach(item => {
        let itemElement = item.target
        if(item.intersectionRatio > 0){
          console.log(item.intersectionRatio)
          itemElement.src = binding.value
          imgObserver.unobserve(itemElement)
        }
      })
    })
    imgObserver.observe(el)
  }
}
)
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')

