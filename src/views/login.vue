<template>
    <div style="height:100vh;">
        <!--    <div style="height: 11vh;background: #fff;overflow: hidden;">-->
        <!--      <img src="../assets/top-logo.png" style="margin-left: 15%;padding: 2vh;height: 100%">-->
        <!--      <img src="../assets/top-logo-right.png" style="float: right;margin-right: 15%;height: 100%;">-->
        <!--    </div>-->
        <Row style="height: 11vh;background: #fff;overflow: hidden;">
            <Col :xs="24" :sm="24" :md="24" :lg="12" style="height: 100%;display: grid;justify-content: center;">
                <img src="../assets/top-logo.png" style="padding: 2vh;height: 100%">
            </Col>
            <Col :xs="0" :sm="0" :md="0" :lg="12" style="height: 100%;display: flex;justify-content: center;">
                <img src="../assets/top-logo-right.png" style="height: 100%;">
            </Col>
        </Row>
        <Row type="flex" justify="end" @keydown.enter.native="submitLogin" class="login" style="margin-top: 0 !important;">
            <Col :xs="0" :sm="0" :md="0" :lg="8" class="centerImage">
                <div class="imgDiv">
                    <img src="../assets/centerImage.png" style="width: 100%;max-height: 89vh;">
                </div>
            </Col>
            <Col class="layout">
                <div style="display: grid">
                    <div style="text-align: center;margin-bottom: 5%;">
                        <img src="../assets/welcome.png">
                    </div>

                    <Form
                        ref="usernameLoginForm"
                        :model="form"
                        :rules="rules"
                        class="form"
                        v-if="tabName == 'username'">
                        <FormItem prop="username">
                            <Input
                                v-model="form.username"
                                prefix="ios-contact"
                                size="large"
                                clearable
                                placeholder="??????????????????"
                                autocomplete="off"/>
                        </FormItem>
                        <FormItem prop="password">
                            <Input
                                type="password"
                                v-model="form.password"
                                prefix="ios-lock"
                                size="large"
                                password
                                placeholder="???????????????"
                                autocomplete="off"/>
                        </FormItem>
                        <FormItem prop="imgCode">
                            <Row type="flex" justify="space-between" style="align-items: center; overflow: hidden">
                                <Input
                                    v-model="form.imgCode"
                                    size="large"
                                    clearable
                                    placeholder="????????????????????????"
                                    :maxlength="10"
                                    class="input-verify"/>
                                <div class="code-image" style="position: relative; font-size: 12px">
                                    <Spin v-if="loadingCaptcha" fix></Spin>
                                    <img :src="captchaImg" @click="getCaptchaImg" alt="?????????????????????"
                                         style="width: 110px; cursor: pointer; display: block"/>
                                </div>
                            </Row>
                        </FormItem>
                    </Form>
                    <Row style="margin: 0 30px;color: rgb(41,96,226);width: 100%;">
                        <div style="width: auto;cursor: pointer;text-decoration:underline;" @click="previewFile">????????????</div>
                    </Row>
                    <Row style="margin: 0 30px;">
                        <Button class="login-btn" type="primary" size="large" :loading="loading" @click="submitLogin" long>
                            <span v-if="!loading">{{ $t("login") }}</span>
                            <span v-else>{{ $t("logining") }}</span>
                        </Button>
                    </Row>
                </div>
            </Col>
        </Row>
        <div class="login-span">
            <span>???????????????:{{softwareServiceProvider}}</span>
            <span>????????????:{{softwareVersion}}</span>
            <span>????????????:{{serviceHotline}}</span>
        </div>
        <div class="login-span">
            <span>????????????:</span>
            <a href="https://www.sccdc.cn" title="??????????????????????????????????????????" target="_blank">?????????????????????????????????</a>
            <a href="http://wsjkw.sc.gov.cn" title="???????????????????????????????????????" target="_blank">??????????????????????????????</a>
            <a href=" http://ylbzj.sc.gov.cn" title="?????????????????????????????????" target="_blank">????????????????????????</a>
        </div>
        <pdfPreview v-model="pdfPreviewShow" :url="pdfUrl"></pdfPreview>
    </div>
</template>

<script>
import {login, userInfo, initCaptcha, drawCodeImage} from "@/api/index";
import {validateMobile} from "@/libs/validate";
import Cookies from "js-cookie";
import Header from "@/views/main-components/header";
import Footer from "@/views/main-components/footer";
import LangSwitch from "@/views/main-components/lang-switch";
import CountDownButton from "@/views/my-components/scmt/count-down-button";
import pdfPreview from "./pdfPreview";
import util from "@/libs/util.js";
import {formartDate} from "@/api/tools/tool";
import {exportTemplatePdfZip} from '@/api/healthy/tTemplate'
import Vue from 'vue'
import { getSynchronizationRequest} from '@/api/healthy/ftpClient'
export default {
    components: {
        CountDownButton,
        LangSwitch,
        Header,
        Footer,
        pdfPreview
    },
    data() {
        return {
            //????????????
            softwareServiceProvider: "",
            softwareVersion: "",
            serviceHotline: "",

            pdfPreviewShow: false,
            pdfUrl: "",
            showMore: false,
            captchaId: "",
            captchaImg: "",
            loadingCaptcha: true,
            error: false,
            tabName: "username",
            saveLogin: true,
            getSms: "???????????????",
            loading: false,
            sending: false,
            errorCode: "",
            form: {
                username: "",
                password: "123456",
                mobile: "",
                code: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "??????????????????",
                        trigger: "change",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "??????????????????",
                        trigger: "change",
                    },
                ],
                imgCode: [
                    {
                        required: true,
                        message: "?????????????????????",
                        trigger: "change",
                    },
                ],
                mobile: [
                    {
                        required: true,
                        message: "?????????????????????",
                        trigger: "change",
                    },
                    {
                        validator: validateMobile,
                        trigger: "change",
                    },
                ],
            },
        };
    },
    methods: {
        getCaptchaImg() {
            this.loadingCaptcha = true;
            initCaptcha().then((res) => {
                this.loadingCaptcha = false;
                if (res.success) {
                    this.captchaId = res.data;
                    this.captchaImg = drawCodeImage + this.captchaId;
                }
            });
        },
        sendSmsCode() {
            this.$refs.mobileLoginForm.validate((valid) => {
                if (valid) {

                }
            });
        },
        submitLogin() {
            if (this.tabName == "username") {
                this.$refs.usernameLoginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        login({
                            username: this.form.username,
                            password: this.form.password,
                            code: this.form.imgCode,
                            captchaId: this.captchaId,
                            saveLogin: this.saveLogin,
                        }).then((res) => {
                            if (res.success) {
                                this.setStore("accessToken", res.data);
                                // ??????????????????
                                userInfo().then((res) => {
                                    if (res.success) {
                                        // ????????????????????????
                                        delete res.data.permissions;
                                        let roles = [];
                                        res.data.roles.forEach((e) => {
                                            roles.push(e.name);
                                        });
                                        delete res.data.roles;
                                        this.setStore("roles", roles);
                                        this.setStore("saveLogin", this.saveLogin);

                                        this.$store.commit("setNickname", res.data.nickname);
                                        if (res.data.avatar) {
                                            this.$store.commit("setAvatar", "data:image/png;base64," + res.data.avatar);
                                        }
                                        //?????????????????????base64?????????????????????cookies??????????????? ???????????????????????????????????????userInfo????????????
                                        delete res.data.avatar;
                                        delete res.data.autograph;
                                        if (this.saveLogin) {
                                            // ??????1???
                                            Cookies.set("userInfo", JSON.stringify(res.data), {
                                                expires: 1,
                                            });
                                        } else {
                                            Cookies.set("userInfo", JSON.stringify(res.data));
                                        }
                                        this.setStore("userInfo", res.data);
                                        this.$store.commit("setUserInfo", res.data);
                                        let _this = this;
                                        util.initRouter(this, function () {
                                            _this.$store.commit("setCurrNav", "");
                                            _this.$store.commit("setShrink", true);
                                            _this.$store.commit("setMenuWidth", 0);
                                            _this.$store.commit("setLeftWidth", 0);
                                            _this.$store.commit("setProcessShow", 0);
                                            _this.$router.replace({
                                                path: "home"
                                            });
                                        });
                                        //??????lis??????
										// getSynchronizationRequest({}).then(res => {
                                        //
										// 	if (res && res.success) {
										// 		//this.$Message.success(res.msg);
										// 	}
										// 	else{
										// 		this.$Message.error("??????????????????");
										// 	}
										// }).catch(err => {
										// 	//this.$Message.error("??????????????????");
										// });
                                        //??????????????????????????????
                                        // let _this = this;
                                        // // ????????????
                                        // util.initRouter(this, function (v) {
                                        //   let data = _this.$store.state.app.navList;
                                        //   if (data && data.length > 0) {
                                        //     if (data[0].children && data[0].children.length > 0 && data[0].children[0].children && data[0].children[0].children.length > 0){
                                        //       let path = "";
                                        //       path = data[0].children[0].path == "/" ? "" : data[0].children[0].path;
                                        //       path += /^\/./.test(data[0].children[0].children[0].path) ? data[0].children[0].children[0].path : "/" + data[0].children[0].children[0].path;
                                        //       _this.$router.replace({
                                        //         path: path
                                        //       });
                                        //     }else {
                                        //       _this.$router.replace({
                                        //         path: "home"
                                        //       });
                                        //     }
                                        //   } else {
                                        //     _this.$Modal.confirm({
                                        //       title: '??????',
                                        //       content: '?????????????????????????????????????????????????????????',
                                        //       onOk: () => {
                                        //         _this.$Modal.remove()
                                        //         _this.$store.commit("logout", _this);
                                        //         _this.setStore("accessToken", "");
                                        //         // ?????????????????? ????????????router
                                        //         location.reload();
                                        //       },
                                        //       onCancel: () => {
                                        //         _this.$Modal.remove()
                                        //         _this.$store.commit("logout", _this);
                                        //         _this.setStore("accessToken", "");
                                        //         // ?????????????????? ????????????router
                                        //         location.reload();
                                        //       }
                                        //     });
                                        //     _this.loading = false;
                                        //   }
                                        // });
                                    } else {
                                        this.loading = false;
                                    }
                                });
                            } else {
                                this.loading = false;
                                this.getCaptchaImg();
                            }
                        });
                    }
                });
            } else if (this.tabName == "mobile") {
                this.$refs.mobileLoginForm.validate((valid) => {
                    if (valid) {
                        if (this.form.code == "") {
                            this.errorCode = "?????????????????????";
                            return;
                        } else {
                            this.errorCode = "";
                        }
                        this.form.saveLogin = this.saveLogin;

                    }
                });
            }
        },
        //????????????
        previewFile(){
            //?????????????????????
            window.open('/excel/????????????.pdf');

            //?????????????????????
            /*this.pdfUrl = "/excel/????????????.pdf";
            this.pdfPreviewShow = true;*/
        },
        toGithubLogin() {

        },
        toQQLogin() {

        },
        toWeiboLogin() {

        },
        toWeixinLogin() {

        },
        toDingdingLogin() {

        },
        toWorkwechatLogin() {

        },
        relatedLogin() {
        },
        handleDropDown(v) {

        },
    },
    mounted() {
        this.relatedLogin();
        this.getCaptchaImg();

        //????????????
        let Software = this.$hospitalName.Software;
        this.softwareServiceProvider= Software["???????????????"];
        this.softwareVersion= Software["????????????"];
        this.serviceHotline= Software["????????????"];
    },
};
</script>

<style lang="less">
@import "./login.less";
</style>
