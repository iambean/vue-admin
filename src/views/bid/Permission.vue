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
                    <el-table :data="props.row.bid_permission" :row-class-name="tableRowClassName" style="width:100%;">
                        <el-table-column prop="name" label="类别" :formatter="_fmt"></el-table-column>
                        <el-table-column v-for="item in items" prop="name" :label="item"
                                         key="item"></el-table-column>

                        <!--<el-table-column prop="key_1" :label="value_1" :formatter="_fmt"></el-table-column>-->
                        <!--<el-table-column prop="key_2" :label="value_2" :formatter="_fmt"></el-table-column>-->
                        <!--<el-table-column prop="key_3" :label="value_3" :formatter="_fmt"></el-table-column>-->
                        <!--<el-table-column prop="key_4" :label="value_4" :formatter="_fmt"></el-table-column>-->
                        <!--<el-table-column prop="key_5" :label="value_5" :formatter="_fmt"></el-table-column>-->
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column prop="u_realname" label="姓名" sortable></el-table-column>
            <el-table-column prop="r_role" label=" 标题" sortable></el-table-column>
            <el-table-column prop="r_role_txt" label="发起人"></el-table-column>
            <el-table-column label="操作">
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
        <el-dialog :title="'修改【'+formDataset.u_realname+'】的权限:'" v-model="formVisible" :close-on-click-modal="false">
            <el-form :model="formDataset" label-width="80px" ref="editForm">
                <el-table :data="formDataset.bid_permission" :row-class-name="tableRowClassName" style="width:100%;">
                    <el-table-column prop="key" label="类别" width="120"></el-table-column>
                    <el-table-column label="访问权限">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.bid_type.status" :true-label="1"
                                         :false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="短信通知">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.leadership.status" :true-label="1"
                                         :false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="消息审批">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.sms_approve.status" :true-label="1"
                                         :false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="白名单">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.white.status" :true-label="1"
                                         :false-label="0"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="投标单位审批">
                        <template scope="scope">
                            <el-checkbox v-model="scope.row.leader.status" :true-label="1"
                                         :false-label="0"></el-checkbox>
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
                getBidUserList(this.filters.keyword).then(data => {
                    //TODO:后台数据稍稍有点恶心(廖远忠的锅😜)，整理一下。
                    this.list = data.list.map(user => {
                        let permission = user.bid_permission,
                            titles = user.titles;
                        permission.forEach(p => {
                            p.items = p.items.map((i, index) => {
                                return {value: i, title: titles[index]};
                            });
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
            //编辑和新增
            formSubmit() {
                let form = this.$refs.editForm;
                form.validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                    console.log(JSON.stringify(this.formDataset.bid_permission, null, 4));
                    return console.table(this.formDataset.bid_permission);

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
        background: #e5f5db;
    }

    .el-table .corlorful-row-2 {
        background: #a9aedd;
    }
</style>