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
        <el-table :data="list" highlight-current-row v-loading="listLoading" style="width:100%;">
            <!--<el-table-column type="index" width="80"></el-table-column>-->
            <!--<el-table-column prop="id" v-show="false"></el-table-column>-->
            <el-table-column prop="code"                label="流程编号" width="160" sortable></el-table-column>
            <el-table-column prop="title"               label="标题" width="140"></el-table-column>
            <el-table-column prop="create_user_name"    label="发起人" width="100"></el-table-column>
            <el-table-column prop="curr_pro_user_name"  label="当前处理人" width="120"></el-table-column>
            <el-table-column prop="has_boss"            label="董事长参与审批" width="160" :formatter="formatBoss">
            </el-table-column>
            <el-table-column prop="is_sign_err"         label="签章错误" width="120" :formatter="formatSign">
            </el-table-column>
            <el-table-column prop="compose_status"      label="合成状态" width="120" ></el-table-column>
            <el-table-column prop="compose_time"        label="合成时间" width="200" :formatter="formatTime" sortable>
            </el-table-column>
            <el-table-column prop="content"             label="错误信息" width="280"></el-table-column>
            <el-table-column label="操作" width="220">
                <template scope="scope">
                    <el-button type="primary" size="small" v-if="+scope.row.is_sign_err === 1"
                               @click="resetSignature(scope.row)">
                        签名重置
                    </el-button>
                    <el-button type="primary" size="small" @click="reCompose(scope.$index, scope.row)">重新合成</el-button>
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
    </section>
</template>

<script>
    import {getApprovalList, reComposeApproval, resetApprovalSignature} from '../../api/api';

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
            }
        },
        methods: {
            formatBoss (row, column){
                return +row.has_boss === 1 ? '是' : '否';
            },
            formatSign (row){
                return +row.is_sign_err === 1 ? '是' : '否';
            },
            formatTime(row){
                let date = new Date(row.compose_time * 1e3);
                if(isNaN(date.getTime())){
                    return '--';
                }else{
                    return date.toLocaleString()
                }
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            //获取用户列表
            getList() {
                this.listLoading = true;
                getApprovalList(this.filters.keyword, this.page).then(data => {
                    console.log(data);
                    this.list = data.list;
                    this.pageSize = data.page.pageSize;
                    this.total = +data.page.total;
                    this.listLoading = false;
                });
            },
            //签章重置
            resetSignature (row){
                resetApprovalSignature(row.id).then(()=>{
                    this.$message({
                        message: '重置成功',
                        type: 'success'
                    });
                }, ()=>{
                    this.$message({
                        message: '重置失败',
                        type: 'error'
                    });
                });
            },
            //重新合成
            reCompose (row){
                reComposeApproval(row.code).then(()=>{
                    this.$message({
                        message: '合成成功',
                        type: 'success'
                    });
                }, ()=>{
                    this.$message({
                        message: '合成失败',
                        type: 'error'
                    });
                });
            }
        },
        mounted() {
            this.getList();
        }
    }

</script>