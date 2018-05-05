<template>
    <div class="height-all bg-white">
        <my-header title="商户审核" fixed>
            <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
        </my-header>

        <div class="merchant-check-page">
            <div class="merchant-check-info">
                <router-link :to="'/user-info'" class="nick"><span class="nick-label">昵称</span>
                    <span class="nick-name">test</span>
                    <span class="reload-more clearfix"><i class="material-icons icon iconfont">chevron_right</i></span>
                </router-link>
                <p class="apply-time"><span class="time-label">申请时间</span><span class="time-text">2017-10-10 19:12</span></p>
                <p class="apply-status"><span class="status-label">申请状态</span><span class="status-text">待审核</span></p>
                <router-link :to="'/merchant-check'" class="apply-content">
                    <p class="content-label">审核内容</p>
                    <div class="content-info">
                        <p class="merchant-name">商户名称：我是商户名称商户名称</p>
                        <p class="merchant-contact">联系人：test</p>
                        <p class="submit-time">申请时间：2017-10-10 19：12</p>
                    </div>
                    <div class="reload-more clearfix">
                        <i class="material-icons icon iconfont pull-right">chevron_right</i>
                    </div>
                </router-link>
            </div>
            <div class="check-state-tab">
                <p @click="tabSelected = 'process'" class="tab-item" :class="{selectedTab: tabSelected === 'process'}">
                流程</p>
                <p @click="tabSelected = 'action'" class="tab-item" :class="{selectedTab: tabSelected === 'action'}">
                动态</p>
            </div>
            <div v-if="tabSelected === 'process'" class="check-process-content">
                <div class="process-step" :class="{currentStep: step === '1'}">
                    <span class="step-circle">1</span>
                    <span class="step-text">test提交申请</span>
                </div>
                <div class="process-step" :class="{currentStep: step === '2'}">
                    <span class="step-circle">2</span>
                    <span class="step-text">服务商已审核<span class="text-point">&nbsp;·&nbsp;</span><span class="check-status">审核通过</span></span>
                </div>
                <div class="process-step" :class="{currentStep: step === '3'}">
                    <span class="step-circle">3</span>
                    <span class="step-text">等待支付机构审核</span>
                </div>
                <div class="process-step" :class="{currentStep: step === '4'}">
                    <span class="step-circle">4</span>
                    <span class="step-text">支付机构<span class="text-point"></span><span class="check-status">审核通过</span></span>
                </div>
                <div class="process-step" :class="{currentStep: step === '5'}">
                    <span class="step-circle">5</span>
                    <span class="step-text">等待签署协议</span>
                </div>
                <div class="process-step" :class="{currentStep: step === '6'}">
                    <span class="step-circle">6</span>
                    <span class="step-text">完成开通</span>
                </div>
            </div>
            <div v-if="tabSelected === 'action'" class="check-process-content">

            </div>
        </div>
        <my-naviget-tab selected="action"></my-naviget-tab>
    </div>

</template>

<script type="text/ecmascript-6">
  import myNavigetTab from '../commons/navigate-tab.vue'
export default {
    name: 'merchantCheck',
    data() {
      return {
          tabSelected: 'process',
          step: '1'
      }
    },
    components: {
        myNavigetTab
    }
}
</script>

<style scoped lang="scss">
    @import './merchant-apply.scss'
</style>
