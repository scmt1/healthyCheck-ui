<style lang="less">
    .search {
        .operation {
            margin-bottom: 2vh;

            span {
                line-height: 30px;
            }
        }

        .preview {
            font-weight: 600;
            color: #40a9ff;
            cursor: pointer;
        }
    }
</style>
<template>
    <div class="search">
        <Card>
            <Row class="operation">
                <span>组件英文名：</span>
                <Tooltip
                        content="生成的请求api文件中将使用该组件名拼接，建议驼峰法命名"
                        placement="right"
                        transfer
                        max-width="250">
                    <Input v-model="vueName" clearable style="width: 150px; margin-right: 10px"/>
                </Tooltip>
                <span>表单显示：</span>
                <Select v-model="rowNum" style="width: 150px; margin-right: 10px">
                    <Option value="1">一行一列</Option>
                    <Option value="2">一行两列</Option>
                    <Option value="3">一行三列</Option>
                    <Option value="4">一行四列</Option>
                </Select>
                <Button @click="add" type="primary" icon="md-add">添加字段</Button>
                <Button @click="entityModal = true" type="warning" icon="ios-construct">读取字段</Button>
                <Button @click="generate" :loading="loading" type="success" icon="md-send">生成代码</Button>
                <Button @click="clear" icon="md-trash">清空全部</Button>
            </Row>
            <div>
                <Alert show-icon>
                    将生成的代码复制粘贴至XBoot前端新建的空白组件中，再做少许修改并自行调通接口即可
                    <span @click="preview" class="preview">增删改表格预览</span>
                </Alert>
            </div>
            <Row>
                <Table border :columns="columns" :data="data" ref="table">
                    <template slot-scope="{ row }" slot="field">
                        <Input v-model="row.field" @on-blur="changeField(row, $event)"/>
                    </template>
                    <template slot-scope="{ row }" slot="name">
                        <Input v-model="row.name" @on-blur="changeName(row, $event)"/>
                    </template>
                    <template slot-scope="{ row }" slot="tableShow">
                        <i-switch
                                v-model="row.tableShow"
                                @on-change="changeTableShow(row, $event)"
                        >
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </i-switch>
                    </template>
                    <template slot-scope="{ row }" slot="editable">
                        <i-switch
                                v-model="row.editable"
                                @on-change="changeEditable(row, $event)"
                        >
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </i-switch>
                    </template>
                    <template slot-scope="{ row }" slot="type">
                        <Select
                                v-model="row.type"
                                :disabled="!row.editable"
                                @on-change="changeType(row, $event)"
                                transfer
                        >
                            <Option value="text">文本输入框</Option>
                            <Option value="textarea">多行文本输入框</Option>
                            <Option value="select">选择下拉框</Option>
                            <Option value="number">数字输入框</Option>
                            <Option value="dict">数据字典选择组件</Option>
                            <Option value="customList">自定义列表选择组件</Option>
                            <Option value="date">日期选择器</Option>
                            <Option value="datetime">日期时间选择器</Option>
                            <Option value="daterange">日期范围选择器</Option>
                            <Option value="upload">图片上传输入组件</Option>
                            <Option value="uploadThumb">图片上传缩略图组件</Option>
                            <Option value="switch">Switch开关</Option>
                            <Option value="radio">Radio单选框</Option>
                            <Option value="time">时间选择器</Option>
                            <Option value="area">省市县级联</Option>
                            <Option value="slider">Slider滑块</Option>
                            <Option value="quill">富文本组件Quill</Option>
                            <Option value="password">密码强度提示输入框</Option>
                        </Select>
                    </template>
                    <template slot-scope="{ row }" slot="validate">
                        <i-switch
                                v-model="row.validate"
                                @on-change="changeValidate(row, $event)"
                                :disabled="!row.editable"
                        >
                            <span slot="open">是</span>
                            <span slot="close">否</span>
                        </i-switch>
                    </template>
                    <template slot-scope="{ row }" slot="searchable">
                        <i-switch
                                v-model="row.searchable"
                                @on-change="changeSearchable(row, $event)"
                        >
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </i-switch>
                    </template>
                    <template slot-scope="{ row }" slot="searchType">
                        <Select
                                v-model="row.searchType"
                                @on-change="changeSearchType(row, $event)"
                                :disabled="!row.searchable"
                                transfer
                        >
                            <Option value="text">文本输入框</Option>
                            <Option value="select">选择下拉框</Option>
                            <Option value="dict">数据字典选择组件</Option>
                            <Option value="customList">自定义列表选择组件</Option>
                            <Option value="daterange" :disabled="daterangeSearch"
                            >日期范围选择器
                            </Option
                            >
                            <Option value="date">日期选择器</Option>
                            <Option value="area">省市县级联</Option>
                        </Select>
                    </template>
                    <template slot-scope="{ row }" slot="sortable">
                        <i-switch
                                v-model="row.sortable"
                                @on-change="changeSortable(row, $event)"
                        >
                            <span slot="open">开</span>
                            <span slot="close">关</span>
                        </i-switch>
                    </template>
                    <template slot-scope="{ row }" slot="action">
                        <a @click="edit(row)">编辑</a>
                        <Divider type="vertical"/>
                        <a @click="remove(row)">删除</a>
                    </template>
                </Table>
            </Row>
        </Card>

        <Modal
                :title="modalTitle"
                v-model="modalVisible"
                :mask-closable="false"
                :width="750"
        >
            <Form
                    ref="form"
                    :model="form"
                    :label-width="100"
                    :rules="formValidate"
                    inline
            >
                <FormItem label="字段英文名" prop="field">
                    <Tooltip placement="right" content="与后端实体字段匹配">
                        <Input v-model="form.field" style="width: 245px"/>
                    </Tooltip>
                </FormItem>
                <FormItem label="字段中文名" prop="name">
                    <Input v-model="form.name" style="width: 245px"/>
                </FormItem>
                <FormItem label="表格中显示" prop="tableShow" style="width: 345px">
                    <i-switch v-model="form.tableShow">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </FormItem>
                <FormItem label="可添加编辑" prop="editable" style="width: 345px">
                    <i-switch v-model="form.editable">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </FormItem>
                <FormItem label="字段表单类型" prop="type" v-show="form.editable">
                    <Select v-model="form.type" filterable style="width: 245px">
                        <Option value="text">文本输入框</Option>
                        <Option value="textarea">多行文本输入框</Option>
                        <Option value="select">选择下拉框</Option>
                        <Option value="number">数字输入框</Option>
                        <Option value="dict">数据字典选择组件</Option>
                        <Option value="customList">自定义列表选择组件</Option>
                        <Option value="date">日期选择器</Option>
                        <Option value="datetime">日期时间选择器</Option>
                        <Option value="daterange">日期范围选择器</Option>
                        <Option value="upload">图片上传输入组件</Option>
                        <Option value="uploadThumb">图片上传缩略图组件</Option>
                        <Option value="switch">Switch开关</Option>
                        <Option value="radio">Radio单选框</Option>
                        <Option value="time">时间选择器</Option>
                        <Option value="area">省市县级联</Option>
                        <Option value="slider">Slider滑块</Option>
                        <Option value="quill">富文本组件Quill</Option>
                        <Option value="password">密码强度提示输入框</Option>
                    </Select>
                </FormItem>
                <FormItem label="字典类型" prop="dictType" v-show="form.type == 'dict'">
                    <customList
                            v-model="form.dictType"
                            filterable
                            url="/dict/getAll"
                            valueBind="type"
                            description="type"
                            style="width: 245px"
                    />
                </FormItem>
                <FormItem
                        label="自定义URL"
                        prop="customUrl"
                        v-show="form.type == 'customList'"
                >
                    <Input
                            v-model="form.customUrl"
                            placeholder="输入自定义选择组件url属性"
                            style="width: 245px"
                    />
                </FormItem>
                <FormItem label="显示级别" prop="level" v-show="form.type == 'area'">
                    <Select v-model="form.level" style="width: 245px">
                        <Option value="0">仅显示省</Option>
                        <Option value="1">显示省和县</Option>
                        <Option value="2">显示省市县</Option>
                    </Select>
                </FormItem>
                <FormItem
                        label="是否必填"
                        prop="validate"
                        v-show="form.editable"
                        style="width: 345px"
                >
                    <i-switch v-model="form.validate">
                        <span slot="open">是</span>
                        <span slot="close">否</span>
                    </i-switch>
                </FormItem>
                <FormItem label="可搜索" prop="searchable" style="width: 345px">
                    <i-switch v-model="form.searchable">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </FormItem>
                <FormItem label="搜索框类型" prop="searchType" v-show="form.searchable">
                    <Select v-model="form.searchType" style="width: 245px">
                        <Option value="text">文本输入框</Option>
                        <Option value="select">选择下拉框</Option>
                        <Option value="dict">数据字典选择组件</Option>
                        <Option value="customList">自定义列表选择组件</Option>
                        <Option value="daterange">日期范围选择器</Option>
                        <Option value="date">日期选择器</Option>
                        <Option value="area">省市县级联</Option>
                    </Select>
                </FormItem>
                <FormItem
                        label="字典类型"
                        prop="searchDictType"
                        v-show="form.searchType == 'dict'"
                >
                    <customList
                            v-model="form.searchDictType"
                            filterable
                            url="/dict/getAll"
                            valueBind="type"
                            description="type"
                            style="width: 245px"
                    />
                </FormItem>
                <FormItem
                        label="自定义URL"
                        prop="searchCustomUrl"
                        v-show="form.searchType == 'customList'"
                >
                    <Input
                            v-model="form.searchCustomUrl"
                            placeholder="输入自定义选择组件url属性"
                            style="width: 245px"
                    />
                </FormItem>
                <FormItem
                        label="显示级别"
                        prop="searchLevel"
                        v-show="form.searchType == 'area'"
                >
                    <Select v-model="form.searchLevel" style="width: 245px">
                        <Option value="0">仅显示省</Option>
                        <Option value="1">显示省和县</Option>
                        <Option value="2">显示省市县</Option>
                    </Select>
                </FormItem>
                <FormItem label="可排序" prop="sortable" style="width: 345px">
                    <i-switch v-model="form.sortable">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </FormItem>
                <FormItem
                        label="默认排序"
                        prop="defaultSort"
                        v-show="form.sortable"
                        style="width: 345px"
                >
                    <i-switch v-model="form.defaultSort">
                        <span slot="open">开</span>
                        <span slot="close">关</span>
                    </i-switch>
                </FormItem>
                <FormItem
                        label="默认排序方式"
                        prop="defaultSortType"
                        v-show="form.defaultSort && form.sortable"
                >
                    <Select v-model="form.defaultSortType" style="width: 245px">
                        <Option value="desc">倒序(大到小)</Option>
                        <Option value="asc">正序(小到大)</Option>
                    </Select>
                </FormItem>
                <FormItem label="排序值" prop="sortOrder" style="width: 345px">
                    <InputNumber v-model="form.sortOrder"></InputNumber>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="modalVisible = false">取消</Button>
                <Button type="primary" @click="handleSubmit">提交</Button>
            </div>
        </Modal>
        <Modal
                title="生成代码"
                v-model="codeModal"
                :width="1000"
                :fullscreen="full"
                :styles="full ? {} : modalStyle"
        >
            <RadioGroup
                    v-model="resultType"
                    style="margin-bottom: 15px"
                    @on-change="changeRadio"
            >
                <Radio label="drawerApi" border>抽屉组件(含API)</Radio>
                <Radio label="drawer" border>抽屉组件(模拟请求)</Radio>
                <Radio label="singleApi" border>弹框(含API)</Radio>
                <Radio label="single" border>弹框(模拟请求)</Radio>
                <Radio label="componentApi" border>动态组件(含API)</Radio>
                <Radio label="component" border>动态组件(模拟请求)</Radio>
            </RadioGroup>
            <Tabs v-model="tabName" type="card" @on-click="changeCode">
                <TabPane name="index.vue" label="index.vue"></TabPane>
                <TabPane
                        v-if="resultType == 'drawerApi' || resultType == 'drawer'"
                        name="addEdit.vue"
                        label="addEdit.vue"
                ></TabPane>
                <TabPane
                        v-if="resultType == 'componentApi' || resultType == 'component'"
                        name="add.vue"
                        label="add.vue"
                ></TabPane>
                <TabPane
                        v-if="resultType == 'componentApi' || resultType == 'component'"
                        name="edit.vue"
                        label="edit.vue"
                ></TabPane>
                <TabPane
                        v-if="
            resultType == 'drawerApi' ||
            resultType == 'componentApi' ||
            resultType == 'singleApi'
          "
                        name="api.js"
                        label="api.js"
                ></TabPane>
            </Tabs>
            <Input
                    v-if="!full"
                    v-model="code"
                    type="textarea"
                    autosize
                    style="max-height: 60vh; overflow: auto"
            />
            <Input v-if="full" v-model="code" :rows="32" type="textarea"/>
            <div slot="footer">
                <Button @click="full = !full" icon="md-expand">全屏开/关</Button>
                <Button
                        v-clipboard:copy="code"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                        type="primary"
                        icon="md-copy"
                >复制代码
                </Button
                >
            </div>
        </Modal>
        <Modal
                title="自动读取字段"
                v-model="entityModal"
                :width="700"
                :fullscreen="fullEntity"
        >
            <Alert show-icon
            >输入实体类的引用路径，将自动读取其字段生成所需JSON配置数据，免去手动配置添加字段
            </Alert
            >
            <Form
                    ref="entityForm"
                    :model="entityForm"
                    :label-width="130"
                    :rules="entityFormValidate"
            >
                <FormItem label="实体类引用路径" prop="path">
                    <Row type="flex" justify="space-between">
                        <Input
                                v-model="entityForm.path"
                                placeholder="例如：com.scmt.entity.User"
                                clearable
                                style="width: 410px"
                        />
                        <Button type="warning" icon="md-play" @click="generateEntityData"
                        >读取字段
                        </Button
                        >
                    </Row>
                </FormItem>
            </Form>
            <Input
                    v-if="!fullEntity"
                    v-model="entityData"
                    type="textarea"
                    autosize
                    style="max-height: 50vh; overflow: auto"
                    placeholder="生成结果"
            />
            <Input
                    v-if="fullEntity"
                    v-model="entityData"
                    :rows="32"
                    type="textarea"
            />
            <div slot="footer">
                <Button @click="fullEntity = !fullEntity" icon="md-expand"
                >全屏开/关
                </Button
                >
                <Button
                        type="primary"
                        icon="md-checkmark-circle-outline"
                        @click="submitEntityData"
                >确认更新字段值
                </Button
                >
            </div>
        </Modal>
    </div>
</template>

<script>
    import {generateTable, getEntityData} from "@/api/index";
    import customList from "@/views/my-components/scmt/custom-list";

    export default {
        name: "table-generator",
        components: {
            customList,
        },
        data() {
            return {
                resultType: "drawerApi",
                tabName: "physicalRegister.vue",
                modalStyle: {
                    top: "30px",
                },
                entityModal: false,
                fullEntity: false,
                entityData: "",
                entityForm: {
                    path: "",
                },
                loading: false,
                code: "",
                vueName: "",
                rowNum: "1",
                full: false,
                codeModal: false,
                modalVisible: false,
                modalType: 0,
                modalTitle: "",
                form: {
                    sortOrder: 0,
                    field: "",
                    name: "",
                    dictType: "",
                    customUrl: "",
                    searchDictType: "",
                    searchCustomUrl: "",
                    level: "2",
                    tableShow: true,
                    editable: true,
                    type: "text",
                    searchType: "text",
                    searchLevel: "2",
                    validate: true,
                    searchable: false,
                    sortable: false,
                    defaultSort: false,
                    defaultSortType: "desc",
                },
                formValidate: {
                    field: [{required: true, message: "不能为空", trigger: "change"}],
                    name: [{required: true, message: "不能为空", trigger: "change"}],
                },
                entityFormValidate: {
                    path: [{required: true, message: "不能为空", trigger: "change"}],
                },
                columns: [
                    // 表头
                    {
                        title: "排序",
                        key: "sortOrder",
                        sortType: "asc",
                        sortable: true,
                        align: "center",
                        minWidth: 90,
                    },
                    {
                        title: "字段英文名",
                        slot: "field",
                        minWidth: 150,
                    },
                    {
                        title: "字段中文名",
                        slot: "name",
                        minWidth: 150,
                    },
                    {
                        title: "表格中显示",
                        slot: "tableShow",
                        align: "center",
                        minWidth: 110,
                    },
                    {
                        title: "可添加编辑",
                        slot: "editable",
                        align: "center",
                        minWidth: 110,
                    },
                    {
                        title: "表单类型",
                        slot: "type",
                        minWidth: 200,
                    },
                    {
                        title: "是否必填",
                        slot: "validate",
                        align: "center",
                        minWidth: 100,
                    },
                    {
                        title: "可搜索",
                        slot: "searchable",
                        align: "center",
                        minWidth: 100,
                    },
                    {
                        title: "搜索框类型",
                        slot: "searchType",
                        minWidth: 200,
                    },
                    {
                        title: "可排序",
                        slot: "sortable",
                        align: "center",
                        minWidth: 80,
                    },
                    {
                        title: "操作",
                        slot: "action",
                        align: "center",
                        fixed: "right",
                        width: 120,
                    },
                ],
                data: [],
                daterangeSearch: false,
                result: {},
            };
        },
        methods: {
            init() {
                // 取缓存数据
                let data = this.getStore("tableData");
                let vueName = this.getStore("tableVueName");
                let rowNum = this.getStore("tableRowNum");
                let daterangeSearch = this.getStore("tableDaterangeSearch");
                if (data && data != "undefined") {
                    this.data = JSON.parse(data);
                }
                if (vueName && vueName != "undefined") {
                    this.vueName = vueName;
                }
                if (rowNum && rowNum != "undefined") {
                    this.rowNum = rowNum;
                }
                if (daterangeSearch && daterangeSearch != "undefined") {
                    if (daterangeSearch == "true") {
                        this.daterangeSearch = true;
                    } else {
                        this.daterangeSearch = false;
                    }
                }
            },
            generateEntityData() {
                this.$refs.entityForm.validate((valid) => {
                    if (valid) {
                        getEntityData(this.entityForm.path).then((res) => {
                            if (res.success) {
                                this.entityData = res.data;
                            }
                        });
                    }
                });
            },
            submitEntityData() {
                if (!this.entityData) {
                    this.$Message.warning("请先输入实体类引用路径生成JSON数据");
                    return;
                }
                try {
                    let data = JSON.parse(this.entityData);
                    this.data = data.data;
                    this.entityModal = false;
                } catch (e) {
                    this.$Message.error("请确保JSON数据格式正确");
                }
            },
            preview() {
                this.$router.push({
                    name: "search-table",
                });
            },
            changeField(row, v) {
                for (let attr in row) {
                    if (row[attr] == null) {
                        row[attr] = "";
                    }
                }
                let str = JSON.stringify(row);
                let data = JSON.parse(str);
                data.field = v.target.value;
                this.data.splice(row._index, 1, data);
                this.save();
            },
            changeName(row, v) {
                for (let attr in row) {
                    if (row[attr] == null) {
                        row[attr] = "";
                    }
                }
                let str = JSON.stringify(row);
                let data = JSON.parse(str);
                data.name = v.target.value;
                this.data.splice(row._index, 1, data);
                this.save();
            },
            changeTableShow(row, v) {
                for (let attr in row) {
                    if (row[attr] == null) {
                        row[attr] = "";
                    }
                }
                let str = JSON.stringify(row);
                let data = JSON.parse(str);
                data.tableShow = v;
                this.data.splice(row._index, 1, data);
                this.save();
            },
            changeType(row, v) {
                for (let attr in row) {
                    if (row[attr] == null) {
                        row[attr] = "";
                    }
                }
                let str = JSON.stringify(row);
                let data = JSON.parse(str);
                data.type = v;
                this.data.splice(row._index, 1, data);
                this.save();
            },
            changeEditable(row, v) {
                for (let attr in row) {
                    if (row[attr] == null) {
                        row[attr] = "";
                    }
                }
                let str = JSON.stringify(row);
                let data = JSON.parse(str);
                data.editable = v;
                this.data.splice(row._index, 1, data);
                this.save();
            },
            changeValidate(row, v) {
                for (let attr in row) {
                    if (row[attr] == null) {
                        row[attr] = "";
                    }
                }
                let str = JSON.stringify(row);
                let data = JSON.parse(str);
                data.validate = v;
                this.data.splice(row._index, 1, data);
                this.save();
            },
            changeSearchable(row, v) {
                for (let attr in row) {
                    if (row[attr] == null) {
                        row[attr] = "";
                    }
                }
                let str = JSON.stringify(row);
                let data = JSON.parse(str);
                data.searchable = v;
                this.data.splice(row._index, 1, data);
                this.save();
            },
            changeSearchType(row, v) {
                for (let attr in row) {
                    if (row[attr] == null) {
                        row[attr] = "";
                    }
                }
                let str = JSON.stringify(row);
                let data = JSON.parse(str);
                data.searchType = v;
                this.data.splice(row._index, 1, data);
                if (this.daterangeSearch && v != "daterange") {
                    this.daterangeSearch = false;
                } else if (v == "daterange") {
                    this.daterangeSearch = true;
                }
                this.save();
            },
            changeSortable(row, v) {
                for (let attr in row) {
                    if (row[attr] == null) {
                        row[attr] = "";
                    }
                }
                let str = JSON.stringify(row);
                let data = JSON.parse(str);
                data.sortable = v;
                this.data.splice(row._index, 1, data);
                this.save();
            },
            handleSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // 转换null为""
                        let v = this.form;
                        for (let attr in v) {
                            if (v[attr] == null) {
                                v[attr] = "";
                            }
                        }
                        let str = JSON.stringify(v);
                        let data = JSON.parse(str);
                        // 判断时间范围搜索
                        if (this.daterangeSearch && data.searchType == "daterange") {
                            this.$Message.warning(
                                "已设定了日期范围搜索的字段，日期范围搜索暂仅支持设定1个"
                            );
                            return;
                        }
                        if (this.modalType == 0) {
                            this.data.push(data);
                            this.data = this.data;
                        } else {
                            this.data.splice(v._index, 1, data);
                        }
                        // 记录日期范围
                        if (data.searchType == "daterange") {
                            this.daterangeSearch = true;
                        }
                        this.save();
                        this.modalVisible = false;
                    }
                });
            },
            add() {
                this.modalType = 0;
                this.modalTitle = "添加字段";
                this.$refs.form.resetFields();
                this.form.sortOrder = this.data.length + 1;
                this.modalVisible = true;
            },
            edit(v) {
                this.modalType = 1;
                this.modalTitle = "编辑字段";
                // 转换null为""
                for (let attr in v) {
                    if (v[attr] == null) {
                        v[attr] = "";
                    }
                }
                let str = JSON.stringify(v);
                let data = JSON.parse(str);
                this.form = data;
                this.modalVisible = true;
            },
            remove(v) {
                this.data.splice(v._index, 1);
                this.save();
                this.$Message.success("操作成功");
            },
            clear() {
                this.$Modal.confirm({
                    title: "确认清空",
                    content: "您确认要清空所有数据 ?",
                    onOk: () => {
                        this.data = [];
                        this.vueName = "";
                        this.rowNum = "1";
                        this.daterangeSearch = false;
                        this.save();
                        this.$Message.success("操作成功");
                    },
                });
            },
            generate() {
                if (!this.vueName) {
                    this.$Message.warning("请输入组件名");
                    return;
                }
                // 检查默认排序个数
                let count = 0;
                this.data.forEach((e) => {
                    if (e.defaultSort) {
                        count++;
                    }
                });
                if (count > 1) {
                    this.$Message.warning("默认排序字段仅能设置一个，请勿设置多个");
                    return;
                }
                this.loading = true;
                generateTable(this.vueName, this.rowNum, this.data).then((res) => {
                    this.loading = false;
                    if (res.success) {
                        this.result = res.data;
                        this.changeCode();
                        this.codeModal = true;
                        this.save();
                    }
                });
            },
            changeRadio() {
                this.tabName = "physicalRegister.vue";
                this.changeCode();
            },
            changeCode() {
                if (this.resultType == "drawerApi") {
                    if (this.tabName == "physicalRegister.vue") {
                        this.code = this.result.drawerApi;
                    }
                    if (this.tabName == "addEdit.vue") {
                        this.code = this.result.addEditApi;
                    }
                    if (this.tabName == "api.js") {
                        this.code = this.result.api;
                    }
                }
                if (this.resultType == "drawer") {
                    if (this.tabName == "physicalRegister.vue") {
                        this.code = this.result.drawer;
                    }
                    if (this.tabName == "addEdit.vue") {
                        this.code = this.result.addEdit;
                    }
                }
                if (this.resultType == "componentApi") {
                    if (this.tabName == "physicalRegister.vue") {
                        this.code = this.result.componentApi;
                    }
                    if (this.tabName == "add.vue") {
                        this.code = this.result.addApi;
                    }
                    if (this.tabName == "edit.vue") {
                        this.code = this.result.editApi;
                    }
                    if (this.tabName == "api.js") {
                        this.code = this.result.api;
                    }
                }
                if (this.resultType == "component") {
                    if (this.tabName == "physicalRegister.vue") {
                        this.code = this.result.component;
                    }
                    if (this.tabName == "add.vue") {
                        this.code = this.result.add;
                    }
                    if (this.tabName == "edit.vue") {
                        this.code = this.result.edit;
                    }
                }
                if (this.resultType == "singleApi") {
                    if (this.tabName == "physicalRegister.vue") {
                        this.code = this.result.singleApi;
                    }
                    if (this.tabName == "api.js") {
                        this.code = this.result.api;
                    }
                }
                if (this.resultType == "single") {
                    this.code = this.result.single;
                }
            },
            onCopy() {
                this.$Message.success("复制成功");
            },
            onError() {
                this.$Message.warning("复制失败，请手动复制");
            },
            save() {
                this.setStore("tableData", JSON.stringify(this.data));
                this.setStore("tableVueName", this.vueName);
                this.setStore("tableRowNum", this.rowNum);
                this.setStore("tableDaterangeSearch", this.daterangeSearch);
            },
        },
        created() {
            this.init();
        },
    };
</script>
