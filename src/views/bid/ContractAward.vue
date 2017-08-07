<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.keyword" placeholder="关键字"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" style="width:100%;">
            <el-table-column v-show="false" prop="id"></el-table-column>
            <el-table-column prop="e_name" label="公司名称" width="360" sortable></el-table-column>
            <el-table-column prop="e_bid_addr" label="公司地址" width="450" sortable></el-table-column>
            <el-table-column prop="e_status" label="状态" :formatter="formatStatus" width="500" sortable></el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
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
    import {getContractAwardList, setConfig} from '../../api/api';

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
                sels: [],//列表选中列

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
                getContractAwardList(this.filters.keyword).then(data => {
                    console.log(data.list);
                    this.list = data.list;
                    this.pageSize = data.page.pageSize;
                    this.total = Math.ceil(data.page.total/data.page.pageSize);
//                    debugger
//                    this.total = res.data.total;
//                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            formatStatus (row){
                console.log(row);
                return +row.e_status ? '有效' : '无效';
            },
            //显示编辑界面
            handleEdit (index, row) {
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