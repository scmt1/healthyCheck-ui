<style lang="less">
.tGroupUnit {
    .ivu-modal {
        width: 50vw !important;
        min-width: 840px;
    }


    .demo-upload-list-cover {
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        height: 200px;
        line-height: 200px;
        background: rgba(0, 0, 0, .6);
        text-align: center;

        &:hover {
            display: block;
            background: rgba(0, 0, 0, .6);
        }
    }

    .demo-upload-list-cover i {
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }


    .pic {
        margin-left: 30px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .pic-box {
            display: flex;
            justify-content: center;
            padding: 2px;
            box-sizing: border-box;
            align-items: center;
            width: 200px;
            height: 160px;
            line-height: 160px;
            margin-right: 10px;
            border: 1px dashed #2988f3;
            cursor: pointer;
            flex-direction: column;
            position: relative;

            &:hover {
                .demo-upload-list-cover {
                    display: block;
                }
            }
        }

        .re-upload {
            width: 100%;
            flex: 1;
            color: #2e58d6;
            font-size: 13px;

            span {
                cursor: pointer;
            }
        }

        .pic-text {
            font-size: 13px;
            color: #cbcfd6;
        }
    }

    .rg-caller-container {
        width: 100% !important;
    }

    .rg-default-btn {
        display: flex !important;
        justify-content: space-between !important;
        width: 100%;
        align-items: center;
    }

    .rg-default-btn {
        &:hover {
            outline: 0;
            box-shadow: 0 0 0 2px rgba(45, 140, 240, .2);
            border: 1px solid #57a3f3 !important;
        }
    }

    .rg-default-btn {
        span {
            color: #c5c8ce;
        }
    }
}
</style>
<template>
    <Modal v-model="show" :title="editTitle" class="tGroupUnit" :mask-closable="false">
        <Form ref="tGroupUnitForm" :model="tGroupUnitForm" :rules="tGroupUnitFormRule" :label-width="140">
            <Tabs type="card" @on-click="onTabsClick" v-model="tabsValue">
                <TabPane label="????????????" name="????????????">
                    <Spin size="large" fix v-if="spinShow"></Spin>
                    <div v-show="show1" style="margin-top: 10px;">
                        <Row>
                            <Col :span="19">
                                <Row>
                                    <Col span="12">
                                        <FormItem label="????????????" prop="name">
                                            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tGroupUnitForm.name"
                                                   placeholder="?????????????????????"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="????????????" prop="physicalType">
                                            <Select disabled v-model="tGroupUnitForm.physicalType" placeholder="?????????"
                                                    clearable>
                                                <Option v-for="(item, i) in inspectTypePriority" :key="item.id" :value="item.value">{{item.title}}</Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="12">
                                        <FormItem label="????????????????????????" prop="uscc">
                                            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tGroupUnitForm.uscc"
                                                   placeholder="?????????????????????????????????"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="????????????" prop="industryCode">
                                            <TreeSelect ref="tree" :data="industryCodePriority" :disabled="disabled"
                                                        v-model="tGroupUnitForm.industryCode"
                                                        transfer @on-change="onIndustrySelect"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="12">
                                        <FormItem label="????????????" prop="regionCode">
                                            <Select :filterable="true" v-model="tGroupUnitForm.regionCode" v-bind:disabled="disabled"
                                                    :label-in-value="true" @on-change="addrChange" placeholder="?????????">
                                                <Option v-for="(item, i) in regionPriority" :key="item.value" :value="item.value"
                                                        :disabled="item.value.toString().substring(item.value.toString().length - 4) == '0000' ? true : false">
                                                    {{item.title }}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="????????????" prop="economicTypeCode">
                                            <TreeSelect :data="economicTypeCodePriority" :disabled="disabled"
                                                        v-model="tGroupUnitForm.economicTypeCode"
                                                        transfer @on-change="onEconomicTypeSelect"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span="12">
                                        <FormItem label="??????????????????" prop="address">
                                            <Input v-bind:disabled="disabled" type="text" :maxlength=100 v-model="tGroupUnitForm.address"
                                                   placeholder="???????????????????????????"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="????????????" prop="businessScaleCode">
                                            <Select v-bind:disabled="disabled" v-model="tGroupUnitForm.businessScaleCode" placeholder="?????????" clearable
                                                    transfer
                                                    @on-select="onBusinessScaleSelect">
                                                <Option v-for="(item, i) in businessScaleCodePriority" :key="item.value" :value="item.value">
                                                    {{ item.title }}
                                                </Option>
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row v-if="this.physicalType != '????????????'">
                                    <Col span="12">
                                        <FormItem label="????????????" prop="employeesNum">
                                            <InputNumber v-bind:disabled="disabled" v-model="tGroupUnitForm.employeesNum" placeholder="?????????????????????"/>
                                        </FormItem>
                                    </Col>
                                    <Col span="12">
                                        <FormItem label="?????????????????????????????????" prop="dangerNum">
                                            <InputNumber v-bind:disabled="disabled" :max="tGroupUnitForm.employeesNum" v-model="tGroupUnitForm.dangerNum" placeholder="??????????????????????????????????????????"/>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Col>
                            <Col :span="5">
                                <div class="pic">
                                    <div class="pic-box" :style="{'border':tGroupUnitForm.attachment?'0 !important;':'auto'}" @click="upload">
                                        <input ref="upload" type="file" accept="image/*" @change="inputChange" style="display: none;"/>
                                        <Icon type="ios-add" size="24" color="#2988f3" v-if="!tGroupUnitForm.attachment"/>
                                        <template v-else>
                                            <img :src="tGroupUnitForm.attachment" style="height: 100%;width: 100%;">
                                            <div class="demo-upload-list-cover">
                                                <Icon type="ios-eye-outline" @click.native.stop="handleView(tGroupUnitForm.attachment)"></Icon>
                                                <Icon type="ios-trash-outline" @click.native.stop="handleRemove()"></Icon>
                                            </div>
                                        </template>
                                        <span style="height: auto;line-height: 0;margin-top: 30px;color: #2988f3;"
                                              v-if="!tGroupUnitForm.attachment">??????????????????</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="?????????????????????" prop="linkMan2">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tGroupUnitForm.linkMan2"
                                           placeholder="????????????????????????"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="?????????????????????" prop="linkPhone2">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tGroupUnitForm.linkPhone2"
                                           placeholder="????????????????????????"/>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </TabPane>
                <TabPane label="????????????" name="????????????">
                    <div v-show="show2" style="margin-top: 10px;">
                        <Row>
                            <Col span="12">
                                <FormItem label="????????????" prop="legalPerson">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tGroupUnitForm.legalPerson"
                                           placeholder="?????????????????????"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="????????????" prop="legalPhone">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tGroupUnitForm.legalPhone"
                                           placeholder="?????????????????????"/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="???????????????" prop="workmanNum">
                                    <InputNumber v-bind:disabled="disabled" v-model="tGroupUnitForm.workmanNum" placeholder="????????????????????????"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="???????????????????????????????????????" prop="workmistressNum">
                                    <InputNumber v-bind:disabled="disabled" :max="tGroupUnitForm.dangerNum" v-model="tGroupUnitForm.workmistressNum" placeholder="????????????????????????????????????????????????"/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="??????????????????" prop="postalCode">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=6 v-model="tGroupUnitForm.postalCode"
                                           placeholder="???????????????????????????"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="????????????" prop="workArea">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=25 v-model="tGroupUnitForm.workArea"
                                           placeholder="?????????????????????"/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="????????????" prop="regCapital">
                                    <Input v-bind:disabled="disabled" type="text" v-model="tGroupUnitForm.regCapital" placeholder="?????????????????????"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="???????????????????????????" prop="safetyPrincipal">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=25 v-model="tGroupUnitForm.safetyPrincipal"
                                           placeholder="????????????????????????????????????"/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="????????????" prop="filingDateTime">
                                    <DatePicker v-bind:disabled="disabled" style="width:100%;" type="date" placeholder="?????????????????????"
                                                :options="dateOptions"
                                                v-model="tGroupUnitForm.filingDate" format="yyyy-MM-dd"></DatePicker>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="????????????" prop="establishmentDateTime">
                                    <DatePicker v-bind:disabled="disabled" style="width:100%;" type="date" placeholder="?????????????????????"
                                                :options="dateOptions"
                                                v-model="tGroupUnitForm.establishmentDate"></DatePicker>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="???????????????" prop="linkMan1">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=25 v-model="tGroupUnitForm.linkMan1"
                                           placeholder="????????????????????????"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="??????????????????" prop="linkPhone1">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=15 v-model="tGroupUnitForm.linkPhone1"
                                           placeholder="???????????????????????????"/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="?????????????????????" prop="position1">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=25 v-model="tGroupUnitForm.position1"
                                           placeholder="??????????????????????????????"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="?????????????????????" prop="position2">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=25 v-model="tGroupUnitForm.position2"
                                           placeholder="??????????????????????????????"/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="?????????????????????" prop="safePosition">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=25 v-model="tGroupUnitForm.safePosition"
                                           placeholder="??????????????????????????????"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="?????????????????????" prop="safePhone">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=15 v-model="tGroupUnitForm.safePhone"
                                           placeholder="??????????????????????????????"/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="????????????" prop="subjeConn">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tGroupUnitForm.subjeConn"
                                           placeholder="?????????????????????"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="??????????????????" prop="enrolAddress">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=100 v-model="tGroupUnitForm.enrolAddress"
                                           placeholder="???????????????????????????"/>
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                                <FormItem label="??????????????????" prop="enrolPostalCode">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=6 v-model="tGroupUnitForm.enrolPostalCode"
                                           placeholder="???????????????????????????"/>
                                </FormItem>
                            </Col>
                            <Col span="12">
                                <FormItem label="????????????????????????" prop="occManaOffice">
                                    <Input v-bind:disabled="disabled" type="text" :maxlength=100 v-model="tGroupUnitForm.occManaOffice"
                                           placeholder="?????????????????????????????????"/>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                </TabPane>
            </Tabs>
        </Form>
        <div slot="footer">
            <Button type="text" @click="show=false">??????</Button>
            <Button type="primary" :loading="loading" @click="handSubmit" v-if="!disabled">??????</Button>
        </div>
    </Modal>
</template>
<script>
import {addTGroupUnit, updateTGroupUnit, getTGroupUnit} from '@/api/healthy/tGroupUnit'
import {getDictDataByType} from "../../../api";
import Viewer from "viewerjs";
import {queryProTypeByTypeCode} from "../../../api/healthy/tProType";
import util from "../../../libs/util";

export default {
    name: "updateTGroupUnit",
    props: {
        value: {
            type: Boolean,
            default: false
        },
        TGroupUnitId: {
            type: String
        },
        modalTitle: {
            type: String
        }
    },
    data() {
        return {
            tabsValue: "????????????",
            show1: true,
            show2: false,
            show: this.value,
            editTitle: this.modalTitle,
            loading: true,
            disabled: false,
            spinShow: false,
            industryCodePriority: [],
            businessScaleCodePriority: [],
            economicTypeCodePriority: [],
            regionPriority: [],
            tGroupUnitForm: {
                physicalType: '',
                name: '',
                uscc: '',
                legalPerson: '',
                regCapital: '',
                establishmentDateTime: '',
                establishmentDate: '',
                industryCode: '',
                businessScaleCode: '',
                economicTypeCode: '',
                address: '',
                attachment: '',
                industryName: '',
                businessScaleName: '',
                economicTypeName: '',
                regionCode: '',
                regionName: '',
                employeesNum: null,
                dangerNum: null,
                legalPhone: '',
                workmanNum: null,
                workmistressNum: null,
                postalCode: '',
                workArea: '',
                filingDateTime: '',
                filingDate: '',
                linkMan1: '',
                position1: '',
                linkPhone1: '',
                linkMan2: '',
                position2: '',
                linkPhone2: '',
                safetyPrincipal: '',
                safePosition: '',
                safePhone: '',
                subjeConn: '',
                enrolAddress: '',
                enrolPostalCode: '',
                occManaOffice: '',
            },
            tGroupUnitFormRule: this.getTGroupUnitFormRule(),
            dateOptions: {
                disabledDate(date) {
                    return date && date.valueOf() > Date.now() + 1;
                }
            },
            regionCode: {},
            inspectTypePriority: [{
                id: '1',
                value: "????????????",
                title: "????????????",
            }, {
                id: '2',
                value: "????????????",
                title: "????????????",
            }, {
                id: '3',
                value: "????????????",
                title: "????????????",
            }, {
                id: '4',
                value: "????????????",
                title: "????????????",
            }],//????????????
        }
    },
    computed: {
        physicalType() {
            return this.$store.state.theme.theme.physicalType;
        },
    },
    methods: {
        addrChange(e) {
            if(e) {
                this.tGroupUnitForm.regionCode = e.value;
                this.tGroupUnitForm.regionName = e.label;
            }
        },
        regionChange(e) {
            let element = document.querySelector(".rg-default-btn").children[0];
            if (e.province) {
                element.style.color = "#515a6e";
                let values = "";
                let codes = "";
                if (e.province) {
                    values = e.province.value;
                    codes = e.province.key;
                }
                if (e.city) {
                    values += "_" + e.city.value;
                    codes += "_" + e.city.key;
                }
                if (e.area) {
                    values += "_" + e.area.value;
                    codes += "_" + e.area.key;
                }
                if (e.town) {
                    values += "_" + e.town.value;
                    codes += "_" + e.town.key;
                }
                element.innerHTML = values;
                this.tGroupUnitForm.regionCode = codes;
                this.tGroupUnitForm.regionName = values;
            } else {
                element.innerHTML = '?????????';
                element.style.color = "#c5c8ce";
            }
        },
        onRegionSelect(e) {
            this.tGroupUnitForm.regionName = e.label;
        },
        onBusinessScaleSelect(e) {
            this.tGroupUnitForm.businessScaleName = e.label;
        },
        onIndustrySelect(e) {
            let filter = this.queryChildren(this.industryCodePriority, e);
            this.tGroupUnitForm.industryName = filter ? filter.typeName : "";
        },
        onEconomicTypeSelect(e) {
            let filter = this.queryChildren(this.economicTypeCodePriority, e);
            this.tGroupUnitForm.economicTypeName = filter ? filter.typeName : "";
        },
        queryChildren(list, e) {
            let data = null;
            for (let i = 0; i < list.length; i++) {
                let element = list[i];
                if (element.children && element.children.length > 0) {
                    data = this.queryChildren(element.children, e);
                    if (data) {
                        return data;
                    }
                } else {
                    if (element.id === e) {
                        data = element;
                        break;
                    }
                }
            }
            return data;
        },
        handleView(v) {
            let image = new Image();
            image.src = v;
            let viewer = new Viewer(image, {
                hidden: function () {
                    viewer.destroy();
                },
            });
            viewer.show();
        },
        handleRemove() {
            this.tGroupUnitForm.attachment = "";
        },
        onTabsClick(e) {
            if (e == '????????????') {
                this.show1 = true;
                this.show2 = false;
            } else if (e == '????????????') {
                this.show1 = false;
                this.show2 = true;
            }
        },
        //????????????
        inputChange(e) {
            const inputFile = this.$refs['upload'].files[0];
            let fileSize = inputFile.size;
            var size = fileSize / 1024;
            if (size > 1024) {
                this.$Message.error('????????????????????????1M???');
                return;
            }
            if (size <= 0) {
                this.$Message.error('?????????????????????0M???');
                return;
            }
            let fileType = inputFile.type.toString().substring(inputFile.type.toString().lastIndexOf('/') + 1, inputFile.type.toString().length);
            if (fileType) {
                if (fileType.toLowerCase() != 'jpg' && fileType.toLowerCase() != 'jpeg' && fileType.toLowerCase() != 'png') {
                    this.$Message.error('????????????????????????????????????????????????');
                    this.$refs['upload'].value = null;
                    return;
                }
            }
            let reader = new FileReader();
            reader.readAsDataURL(inputFile);
            reader.onload = () => {
                this.tGroupUnitForm.attachment = reader.result;
            }
            this.$refs['upload'].value = null;
        },
        //??????????????????
        upload() {
            if (this.disabled) {
                return;
            }
            this.$refs['upload'].dispatchEvent(new MouseEvent('click'));
        },
        handSubmit() {
            this.$refs['tGroupUnitForm'].validate((valid) => {
                this.loading = true;
                if (valid) {
                    if (this.TGroupUnitId != null && this.TGroupUnitId.trim().length > 0) {
                        this.tGroupUnitForm.id = this.TGroupUnitId;
                        updateTGroupUnit(this.tGroupUnitForm).then(res => {
                            if (res.success) {
                                this.closeModal(false);
                                this.$emit('handleSearch');
                                this.$Message.success('????????????');
                            } else {
                                this.$Message.error(res.msg);
                            }
                        }).finally(() => {
                            this.loading = false;
                        })
                    } else {
                        addTGroupUnit(this.tGroupUnitForm).then(res => {
                            if (res.success) {
                                this.closeModal(false);
                                this.$emit('handleSearch');
                                this.$Message.success('????????????');
                            } else {
                                this.$Message.error(res.msg);
                            }
                        }).finally(() => {
                            this.loading = false;
                        })
                    }
                } else {
                    this.loading = false;
                    this.$Message.error('????????????????????????');
                }
            });
        },
        closeModal(val) {
            this.$emit('input', val);
        },
        //??????
        recursion(proTypes) {
            if (proTypes && proTypes.length > 0) {
                proTypes.forEach(item => {
                    item.expand = false;
                    item.selected = false;
                    item.checked = false;
                    item.title = item.typeName;
                    item.value = item.id;
                    if (item.children && item.children.length > 0) {
                        item.disabled = true;
                        this.recursion(item.children)
                    }
                })
            }
        },
        getTGroupUnitFormRule() {
            return {
                name: [
                    {required: true, message: '???????????????????????????', trigger: 'blur'},
                    {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
                ],
                physicalType: [
                    {required: true, message: '???????????????????????????', trigger: 'blur'},
                    {type: 'string', max: 50, message: '????????????????????????50???', trigger: 'blur'}
                ],
                // uscc: [
                //     {required: true, message: '???????????????????????????????????????', trigger: 'blur'},
                //     {
                //         pattern: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
                //         message: '?????????????????????????????????',
                //         trigger: 'blur'
                //     }
                // ],
                // industryCode: [
                //     {required: true, message: '???????????????????????????', trigger: 'blur', pattern: /.+/},
                // ],
                // regionCode: [
                //     {required: true, message: '???????????????????????????', trigger: 'blur', pattern: /.+/},
                // ],
                // businessScaleCode: [
                //     {required: true, message: '???????????????????????????', trigger: 'blur', pattern: /.+/},
                // ],
                // economicTypeCode: [
                //     {required: true, message: '???????????????????????????', trigger: 'blur', pattern: /.+/},
                // ],
                // linkMan2: [
                //     {required: true, message: '????????????????????????????????????', trigger: 'blur'},
                //     {type: 'string', max: 25, message: '????????????????????????25???', trigger: 'blur'}
                // ],
                // linkPhone2: [
                //     {required: true, message: '????????????????????????????????????', trigger: 'blur'},
                //     {
                //         pattern: /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/,
                //         message: '??????????????????????????????',
                //         trigger: 'blur'
                //     }
                // ],
                // address: [
                //     {required: true, message: '?????????????????????????????????', trigger: 'blur'},
                //     {type: 'string', max: 100, message: '????????????????????????100???', trigger: 'blur'}
                // ],
                // employeesNum: [
                //     {required: true, message: '???????????????????????????', trigger: 'blur', type: 'number', pattern: /.+/},
                // ],
                // dangerNum: [
                //     {required: true, message: '????????????????????????????????????????????????', trigger: 'blur', type: 'number', pattern: /.+/},
                // ],
            }
        },
        async getPorTypeData(type) {
            return await queryProTypeByTypeCode({typeCode: type}).then(res => res.data);
        }
    },
    computed: {
        physicalType() {
            return this.$store.state.theme.theme.physicalType;
        },
    },
    watch: {
        value(val) {
            this.show = val;
        },
        async show(val) {
            this.loading = false;
            this.editTitle = this.modalTitle;
            if (this.editTitle == "??????") {
                this.disabled = true;
            } else {
                this.disabled = false;
            }
            if (val) {
                this.show1 = true;
                this.show2 = false;
                this.tabsValue = "????????????";
                this.$refs['tGroupUnitForm'].resetFields();
                this.tGroupUnitForm.id = null;
                this.tGroupUnitForm.physicalType = this.physicalType;
                getDictDataByType("companyScale").then(res => {
                    if (res.success) {
                        this.businessScaleCodePriority = res.data;
                    }
                });
                getDictDataByType("unitRegion").then(res => {
                    if (res.success) {
                        this.regionPriority = res.data;
                    }
                });
                this.spinShow = true;
                queryProTypeByTypeCode({typeCode: "TYPE_003"}).then(res => {
                    if (res.success) {
                        this.recursion(res.data);
                        this.industryCodePriority = res.data;
                    }
                })
                queryProTypeByTypeCode({typeCode: "TYPE_002"}).then(res => {
                    if (res.success) {
                        this.recursion(res.data);
                        this.economicTypeCodePriority = res.data;
                    }
                })

                if (this.TGroupUnitId != null && this.TGroupUnitId.trim().length > 0) {
                    getTGroupUnit({id: this.TGroupUnitId}).then(res => {
                        if (res.success) {
                            this.tGroupUnitForm = res.data;

                            if (res.data.regionCode) {
                                let split = res.data.regionCode.split("_");
                                this.regionCode = {
                                    province: split[0],
                                    city: split[1],
                                    area: split[2],
                                    town: split[3],
                                }
                            }
                            if (res.data.attachment) {
                                this.tGroupUnitForm.attachment = "data:image/png;base64," + res.data.attachment;
                            }
                        } else {
                            this.$Message.error(res.msg);
                        }
                    }).finally(() => {
                        this.spinShow = false;
                    });
                } else {
                    this.spinShow = false;
                }
            } else {
                this.closeModal(val);
            }
        }
    }
}
</script>
