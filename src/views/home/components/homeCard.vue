<style lang="less">

    .homeCard {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 10;
        transform: translate(-50%, -50%);
        width: (1440 / 19.2vw);
        height: (366 / 19.2vw);
        display: flex;

        .health {
            width: (340 / 19.2vw);
            height: 100%;
            margin-right: (15 / 19.2vw);

            .card {
                padding: (15 / 19.2vw) (20 / 19.2vw);
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: (340 / 19.2vw);
                height: (175 / 19.2vw);
                border-radius: ( 4 / 19.2vw);
                box-sizing: border-box;

                .wrapper {
                    img {
                        width: (110 / 19.2vw);
                    }
                }

                .desc {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    h2 {
                        font-size: (20 / 19.2vw);
                        color: #fff;
                        margin-bottom: (10 / 19.2vw);
                    }
                }
            }

            .j {
                background-color: #03CB83;
                color: #03CB83;

                button {
                    padding: 0 (15 / 19.2vw);
                    font-size: (14 / 19.2vw);
                    width: (110 / 19.2vw);
                    color: #03CB83;

                    &:hover {
                        border-color: #03CB83;
                    }
                }
            }

            .c {
                background-color: #6993FE;
                margin-top: (15 / 19.2vw);
                color: #6993FE;

                button {
                    padding: 0 (15 / 19.2vw);
                    font-size: (14 / 19.2vw);
                    width: (110 / 19.2vw);
                    color: #6993FE;

                    &:hover {
                        border-color: #6993FE;
                    }
                }
            }
        }

        .profession {
            width: (460 / 19.2vw);
            height: 100%;
            background-color: #FFA801;
            margin-right: (15 / 19.2vw);
            border-radius: (4 / 19.2vw);
            padding: (20 / 19.2vw);
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .l {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                h2 {
                    font-size: (20 / 19.2vw);
                    color: #fff;
                    margin-bottom: (10 / 19.2vw);
                }

                button {
                    padding: 0 (15 / 19.2vw);
                    font-size: (14 / 19.2vw);
                    width: (100 / 19.2vw);
                    color: #FFA801;

                    &:hover {
                        border-color: #FFA801;
                    }
                }
            }

            .r {
                img {
                    width: (260 / 19.2vw);
                }
            }
        }

        .xray {
            width: (223 / 19.2vw);
            height: 100%;
            background-color: #6F42C1;
            margin-right: ( 15 / 19.2vw);
            border-radius: (4 / 19.2vw);
            padding: (30 / 19.2vw) (15 / 19.2vw) (20 / 19.2vw) (15 / 19.2vw);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;

            .t {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                h2 {
                    font-size: (20 / 19.2vw);
                    color: #fff;
                    margin-bottom: (10 / 19.2vw);
                }

                button {
                    padding: 0 (15 / 19.2vw);
                    font-size: (14 / 19.2vw);
                    width: (110 / 19.2vw);
                    color: #6F42C1;

                    &:hover {
                        border-color: #6F42C1;
                    }
                }
            }

            .d {
                img {
                    width: (180 / 19.2vw);
                }
            }
        }

        .sys {
            box-sizing: border-box;
            width: (360 / 19.2vw);
            height: 100%;

            .card {
                padding: (15 / 19.2vw) (20 / 19.2vw);
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: ( 340 / 19.2vw);
                height: (175 / 19.2vw);
                border-radius: (4 / 19.2vw);
                box-sizing: border-box;

                .wrapper {
                    img {
                        width: (110 / 19.2vw);
                    }
                }

                .desc {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    h2 {
                        font-size: (20 / 19.2vw);
                        color: #fff;
                        margin-bottom: (10 / 19.2vw);
                    }
                }
            }

            .j {
                background-color: #344CBF;
                color: #344CBF;

                button {
                    padding: 0 (15 / 19.2vw);
                    font-size: (14 / 19.2vw);
                    width: (110 / 19.2vw);
                    color: #344CBF;

                    &:hover {
                        border-color: #344CBF;
                    }
                }
            }

            .c {
                background-color: #FE7359;
                margin-top: (15 / 19.2vw);
                color: #FE7359;

                button {
                    padding: 0 (15 / 19.2vw);
                    font-size: (14 / 19.2vw);
                    width: (110 / 19.2vw);
                    color: #FE7359;

                    &:hover {
                        border-color: #FE7359;
                    }
                }
            }
        }
    }
</style>
<template>
    <div class="homeCard">
        <div class="health">

            <!--??????????????????-->
            <div class="card j">
                <div class="wrapper">
                    <img src="@/assets/??????.png">
                </div>
                <div class="desc">
                    <h2>??????????????????</h2>
                    <Button @click="handel(2,'????????????')">????????????</Button>
                </div>
            </div>

            <!--??????????????????-->
            <div class="card c">
                <div class="wrapper">
                    <img src="@/assets/??????.png">
                </div>
                <div class="desc">
                    <h2>??????????????????</h2>
                    <Button @click="handel(3,'????????????')">????????????</Button>
                </div>
            </div>
        </div>
        <!--??????????????????-->
        <div class="profession">
            <div class="l">
                <h2>??????????????????</h2>
                <Button @click="handel(1,'????????????')">????????????</Button>
            </div>
            <div class="r">
                <img src="@/assets/??????.png">
            </div>
        </div>

        <!--??????????????????-->
        <div class="xray">
            <div class="t">
                <h2>??????????????????</h2>
                <Button @click="handel(4,'????????????')">????????????</Button>
            </div>
            <div class="d">
                <img src="@/assets/??????.png">
            </div>
        </div>
        <div class="sys">
            <!--LIS??????-->
            <div class="card j">
                <div class="wrapper">
                    <img src="@/assets/LIS.png">
                </div>
                <div class="desc">
                    <h2>LIS??????</h2>
                    <Button @click="gotoLIS">????????????</Button>
                </div>
            </div>

            <!--PACS??????-->
            <div class="card c">
                <div class="wrapper">
                    <img src="@/assets/PACS.png">
                </div>
                <div class="desc">
                    <h2>PACS??????</h2>
                    <Button @click="gotoPACS">????????????</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {obj} from "@/api/healthy/checkType"
    import Cookies from "js-cookie";

    export default {
        name: "homeCard",
        components: {},
        props: {},
        data() {
            return {};
        },
        methods: {
            init() {
            },
            handel(val, label) {
                let item = obj.find(i => i.id == val);
                if (item.isShow) {
                    Cookies.set('physicalType',label);
                    this.$store.commit("setProcessShow", val);
                    this.$store.commit("setPhysicalType", label);
                } else {
                    this.$Message.info("???????????????");
                }
            },
            //??? LIS?????????
            gotoLIS() {
                this.$router.push({
                    path: "/tLisData/tLisData"
                })
                localStorage.setItem("isHome", true);
                Cookies.set('physicalType','LIS??????');
            },
            //??? PACS?????????
            gotoPACS() {
                this.$router.push({
                    path: "/tPacsData/tPacsData"
                })
                localStorage.setItem("isHome", true);
                Cookies.set('physicalType','PACS??????');
            },
        },
        mounted() {
            this.init();
        },
    }
</script>
