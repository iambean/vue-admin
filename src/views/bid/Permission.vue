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
            <!--<el-table-column v-show="false" prop="u_id" width="1"></el-table-column>-->
            <el-table-column type="expand">
                <template scope="props">

                    <!--编辑界面-->
                    <!--<el-dialog :title="'修改【'+formDataset.u_realname+'】的权限:'" v-model="formVisible" :close-on-click-modal="false">-->
                        <el-form :model="props.row.bid_permission" label-width="80px" ref="editForm">
                            <template scope="scope">
                                <el-checkbox v-model="scope.row.value_0" :true-label="1"
                                             :false-label="0"></el-checkbox>
                                <el-checkbox v-model="scope.row.value_0" :true-label="1"
                                             :false-label="0"></el-checkbox>
                                <el-checkbox v-model="scope.row.value_0" :true-label="1"
                                             :false-label="0"></el-checkbox>
                                <el-checkbox v-model="scope.row.value_0" :true-label="1"
                                             :false-label="0"></el-checkbox>
                                <el-checkbox v-model="scope.row.value_0" :true-label="1"
                                             :false-label="0"></el-checkbox>
                            </template>
                            <!--<el-table :data="formDataset.bid_permission" :row-class-name="tableRowClassName" style="width:100%;">-->
                                <!--<el-table-column prop="name" label="类别" width="120"></el-table-column>-->
                                <!--<el-table-column label="访问权限">-->
                                    <!--<template scope="scope">-->
                                        <!--<el-checkbox v-model="scope.row.value_0" :true-label="1"-->
                                                     <!--:false-label="0"></el-checkbox>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column label="短信通知">-->
                                    <!--<template scope="scope">-->
                                        <!--<el-checkbox v-model="scope.row.value_1" :true-label="1"-->
                                                     <!--:false-label="0"></el-checkbox>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column label="消息审批">-->
                                    <!--<template scope="scope">-->
                                        <!--<el-checkbox v-model="scope.row.value_2" :true-label="1"-->
                                                     <!--:false-label="0"></el-checkbox>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column label="白名单">-->
                                    <!--<template scope="scope">-->
                                        <!--<el-checkbox v-model="scope.row.value_3" :true-label="1"-->
                                                     <!--:false-label="0"></el-checkbox>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                                <!--<el-table-column label="投标单位审批">-->
                                    <!--<template scope="scope">-->
                                        <!--<el-checkbox v-model="scope.row.value_4" :true-label="1"-->
                                                     <!--:false-label="0"></el-checkbox>-->
                                    <!--</template>-->
                                <!--</el-table-column>-->
                            <!--</el-table>-->
                        </el-form>

                        <div slot="footer" class="dialog-footer">
                            <el-button @click.native="formVisible = false">取消</el-button>
                            <el-button type="primary" @click.native="formSubmit" :loading="editLoading">提交</el-button>
                        </div>
                    <!--</el-dialog>-->

                    <!--<el-table :data="props.row.bid_permission" :row-class-name="tableRowClassName" style="width:100%;">-->
                        <!--<el-table-column prop="name" label="类别"></el-table-column>-->
                        <!--&lt;!&ndash;<el-table-column v-for="item in props.row.bid_permission[props.$index]" prop="name" :label="item"&ndash;&gt;-->
                                         <!--&lt;!&ndash;key="item"></el-table-column>&ndash;&gt;-->
                        <!--<el-table-column prop="value_0" label="访问权限" :formatter="_fmt"></el-table-column>-->
                        <!--<el-table-column prop="value_1" label="短信通知" :formatter="_fmt"></el-table-column>-->
                        <!--<el-table-column prop="value_2" label="消息审批" :formatter="_fmt"></el-table-column>-->
                        <!--<el-table-column prop="value_3" label="白名单" :formatter="_fmt"></el-table-column>-->
                        <!--<el-table-column prop="value_4" label="投标单位审批" :formatter="_fmt"></el-table-column>-->
                    <!--</el-table>-->
                </template>
            </el-table-column>
            <el-table-column prop="u_realname" label="姓名" sortable></el-table-column>
            <el-table-column prop="r_role" label=" 标题" sortable></el-table-column>
            <el-table-column prop="r_role_txt" label="发起人"></el-table-column>
            <!--<el-table-column label="操作">-->
                <!--<template scope="scope">-->
                    <!--<el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                    <!--&lt;!&ndash;<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>&ndash;&gt;-->
                <!--</template>-->
            <!--</el-table-column>-->
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
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
                pageSize: 10,
                listLoading: false,
                sels: [],//列表选中列

                formVisible: false,//编辑界面是否显示
                editLoading: false,
                //编辑界面数据
                formDataset: {
                    e_id: -1,
                    e_name: '',
                    e_bid_addr: '',
                    e_status: ''
                }
            }
        },
        computed: {
            num2bool(num) {
                return !!num;
            },
            bool2num(value) {
                return +value;
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            tableRowClassName(row, index) {
                return index % 2 ? 'corlorful-row-1' : 'corlorful-row-2';
            },
            //获取用户列表
            getList() {
                this.listLoading = true;
                getBidUserList(this.filters.keyword, this.page).then(data => {
//                    this.columns = data.list[0]
//                    this.listData = data.list.map(user => {
//                        let permission = user.bid_permission,
//                            titles = user.titles;
//                        permission.forEach(p => {
//                            p.items.forEach((i , index)=>{
//                                p[titles[index]] = i;
//                            });
//                            delete p.items;
////                            p.items = p.items.map((i, index) => {
////                                return {value: i, title: titles[index]};
////                            });
//                        });
//                        delete user.titles;
//                        return user;
//                    });
                    this.list = data.list.map(user => {
                        let permission = user.bid_permission,
                            titles = user.titles;
                        permission.forEach(p => {
                            p.items.forEach((value , index) => {
                                p['value_' + index] = value;
//                                p['title_' + index] = titles[index];
                            });
                            delete p.items;
//                            p.items = p.items.map((i, index) => {
//                                return {value: i, title: titles[index]};
//                            });
                        });
                        delete user.titles;
                        return user;
                    });
                    console.info(this.list[0].bid_permission);
                    this.pageSize = data.page.pageSize;
                    this.total = +data.page.total;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            _fmt(row) {
//                console.log(arguments);
                return +row.status ? '有' : '无';
            },
            //显示编辑界面
            handleEdit(index, row) {
                this.formVisible = true;
                this.formDataset = Object.assign({}, row);
                console.info(this.formDataset, "===========:");
            },
            //显示新增界面
            handleAdd: function () {
                this.formVisible = true;
                this.formDataset = {
                    e_id: 0,
                    e_name: '',
                    e_bid_addr: '',
                    e_status: ''
                };
            },
            //编辑
            formSubmit() {
                let form = this.$refs.editForm;
                form.validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    console.log(JSON.stringify(this.formDataset, null, 4));
                    return console.table(this.formDataset);

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

<style>
    .el-table .corlorful-row-1 {
        background: #e7e8e6;
    }

    .el-table .corlorful-row-2 {
        background: #bdc0c3;
    }
</style>