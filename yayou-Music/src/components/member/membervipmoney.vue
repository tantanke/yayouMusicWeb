<template>
<div class="father">
    <el-row :gutter="18">
        <p>涯悠会员</p>
        <el-divider></el-divider>
        <el-col :span="6" class="special">
            <li class="product-item active">
                <div class="product-item-origin">
                    <span class="product-item-origin-finalprice">40</span>
                    元
                </div>
                <div class="product-item-desc">
                    13.33元/月
                </div>
                <div class="product-item-month">
                    3个月
                </div>
            </li>
        </el-col>
        <el-col :span="6" class="special">
            <li class="product-item ">
                <div class="product-item-origin">
                    <span class="product-item-origin-finalprice">40</span>
                    元
                </div>
                <div class="product-item-desc">
                    13.33元/月
                </div>
                <div class="product-item-month">
                    3个月
                </div>
            </li>
        </el-col>
        <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <div class="m-vipcashier-settle-body">
        <div class="u-settle-qrcode">
            <img src="../../assets/img/homePage/二维码.png">
        </div>
        <div class="u-settle-detail">
            <p class="detail-title">使用微信、支付宝扫码支付</p>
            <div class="detail-icons">
                <img src="../../assets/img/homePage/微信图标.png"/>
                <img src="../../assets/img/homePage/支付宝图标.png"/>
            </div>
            <div class="detail-body">
                <span class="detail-origin-price">4.8</span>
                元
                <span class="detail-cost-price">(已省<span class="detail-cost-price-count">6.2元</span>)</span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {

}
</script>
<style>
    .father{
       margin-left: 200px;
       margin-right: 230px;
    }
    .product-item{
        margin: 0 15px;
        border: 1px solid #eee;
        border-radius: 2px;
        height: 142px;
        margin: 0 5px;
        position: relative;
        overflow: hidden;
    }
    .product-item-origin{
        padding-top: 20px;
        font-size: 14px;
        color:#151515;
        text-align: center;
        line-height: 30px;
    }
    .active {
        border-color: #fa4f4d;
    }
    .product-item-desc{
        font-size: 14px;
        color:#999;
        text-align: center;
        padding-top: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        max-width: 80%;
        margin: 0 auto;
    }
    .product-item-month {
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        padding: 10px 0;
    }
    .m-vipcashier-settle-body {
        border: 1px solid #eee;
        padding: 20px;
        margin-top: 90px;
    }
    .m-vipcashier-settle-body::before {
        content: "\652F\4ED8\65B9\5F0F";
        display: block;
        font-size: 14px;
        color: #333;
        position: relative;
        top: -66px;
        line-height: 20px;
    }
    .u-settle-qrcode {
        top: 338px;
        display: inline-block;
        position: absolute;
        left: 220px;
    }
    .u-settle-qrcode img{
        width: 100px;
        height: 100px;
    }
    .u-settle-detail {
        display: inline-block;
        padding-left: 120px;
        width: 100%;
        font-size: 14px;
        vertical-align: top;
        height: 100px;
    }
    .detail-title {
        font-size: 14px;
        line-height: 14px;
        color:#333;
    }
    .detail-icons {
        margin-top: 10px;
        height: 18px;
    }
    .detail-icons img {
        display: inline-block;
        height: 100%;
        margin-right: 10px;
    }
    .detail-body {
        margin-top: 18px;
        color: #333;
    }
    .detail-origin-price {
        font-size: 44px;
        line-height: 44px;
    }
    .detail-cost-price {
        margin-left: 20px;
        font-size: 14px;
    }
</style>
