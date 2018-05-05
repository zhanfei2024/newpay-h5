<template>
  <div>
    <my-header fixed title="门店详情">
      <mt-button icon="back" slot="left" @click.native="$router.go(-1)">返回</mt-button>
    </my-header>
    <my-block></my-block>
    <census-table></census-table>
    <my-cell title="开通人" :value="storeSelect.createUserName"></my-cell>
    <my-cell title="开通时间" :value="storeSelect.createTime"></my-cell>
    <my-cell title="商户状态" :value="storeSelect.merchantStatus"></my-cell>
    <my-block left bottom>商户信息</my-block>
    <my-cell title="商户名称" :value="storeSelect.accountName"></my-cell>
    <my-cell title="商户地址" :value="storeSelect.address"></my-cell>
    <my-cell title="商户类型" :value="storeSelect.mccName"></my-cell>
    <my-cell title="地区码" :value="storeSelect.areaCode"></my-cell>
    <my-cell title="门头照" is-link></my-cell>
    <my-cell title="场景照" is-link></my-cell>
    <my-block left bottom>联系信息</my-block>
    <my-cell title="联系人" :value="storeSelect.contactName"></my-cell>
    <my-cell title="手机号" :value="storeSelect.contactPhone"></my-cell>
    <my-cell title="联系邮箱" :value="storeSelect.contactEmail"></my-cell>
    <my-block left bottom>营业执照信息</my-block>
    <my-cell title="营业执照号" :value="storeSelect.licenseCode"></my-cell>
    <my-cell title="营业执照名" :value="storeSelect.merchantName"></my-cell>
    <my-cell title="营业执照地址" :value="storeSelect.licenseAdrress"></my-cell>
    <my-cell title="营业执照有限期" :value="storeSelect.licenseValidity"></my-cell>
    <my-cell title="组织机构照" is-link></my-cell>
    <my-cell title="税务登记证照" is-link></my-cell>
    <my-block left bottom>法人信息</my-block>
    <my-cell title="法人姓名" :value="storeSelect.corpName"></my-cell>
    <my-cell title="法人身份证" :value="storeSelect.corpIdNumber"></my-cell>
    <my-cell title="有效期限" :value="storeSelect.corpIdValidity"></my-cell>
    <my-cell title="法人证件照" is-link></my-cell>
    <my-cell title="手持证件照" is-link></my-cell>
    <my-block left bottom>账户信息</my-block>
    <my-cell title="结算标志" :value="storeSelect.isPersonal==0 ? '对公':'对私'"></my-cell>
    <my-cell title="结算账户" :value="storeSelect.accountNumber"></my-cell>
    <my-cell title="户名" :value="storeSelect.bankName"></my-cell>
    <my-cell title="开户行号" :value="storeSelect.bankCode"></my-cell>
    <my-cell title="结算人身份证号" :value="storeSelect.accountIdNumer"></my-cell>
    <my-cell title="身份证有限期" :value="storeSelect.accountIdValidity"></my-cell>
    <my-cell title="结算人身份证" is-link></my-cell>
    <my-cell title="结算人手持身份证" is-link></my-cell>
    <my-cell title="卡种" :value="storeSelect.posCardType"></my-cell>
    <my-cell title="交易类型" :value="storeSelect.posTradeType"></my-cell>
    <my-cell title="免密免签" :value="storeSelect.posNoNeedPass"></my-cell>
    <my-cell title="扫码小票商户名称" :value="storeSelect.scanName"></my-cell>
    <my-cell title="终端POS数量" :value="storeSelect.termCount"></my-cell>
  </div>
</template>
<script>
  import merchantDetail from './components/merchant-detail.vue'
  export default {
    name: "component_name",
    data() {
      return {};
    },
    computed: {
      storeSelect() {
        return this.$store.getters['merchant/storeSelect']
      },
      storeList() {
        return this.$store.getters['merchant/storeList']
      }
    },
    components: {
      merchantDetail,
    }
  }
</script>
<style lang="css" scoped>

</style>