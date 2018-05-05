<template>
    <div class="merchant-check-page">
        <!-- 审核信息 -->
        <div v-if="!picShow" class="height-all bg-white">
            <my-header title="商户审核" fixed>
                <mt-button icon="back" slot="left" @click="$router.go(-1)">返回</mt-button>
            </my-header>

            <div class="check-content">
                <!-- 申请人信息 -->
                <ul class="apply-person">
                    <li class="item border-bottom line-height-40">
                        <span class="label">申请人</span>
                        <span class="content">test</span>
                    </li>
                    <li class="item line-height-40">
                        <span class="label">申请时间</span>
                        <span class="content">2017-09-12</span>
                    </li>
                </ul>

                <!-- 商户信息 -->
                <ul class="merchant">
                    <li class="more-title">商户信息</li>
                    <li class="item">
                        <span class="label">商户名称</span>
                        <span class="content">test</span>
                    </li>
                    <li class="item">
                        <span class="label">商户地址</span>
                        <span class="content">深圳市龙岗区神神道道</span>
                    </li>
                    <li class="item">
                        <span class="label">商户类型</span>
                        <span class="content">个体</span>
                    </li>
                    <li class="item border-bottom">
                        <span class="label">地区码</span>
                        <span class="content">07555</span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">门头照</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">场景照</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                </ul>

                <!-- 联系信息 -->
                <ul class="business">
                    <li class="more-title">联系信息</li>
                    <li class="item">
                        <span class="label">联系人</span>
                        <span class="content">test</span>
                    </li>
                    <li class="item">
                        <span class="label">手机号</span>
                        <span class="content">15629170060</span>
                    </li>
                    <li class="item">
                        <span class="label">联系邮箱</span>
                        <span class="content">2024539581@qq.com</span>
                    </li>
                </ul>


                <!-- 执照信息 -->
                <ul class="business">
                    <li class="more-title">执照信息</li>
                    <li class="item">
                        <span class="label">营业执照号</span>
                        <span class="content">对私</span>
                    </li>
                    <li class="item">
                        <span class="label">营业执照名</span>
                        <span class="content">4222222222www22222</span>
                    </li>
                    <li class="item">
                        <span class="label">营业执照地址</span>
                        <span class="content">深圳市龙岗区横岗李佳文化深圳市龙岗区横岗李佳文化深圳市龙岗区横岗李佳文化深圳市龙岗区横岗李佳文化</span>
                    </li>
                    <li class="item border-bottom">
                        <span class="label">营业执照有效期</span>
                        <span class="content">2018-12-01--2019-21-22</span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">税务登记证照</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">组织机构照</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">营业执照照片</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                </ul>

                <!-- 法人信息 -->
                <ul class="legalperson">
                    <li class="more-title">法人信息</li>
                    <li class="item">
                        <span class="label">法人姓名</span>
                        <span class="content">test</span>
                    </li>
                    <li class="item">
                        <span class="label">法人身份证</span>
                        <span class="content">422222222222222</span>
                    </li>
                    <li class="item border-bottom">
                        <span class="label">有效期限</span>
                        <span class="content">2018-12-01--2019-21-22</span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">法人身份证正面照</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">法人身份证背面照</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">法人手持身份证</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                </ul>

                <!-- 账户信息 -->
                <ul class="account">
                    <li class="more-title">账户信息</li>
                    <li class="item">
                        <span class="label">结算标志</span>
                        <span class="content">对私</span>
                    </li>
                    <li class="item">
                        <span class="label">结算账户</span>
                        <span class="content">3445555566666</span>
                    </li>
                    <li class="item">
                        <span class="label">户名</span>
                        <span class="content">test</span>
                    </li>
                    <li class="item">
                        <span class="label">开户行号</span>
                        <span class="content">33333333333</span>
                    </li>
                    <li class="item">
                        <span class="label">结算人身份证号</span>
                        <span class="content">421124187955555</span>
                    </li>
                    <li class="item border-bottom">
                        <span class="label">身份证有效期</span>
                        <span class="content">2018-12-01--2019-21-22</span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">银行卡号</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">开户行许可证</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">结算人身份证正面照</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">结算人身份证背面照</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                </ul>


                <!-- 协议签署 -->
                <ul class="protocol">
                    <li class="more-title">签署协议</li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">特约商户支付服务协议</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">商户信息表</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">授权书</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                    <li @click="reloadPic('http://via.placeholder.com/414x600')" class="item-border">
                        <span class="label">手持授权合照</span>
                        <span class="reload-more"><i class="material-icons icon iconfont pull-right">chevron_right</i></span>
                    </li>
                </ul>
                


            </div>

            <div class="merchant-check-footer">
                <span class="check-fail" @click="reject">不通过</span>
                <span class="check-line"></span>
                <span class="check-success" @click="success">通过</span>
            </div>
        </div>

        <!-- 照片预览 -->
        <div v-if="picShow" class="height-all bg-white">
            <my-header title="图片预览" fixed>
                <mt-button icon="back" slot="left" @click="picShow = false">返回</mt-button>
            </my-header>
            <img :src="picUrl" alt="">
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
import {MessageBox} from 'mint-ui';

export default {
    data() {
        return {
            picShow: false,
            picUrl: ''
        }
    },
    created() {
    },
    methods: {
        reject() {
            MessageBox.prompt(' ', '不通过原因').then(({ value }) => {
            if (value) {
                MessageBox.alert(`你的名字是 ${ value }`, '输入成功');
            }
            });
        },
        success() {
            MessageBox.alert('该用户已经提交至新大陆!', '提示');
        },
        reloadPic(picUrl) {
            console.log('test');
            this.picShow = true;
            this.picUrl = picUrl;
        }
    },
    components: {

    }
}
</script>

<style scoped lang="scss">
@import './merchant-check.scss';
</style>
