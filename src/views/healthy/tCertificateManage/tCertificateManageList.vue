<style lang="less">
    .tCertificateManageList {
        padding: 10px;
        box-sizing: border-box;
        height: 100%;

        .card {
            height: calc(100vh - 60px - 40px - 80px);
            border-top-left-radius: 0;
            border-top-right-radius: 0;

            .radio-group {
                width: 100%;

                .row-border {
                    padding-top: 10px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #ccc;
                }

                .radio-group-radio {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    .ivu-radio-group-item {
                        font-size: 0;
                    }
                }

                .radio-group-content {

                    .date {
                        color: #000;
                        font-size: 13px;
                    }

                    .border-blue {
                        border: 1px solid #0000FF;
                        border-radius: 8px;
                        text-align: center;
                        color: #0000FF;
                    }

                    .bg-green {
                        background-color: #42C3AF;
                        color: #fff;
                        border-radius: 8px;
                        text-align: center;
                    }

                    .bg-audit {
                        background-color: #ff9900;
                        color: #fff;
                        border-radius: 8px;
                        text-align: center;
                    }

                    .bg-refute {
                        background-color: #ed4014;
                        color: #fff;
                        border-radius: 8px;
                        text-align: center;
                    }

                    .bg-deflate {
                        background-color: #2db7f5;
                        color: #fff;
                        border-radius: 8px;
                        text-align: center;
                    }

                    .company {
                        color: #000;
                        font-size: 13px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
        }

        .ivu-card-body {
            padding: 16px;
            height: 100%;
        }
    }
</style>
<template>
    <div class="tCertificateManageList">
        <Row :gutter="4" style="flex-wrap: nowrap;">
            <Col span="16">
                <Alert class="alert">????????????</Alert>
                <Card>
                    <Row v-show="openSearch">
                        <Form ref="searchForm" :model="searchForm" inline :label-width="70"
                              @keydown.enter.native="handSearch">
                            <Form-item label="??????">
                                <Input v-model="searchForm.code" placeholder="???????????????"></Input>
                            </Form-item>
                            <Form-item label="??????">
                                <Input v-model="searchForm.name" placeholder="???????????????"></Input>
                            </Form-item>
                            <Form-item label="??????" v-if="drop">
                                <Select v-model="searchForm.sex" label-in-value placeholder="?????????" style="width: 186px;"
                                        clearable>
                                    <Option v-for="item in sexArray" :value="item.value" :key="item.id">
                                        {{ item.value }}
                                    </Option>
                                </Select>
                            </Form-item>
                            <Form-item label="??????" v-if="drop">
                                <Input v-model="searchForm.age" placeholder="???????????????"></Input>
                            </Form-item>
                            <Form-item style="margin-left:-35px" class="br">
                                <Button @click="handSearch" type="primary" icon="ios-search">??????</Button>
                                <Button @click="handReset">??????</Button>
                                <a class="drop-down" @click="dropDown">
                                    {{dropDownContent}}
                                    <Icon :type="dropDownIcon"></Icon>
                                </a>
                            </Form-item>
                        </Form>
                    </Row>
                    <div class="operation">
<!--						<Button @click="addTCertificateManage" type="primary" icon="md-add">??????</Button>-->
                        <Button @click="printInfoAll" type="primary" icon="ios-cloud-upload">????????????</Button>
                    </div>
                    <div>
                        <Table @on-row-click="tableClick" :loading="loading" border :columns="columns" sortable="custom"
                               :data="data"
                               @on-sort-change="changeSort" @on-selection-change="showSelect" ref="table">
                        </Table>
                    </div>
                    <Row type="flex" justify="end" class="page">
                        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize"
                              @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50]"
                              size="small" show-total show-elevator show-sizer></Page>
                    </Row>
                </Card>
            </Col>
            <Col span="8">
                <Alert class="alert">?????????</Alert>
                <Card class="card">
                    <div style="width: 100%; height: 100%;font-size: 15px;color: #000000;text-align: center;display: flex;flex-direction: column;justify-content: center;"
                         v-if="templateShow == false">
                        ????????????
                    </div>
                    <div style="width: 100%; height: 100%" v-else>
                        <iframe ref="iframeMain" :src="previewHtmlUrl" v-show="!aliLoading" frameborder="0" style="width: 100%; height: 100%"></iframe>
                    </div>
                </Card>
            </Col>
        </Row>
        <!-- loading -->
        <Spin fix v-show="aliLoading">
            <div class="demo-spin-icon-load">
                <!-- ?????????????????????????????? -->
                <i class="iconfont icon-loader--line"></i>
            </div>
            <!-- <Icon type="load-c" size="30" class="demo-spin-icon-load"></Icon> -->
            <div style='font-size:16px'>Loading...</div>
        </Spin>

        <updateTCertificateManage v-model="updateShow" :TCertificateManageId="TCertificateManageId" :modalTitle="title"
                                  v-on:handSearch="handSearch"></updateTCertificateManage>
    </div>
</template>
<script>
    import {
        deleteTCertificateManage,
        queryTCertificateManageList,
        getTCertificateManage,
		queryTCertificateManageAll,
    } from '@/api/healthy/tCertificateManage'
    import {formartDate} from '@/api/tools/tool'
    import updateTCertificateManage from './updateTCertificateManage'
    import {
        getTemplatePreviewHealthyData,
        generatePhysicalExaminationReport,
        generateWordReport,
        generateWordReportHealthy
    } from '@/api/healthy/tTemplate'
    import pdf from "vue-pdf";
    import {getTestNumGeneratorBarcode,testNumGeneratorBarcode} from "../../../api/healthy/tGroupPerson";

    export default {
        components: {
            updateTCertificateManage
        },
        data() {
            return {
                previewData: [],//????????????
                templateData: {},//???????????????
                TTemplateId: '55f5fb35e0eba36bb2293e0f3a98f483',//??????id
                previewHtmlUrl: "",//pdf??????
                aliLoading: false,//?????????
                templateShow: true,//????????????
                numPages: null, // pdf ?????????
                pdfPaths: [],//pdf????????????
                timer: null,//?????????
                printDatasNum: 0,//
                sexArray: [{
                    id: '1',
                    value: '???',
                }, {
                    id: '2',
                    value: '???',
                }],//????????????

                drop: false,
                dropDownContent: "??????",
                dropDownIcon: "ios-arrow-down",
                search: '',
                data: [],
                columns: this.getTCertificateManageColumns(),
                openSearch: true,//????????????
                openTip: true,//????????????
                loading: true, // ??????????????????
                selectCount: 0, // ????????????
                selectList: [], // ????????????
                searchForm: {
                    // ???????????????data??????
                    pageNumber: 1, // ????????????
                    pageSize: 10, // ????????????
                    startDate: null,//????????????
                    endDate: null,//????????????
                    sort: 'createTime', // ??????????????????
                    order: 'desc', // ??????????????????
                    //?????????
                    code: '',//??????
                    name: '',//??????
                    sex: '',//??????
                    age: '',//??????
                },
                total: 0,
                title: '',
                TCertificateManageId: '',
                updateShow: false,
                tableHeight: 200,
                colOptions: [
                    "??????", "??????", "??????", "??????", "?????????", "????????????", "??????"],
                colSelect: [
                    "??????", "??????", "??????", "??????", "?????????", "????????????", "??????"],
            }
        },
        methods: {
            //
            //????????????????????? ??? ??????pdf??????
            getReport(isPreviewData,templateData) {
                this.aliLoading = true;
                let _this = this;
                let _templateData = {}
                //??????????????? ??????
                if (templateData && templateData.name) {
					_templateData.id = templateData.id;//id??????
					_templateData.name = templateData.name;//??????
					_templateData.sex = templateData.sex;//??????
					_templateData.age =templateData.age;//??????
					_templateData.termOfValidity = formartDate(templateData.termOfValidity, 'yyyy-MM-dd');//?????????
					_templateData.code = templateData.code;//??????
					_templateData.unitOfIssue = templateData.unitOfIssue;//????????????
					_templateData.headImg = templateData.headImg;//???????????? base64
                }
                testNumGeneratorBarcode({personId:templateData.personId,testNum:templateData.code}).then(res =>{
                    if(res.success){
						// _templateData.barCodeImg = res.data.split(",")[1];//??????????????? base64
						_templateData.barCodeImg = res.data;//??????????????? base64
                    }
                    if (!isPreviewData) {//??????????????????
                        //?????????????????????
                        getTemplatePreviewHealthyData({
                            id: _this.TTemplateId,
                            templateData: JSON.stringify(_templateData)
                        }).then(res => {
                            if (res && res.success) {
                                let previewHtml = res.data.replace("template", "div");
                                let url = window.location.protocol + "//" + window.location.host + "/tempFileUrl" + previewHtml;
                                _this.previewHtmlUrl = url;
                                _this.aliLoading = false;
                            } else {
                                _this.aliLoading = false;
                                _this.$Message.error('????????????');
                            }
                        });
                    } else {
                        //?????????????????????
                        let previewData = {
                            id: _this.TTemplateId,
                            baseProjectId: "",
                            templateData: JSON.stringify(_templateData)
                        }
                        _this.previewData.push(previewData);
                        if (_this.printDatasNum == _this.previewData.length) {
                            let wordData = _this.previewData;
                            generateWordReportHealthy({wordData: wordData, wordName: "?????????(??????)"}).then(res => {
                                if (res.success) {
                                    let url = window.location.protocol + "//" + window.location.host + "/tempFileUrl" + res.data;
                                    this.previewHtmlUrl = url;
                                    _this.aliLoading = false;
                                    setTimeout(function () {
                                        _this.$refs.iframeMain.contentWindow.print();
                                    }, 1000)
                                    // _this.selectCount=0;
                                    // _this.selectList=[];
                                    // _this.$refs.table.selectAll(false);
                                }
                            }).catch(function (error) {
                                _this.aliLoading = false;
                                _this.$Message.error('????????????');
                            });
                        }
                    }
                })

            },
            //?????? ???????????????
            tableClick(e) {
                console.log('???????????????...');
                console.log(e);
                this.templateData = e;
                //?????? ?????????(?????????????????????)
                this.getReport(false,this.templateData);
            },
            //????????????
            printInfoAll() {

                if (this.selectCount <= 0) {
                    this.$Message.warning('?????????????????????????????????');
                    return;
                }
                this.$Modal.confirm({
                    title: '????????????',
                    content: '??????????????????????????? ' + this.selectCount + '??????????',
                    loading: true,
                    onOk: () => {
                        let printDatas = [];
                        this.selectList.forEach(function (e) {
							printDatas.push(e);
                        });
                        this.patchPrintInfoData(printDatas);
                    },
                    onCancel: () => {
                        this.$Message.info('?????????????????????????????????');
                    }
                });
            },
            //??????
            patchPrintInfoData(printDatas) {
                let _this = this;
                _this.previewData = [];
				_this.pdfPaths = [];
                _this.printDatasNum = printDatas.length;
                if (printDatas == undefined || printDatas == null || printDatas.length == 0) {
                    this.$Message.error('?????????????????????');
                    return;
                }
				this.$Modal.remove();
                let j = 0;
                //????????????????????? pdf
                for (let i = 0; i < printDatas.length; i++) {

					/*setTimeout(function () {
						let item = printDatas[j];
						_this.getReport(true,item);
						j++;
					},300);*/
                    _this.getReport(true,printDatas[i])
                }
            },

            //????????????????????????
            handDropdown(name) {
                if (name == "refresh") {
                    this.getDataList();
                } else if (name == "removeAll") {
                    this.delAll();
                } else if (name == "export") {
                    let excolumns = this.columns.filter(function (v) {
                        return v.title != "??????" && v.type != 'selection'
                    });
                    this.$refs.table.exportCsv({
                        filename: '????????????',
                        columns: excolumns,
                        data: this.data
                    });
                }
            },
            //?????? ??????
            dropDown() {
                if (this.drop) {
                    this.dropDownContent = "??????";
                    this.dropDownIcon = "ios-arrow-down";
                } else {
                    this.dropDownContent = "??????";
                    this.dropDownIcon = "ios-arrow-up";
                }
                this.drop = !this.drop;
            },
            //??????????????????
            selectDateRange(v) {
                if (v) {
                    this.searchForm.startDate = v[0];
                    this.searchForm.endDate = v[1];
                }
            },
            //??????
            addTCertificateManage() {
                this.title = '??????';
                this.updateShow = true
                this.TCertificateManageId = '';
            },
            //??????
            handEdit(row, index) {
                this.title = '??????';
                this.TCertificateManageId = row.id.toString();
                this.updateShow = true;
            },
            //??????
            handLook(row, index) {
                this.title = '??????';
                this.TCertificateManageId = row.id.toString();
                this.updateShow = true;
            },
            //????????????
            getDataList() {
                this.loading = true;
                queryTCertificateManageList(this.searchForm).then(res => {
                    if (res.success && res.data.records.length > 0) {
                        this.data = res.data.records;
                        this.total = res.data.total;
                        this.templateShow = true;
                        this.templateData = this.data[0];
                        //?????? ?????????
                        this.getReport(false,this.templateData);
                    } else {
                        this.data = [];
                        this.total = 0;
                        // this.templateShow = false;
                        this.templateShow = true;
                        this.templateData = {};
                        this.getReport(false,this.templateData);
                    }
                }).finally(() => {
                    this.loading = false;
                });
            },
            //????????????
            deleteData(row, index) {
                this.$Modal.confirm({
                    title: "????????????",
                    content: "????????????????????????????????????????",
                    loading: true,
                    onOk: () => {
                        this.userLoading = true;
                        var ids = [];
                        ids.push(row.id);
                        this.patchDeleteData(ids);
                    },
                    onCancel: () => {
                        this.$Message.info('?????????????????????????????????');
                    },
                });
            },
            //????????????
            delAll() {
                if (this.selectCount <= 0) {
                    this.$Message.warning('?????????????????????????????????');
                    return;
                }
                this.$Modal.confirm({
                    title: '????????????',
                    content: '??????????????????????????? ' + this.selectCount + '??????????',
                    loading: true,
                    onOk: () => {
                        let ids = [];
                        this.selectList.forEach(function (e) {
                            ids.push(e.id);
                        });
                        this.patchDeleteData(ids);
                    },
                    onCancel: () => {
                        this.$Message.info('?????????????????????????????????');
                    }
                });
            },
            //??????????????????
            patchDeleteData(ids) {
                if (ids == undefined || ids == null || ids.length == 0) {
                    this.$Message.error('?????????????????????');
                    return;
                }
                deleteTCertificateManage({ids: ids}).then(res => {
                    this.userLoading = false;
                    this.$Modal.remove();
                    if (res.success) {
                        this.modalTaskVisible = false;
                        this.$Message.success('????????????');
                        this.getDataList();
                    } else {
                        this.$Message.error('????????????');
                    }
                });
            },
            //????????????
            changePage(v) {
                this.searchForm.pageNumber = v;
                this.getDataList();
                this.clearSelectAll();
            },
            //?????????????????????????????????
            changePageSize(v) {
                this.searchForm.pageSize = v;
                this.getDataList();
            },
            //??????????????????
            changeSort(e) {
                this.searchForm.sort = e.key;
                this.searchForm.order = e.order;
                if (e.order == 'normal') {
                    this.searchForm.order = '';
                }
                this.getDataList();
            },
            //??????
            handSearch() {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.getDataList();
            },
            //??????
            handReset() {
                this.$refs.searchForm.resetFields();
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.searchForm.startDate = null;
                this.searchForm.endDate = null;
                this.selectDate = null;
                this.searchForm.code = '';
                this.searchForm.name = '';
                this.searchForm.sex = '';
                this.searchForm.age = '';
                // ??????????????????
                this.getDataList();
            },
            //????????????
            showSelect(e) {
                this.selectList = e;
                this.selectCount = e.length;
            },
            //????????????
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            //??????????????????
            getTCertificateManageColumns() {
                return [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '??????',
                        align: 'center',
                        minWidth: 120,
                        ellipsis: true,
                        tooltip: true,
                        key: 'code',
                        sortable: false
                    },
                    {
                        title: '??????',
                        align: 'center',
                        minWidth: 120,
                        ellipsis: true,
                        tooltip: true,
                        key: 'name',
                        sortable: false
                    },
                    {
                        title: '??????',
                        align: 'center',
                        minWidth: 120,
                        ellipsis: true,
                        tooltip: true,
                        key: 'sex',
                        sortable: false
                    },
                    {
                        title: '??????',
                        align: 'center',
                        minWidth: 120,
                        ellipsis: true,
                        tooltip: true,
                        key: 'age',
                        sortable: false
                    },
                    {
                        title: '?????????',
                        align: 'center',
                        minWidth: 120,
                        ellipsis: true,
                        tooltip: true,
                        key: 'termOfValidity',
                        sortable: false
                    },
                    {
                        title: '????????????',
                        align: 'center',
                        minWidth: 120,
                        ellipsis: true,
                        tooltip: true,
                        key: 'unitOfIssue',
                        sortable: false
                    }/*,
                    {
                        title: '??????',
                        align: 'center',
                        slot: 'action',
                        width: 200,
                    }*/
                ]
            },
            //???????????????
            checkboxChange: function (data) {
                var columnss = this.getTSubstancesColumns();
                this.columns = columnss.filter(function (v) {
                    return data.indexOf(v.title) > -1 || v.type == 'selection'
                })
            }
        },
        mounted() {
			/*getTCertificateManage({id: '1'}).then(res => {
				if (res.success) {

				}
			});*/
			queryTCertificateManageAll({}).then(res => {
				if (res.success) {

				}
			});
            this.getDataList();
        }
    }
</script>
<style scoped="less">
    .operation {
        margin-bottom: 10px;
    }
</style>
