<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.keyword" placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" style="width:100%;">
            <el-table-column type="index" width="80"></el-table-column>
            <el-table-column prop="id" label="ID" width="80"></el-table-column>
            <el-table-column prop="key" label="关键字" width="360" sortable></el-table-column>
            <el-table-column prop="value" label="值" width="450" sortable></el-table-column>
            <el-table-column prop="desc" label="描述" width="500" sortable></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="formVisible" :close-on-click-modal="false">
            <el-form :model="formDataset" label-width="80px" :rules="formRules" ref="editForm">
                <el-form-item label="关键字" prop="key">
                    <el-input v-model="formDataset.key" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="值" prop="value">
                    <el-input type="textarea" v-model="formDataset.value"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="formDataset.desc"></el-input>
                </el-form-item>
                <el-form-item v-show="false">
                    <el-input v-model="formDataset.id"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="formVisible = false">取消</el-button>
                <el-button type="primary" @click.native="formSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import {getConfigList, setConfig} from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    keyword: ''
                },
                list: [],
                total: 0,
                page: 1,
                pageSize : 10,
                listLoading: false,

                formVisible: false,//编辑界面是否显示
                editLoading: false,
                formRules: {
                    key: [
                        {required: true, message: '请输入关键字', trigger: 'blur'}
                    ],
                    value: [
                        {required: true, message: '请输入值', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                formDataset: {
                    id : -1,
                    key : '',
                    value : '',
                    desc : ''
                }
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            //获取用户列表
            getList() {
                this.listLoading = true;
                getConfigList(this.filters.keyword).then(data => {
                    console.log(data);
                    this.list = data.list.map(item => {
                        return {
                            id : item.id,
                            key : item.config_key,
                            value : item.config_val,
                            desc : item.des,
                        };
                    });
                    this.pageSize = data.page.pageSize;
                    this.total = +data.page.total;
                    console.log(this.total, this.pageSize);
                    this.listLoading = false;
                });
            },

            //显示编辑界面
            handleEdit: function (index, row) {
                this.formVisible = true;
                this.formDataset = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.formVisible = true;
                this.formDataset = {
                    id : 0,
                    key : '',
                    value : '',
                    desc : ''
                };
            },
            //编辑和新增
            formSubmit (){
                let form = this.$refs.editForm;
                form.validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        let para = Object.assign({}, this.formDataset);
                        setConfig(para).then(() => {
                            this.editLoading = false;
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            form.resetFields();
                            this.formVisible = false;
                            this.getList();
                        });
                    });
                });
            }
        },
        mounted() {
            this.getList();
        }
    }

</script>