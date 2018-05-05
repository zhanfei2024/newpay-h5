<template>
    <div>
      <census-table></census-table>
      <my-cell title="开通人" :value="dataObj.createUserName"></my-cell>
      <my-cell title="开通时间" :value="dataObj.createTime"></my-cell>
      <my-cell title="商户状态" :value="dataObj.merchantStatus"></my-cell>
      <my-block left bottom>商户信息</my-block>
      <my-cell title="商户名称" :value="dataObj.accountName"></my-cell>
      <my-cell title="商户地址" :value="dataObj.address"></my-cell>
      <my-cell title="商户类型" :value="dataObj.mccName"></my-cell>
      <my-cell title="地区码" :value="dataObj.areaCode"></my-cell>
      <my-cell title="门头照" is-link></my-cell>
      <my-cell title="场景照" is-link></my-cell>
      <my-block left bottom>联系信息</my-block>
      <my-cell title="联系人" :value="dataObj.contactName"></my-cell>
      <my-cell title="手机号" :value="dataObj.contactPhone"></my-cell>
      <my-cell title="联系邮箱" :value="dataObj.contactEmail"></my-cell>
      <my-block left bottom>营业执照信息</my-block>
      <my-cell title="营业执照号" :value="dataObj.licenseCode"></my-cell>
      <my-cell title="营业执照名" :value="dataObj.merchantName"></my-cell>
      <my-cell title="营业执照地址" :value="dataObj.licenseAdrress"></my-cell>
      <my-cell title="营业执照有限期" :value="dataObj.licenseValidity"></my-cell>
      <my-cell title="组织机构照" is-link></my-cell>
      <my-cell title="税务登记证照" is-link></my-cell>
      <my-block left bottom>法人信息</my-block>
      <my-cell title="法人姓名" :value="dataObj.corpName"></my-cell>
      <my-cell title="法人身份证" :value="dataObj.corpIdNumber"></my-cell>
      <my-cell title="有效期限" :value="dataObj.corpIdValidity"></my-cell>
      <my-cell title="法人证件照" is-link></my-cell>
      <my-cell title="手持证件照" is-link></my-cell>
      <my-block left bottom>账户信息</my-block>
      <my-cell title="结算标志" :value="dataObj.isPersonal==0 ? '对公':'对私'"></my-cell>
      <my-cell title="结算账户" :value="dataObj.accountNumber"></my-cell>
      <my-cell title="户名" :value="dataObj.bankName"></my-cell>
      <my-cell title="开户行号" :value="dataObj.bankCode"></my-cell>
      <my-cell title="结算人身份证号" :value="dataObj.accountIdNumer"></my-cell>
      <my-cell title="身份证有限期" :value="dataObj.accountIdValidity"></my-cell>
      <my-cell title="结算人身份证" is-link></my-cell>
      <my-cell title="结算人手持身份证" is-link></my-cell>
      <my-cell title="卡种" :value="dataObj.posCardType"></my-cell>
      <my-cell title="交易类型" :value="dataObj.posTradeType"></my-cell>
      <my-cell title="免密免签" :value="dataObj.posNoNeedPass"></my-cell>
      <my-cell title="扫码小票商户名称" :value="dataObj.scanName"></my-cell>
      <my-cell title="终端POS数量" :value="dataObj.termCount"></my-cell>
    </div>
  </template>
  <script>
    import censusTable from './components/merchant-tongji-table.vue'
    export default {
      name: "component_name",
      data() {
        return {};
      },
      components:{
        censusTable,
      },
      props:{
        dataObj:{
          type:Object,
          default:{}
        }
      }
    }
  </script>
  <style lang="css" scoped>
  
  </style>