<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 30px;">
            <!--<el-form :inline="true" :model="filters">-->
                <!--<el-form-item>-->
                    <!--<el-input v-model="filters.p_number" placeholder="项目编号"></el-input>-->
                <!--</el-form-item>-->

                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" style="width:100%;">
            <el-table-column v-show="false" prop="id" width="1"></el-table-column>
            <el-table-column prop="c_name" label="联系人姓名" width="600" sortable></el-table-column>
            <el-table-column prop="c_phone" label="联系人电话" width="600" sortable></el-table-column>
            <el-table-column label="操作" width="400">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            <el-form :model="formDataset" label-width="80px" ref="editForm">
                <el-form-item v-show="false">
                    <el-input v-model="formDataset.id"></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名">
                    <el-input v-model="formDataset.c_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话">
                    <el-input v-model="formDataset.c_phone" auto-complete="off"></el-input>
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
    import {getTenderList, setTender} from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    p_number: ''
                },
                list: [],
                total: 0,
                page: 1,
                pageSize : 10,
                listLoading: false,

                formVisible: false,//编辑界面是否显示
                editLoading: false,
                //编辑界面数据
                formDataset: {
                    id : -1,
                    c_name : '',
                    c_phone : ''
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
                getTenderList(this.filters.p_number, this.page).then(data => {
                    console.log(data.list);
                    this.list = data.list;
                    this.pageSize = data.page.pageSize;
                    this.total = +data.page.total;
                    this.listLoading = false;
                });
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
                    id : -1,
                    c_name : '',
                    c_phone : ''
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
                        setTender(para).then(() => {
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
//            this.getList();
            this.$prompt('请输入项目编号', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
//                inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputPattern: /\w{5, 20}/,
                inputErrorMessage: '项目编号格式不正确'
            }).then(({ value }) => {
                this.filters.p_number = value;
                this.getList();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });
            });
        }
    }

</script>