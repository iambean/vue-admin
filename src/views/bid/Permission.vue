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
            <el-table-column v-show="false" prop="id" width="1"></el-table-column>
            <el-table-column prop="e_name" label="公司名称" width="360" sortable></el-table-column>
            <el-table-column prop="e_bid_addr" label="公司地址" width="450" sortable></el-table-column>
            <el-table-column prop="e_status" label="状态" :formatter="formatStatus" width="400" sortable></el-table-column>
            <el-table-column label="操作" width="300">
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
            <el-form :model="formDataset" label-width="80px" ref="editForm">
                <el-form-item v-show="false">
                    <el-input v-model="formDataset.e_id"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="key">
                    <el-input v-model="formDataset.e_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="key">
                    <el-input v-model="formDataset.e_bid_addr" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="key">
                    <el-select v-model="formDataset.e_status" placeholder="请选择">
                        <el-option key="1" label="有效" value="1"></el-option>
                        <el-option key="0" label="无效" value="0"></el-option>
                        <!--<el-option-->
                        <!--v-for="item in options"-->
                        <!--:key="item.value"-->
                        <!--:label="item.label"-->
                        <!--:value="item.value">-->
                        <!--</el-option>-->
                    </el-select>
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
    import {getBidUserList, setContractAward} from '../../api/api';

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
                //编辑界面数据
                formDataset: {
                    e_id : -1,
                    e_name : '',
                    e_bid_addr : '',
                    e_status : ''
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
                getBidUserList(this.filters.keyword).then(data => {
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
                    e_id : 0,
                    e_name : '',
                    e_bid_addr : '',
                    e_status : ''
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
                        setContractAward(para).then(() => {
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