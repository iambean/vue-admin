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
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="handleAdd">新增</el-button>-->
                <!--</el-form-item>-->
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="list" highlight-current-row v-loading="listLoading" @row-dblclick="openEditForm" style="width:100%;">
            <el-table-column prop="u_realname" label="姓名" sortable></el-table-column>
            <el-table-column prop="r_role" label="人员ID" sortable></el-table-column>
            <el-table-column prop="r_role_txt" label="角色"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <el-dialog title="权限编辑" v-model="formVisible" :close-on-click-modal="false">
            <el-form :model="formDataset" label-width="80px" ref="editForm">
                <el-table :data="formDataset.bid_permission" :row-class-name="tableRowClassName" style="width:100%;" border>
                    <el-table-column prop="name" label="类别" width="200"></el-table-column>
                    <el-table-column label="权限">
                        <template scope="scope">
                            <!-- TODO: can't wrap with `el-checkbox-group` element, and i don't know why... -->
                            <!--<el-checkbox-group v-model="scope.row.items">-->
                                <!--
                                    TODO: can not use `v-model="value"` on a `v-for` described element.
                                    see: [https://stackoverflow.com/questions/42629509/you-are-binding-v-model-directly-to-a-v-for-iteration-alias]
                                 -->
                                <el-checkbox v-for="(value, index) in scope.row.items" v-model="scope.row.items[index]"
                                     :label="formDataset.titles[index]" :true-label="1" :false-label="0">
                                </el-checkbox>
                            <!--</el-checkbox-group>-->
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="formVisible = false">取消</el-button>
                <el-button type="primary" @click.native="formSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import {getBidUserList, setBidUserPermission} from '../../api/api';

    export default {
        data() {
            return {
                filters: {
                    keyword: ''
                },
                list: [],
                total: 0,
                page: 1,
                pageSize: 10,
                listLoading: false,
                sels: [],//列表选中列

                formVisible: false,//编辑界面是否显示
                editLoading: false,
                //编辑界面数据
                formDataset: {
                    'user_id' : 0,
                    'r_role' : 0,
                    'titles' :  [],
                    'bid_permission' : []
                }
            }
        },
        computed: {},
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            tableRowClassName(row, index) {
                return index % 2 ? 'corlorful-row-1' : 'corlorful-row-2';
            },
            //列表行双击打开编辑form
            openEditForm (row){
                this.formVisible = true;
                this.formDataset = Object.assign({}, row)
                //由于结构的特殊性，这里单独针对复杂的下级子属性$set一下，使其具有observer.
                this.formDataset['bid_permission'].forEach((p, index)=>{
                    this.$set(this.formDataset['bid_permission'], index, {
                        id : p.id,
                        name : p.name,
                        items : p.items
                    });
                });
            },
            //获取用户列表
            getList() {
                this.listLoading = true;
                getBidUserList(this.filters.keyword, this.page).then(data => {
                    this.list = data.list;
                    console.info(this.list);
                    this.pageSize = data.page.pageSize;
                    this.total = +data.page.total;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },

            //显示编辑界面
            handleEdit(index, row) {
                this.openEditForm(row);
            },
//            //显示新增界面
//            handleAdd: function () {
//                this.formVisible = true;
//                this.formDataset = {
//                    e_id: 0,
//                    e_name: '',
//                    e_bid_addr: '',
//                    e_status: ''
//                };
//            },
            //编辑
            formSubmit() {
                let form = this.$refs.editForm;
                console.log(JSON.stringify(this.formDataset, null, 4));
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                    this.editLoading = true;
                    let formdata = this.formDataset;
                    let para = {
                        user_id : formdata['u_id'],
                        r_role : formdata['r_role']
                    };
                    formdata.bid_permission.forEach(obj => {
                        obj.items.forEach((value, index2)=>{
                            para[`bid_permission[${obj.id}][${index2}]`] = value;
                        })
                    });
                    setBidUserPermission(para).then(() => {
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
            }
        },
        mounted() {
            this.getList();
        }
    }

</script>

<style>
    .el-table .corlorful-row-1 {
        background: #e7e8e6;
    }

    .el-table .corlorful-row-2 {
        background: #bdc0c3;
    }
</style>