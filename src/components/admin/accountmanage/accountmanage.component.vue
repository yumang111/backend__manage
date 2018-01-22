<style src="./accountmanage.component.less" scoped lang="less" ></style>

<template>
  <div class="accountmanagepage">
    <div class="roleList backgound-shadow">
      <div class="common-header background-white">
        <span class="borleft4">角色列表</span>
        <div class="add-customer f-r ctrposition font16_color "
             @click="dialogVisible = true">新增角色</div>
      </div>
      <el-table :data="roleListData"
                border
                style="width: 100%">
        <el-table-column prop="orderIndex"
                         label="序号"
                         width="70">
        </el-table-column>
        <el-table-column prop="roleName"
                         label="角色名">
        </el-table-column>
        <el-table-column prop="roleDesc"
                         label="角色描述">
        </el-table-column>
        <el-table-column label="操作"
                         width="160">
          <template scope="scope">
            <el-button size="small"
                       @click="editRoleList(scope.$index, roleListData)">编辑</el-button>
            <el-button size="small"
                       type="danger"
                       @click="deleteRole(scope.$index, roleListData)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增角色"
                 v-model="dialogVisible"
                 v-if="dialogVisible"
                 size="tiny">
        <el-form :model="addNewRoleForm"
                 :rules="addNerFormsRules"
                 ref="addNewRoleForm"
                 label-width="90px"
                 class="demo-ruleForm">
          <el-form-item label="角色名称"
                        prop="roleName">
            <el-input v-model="addNewRoleForm.roleName"></el-input>
          </el-form-item>

          <el-form-item label="角色描述"
                        prop="roleDesc">
            <el-input type="textarea"
                      v-model="addNewRoleForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
                                              <el-button @click="dialogVisible = false">取 消</el-button>
                                              <el-button type="primary" @click="addNewRoleList('addNewRoleForm')">确 定</el-button>
                                            </span>
      </el-dialog>
      <el-dialog title="修改角色"
                 v-model="dialogVisible2"
                 v-if="dialogVisible2"
                 size="tiny">
        <el-form :model="editRoleForm"
                 :rules="editRoleFormRules"
                 ref="editRoleForm"
                 label-width="90px"
                 class="demo-ruleForm">
          <el-form-item label="角色名称"
                        prop="roleName">
            <el-input v-model="editRoleForm.roleName"></el-input>
          </el-form-item>

          <el-form-item label="角色描述"
                        prop="roleDesc">
            <el-input type="textarea"
                      v-model="editRoleForm.roleDesc"></el-input>
          </el-form-item>
          <el-form-item label="权限"
                        prop="checked1"
                        class="roleCtr">
            <el-checkbox-group v-model="checkList">
              <el-checkbox :label="item.menuId"
                           v-for="(item,index) in roleCtrList" v-show="index!=roleCtrList.length-1">{{item.menuDesc}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
                                              <el-button @click="dialogVisible2 = false">取 消</el-button>
                                              <el-button type="primary" @click="sumitChaneRole('editRoleForm')">确 定</el-button>
                                            </span>
      </el-dialog>
    </div>
    <div class="userList backgound-shadow">
      <div class="common-header background-white">
        <span class="borleft4">用户列表</span>
        <div class="add-customer f-r ctrposition font16_color "
             @click="addnewRoleDialogShow">新增用户</div>
             <!--<el-button type="primary" @click="addnewRoleDialogShow" class="common-btn">新增用户</el-button>-->
      </div>
      <el-table :data="userListData"
                border>
        <el-table-column prop="orderIndex"
                         label="序号"
                         width="70">
        </el-table-column>
        <el-table-column prop="realName"
                         label="姓名"
                         width="120">
        </el-table-column>
        <el-table-column prop="accountName"
                         label="账号"
                         width="160">
        </el-table-column>
        <el-table-column prop="mark"
                         label="备注">
        </el-table-column>
        <el-table-column prop="lastUpdateTime"
                         label="修改时间">
        </el-table-column>
        <el-table-column label="操作"
                         width="219">
          <template scope="scope">
            <el-button size="small"
                       v-if="scope.row.lockFlag==0"
                       @click="knockUser(scope.$index, scope.row)">禁用</el-button>
            <el-button size="small"
                       v-if="scope.row.lockFlag!=0"
                       @click="unKnockUser(scope.$index, scope.row)">启用</el-button>
            <el-button size="small"
                       @click="editUser(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small"
                       type="danger"
                       @click="deleteUserListOne(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="params.currentPage"
                     :page-sizes="params.pagelist"
                     :page-size="params.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="params.totalDatas"
                     class="userlistpage">
      </el-pagination>
      <el-dialog title="新增用户"
                 v-if="showAddNewUserList"
                 v-model="showAddNewUserList"
                 size="tiny">
        <el-form :model="addNewUserForm"
                 :rules="UserFormrules"
                 ref="addNewUserForm"
                 label-width="81px"
                 class="demo-ruleForm">
          <el-form-item label="姓名"
                        prop="realName">
            <el-input v-model="addNewUserForm.realName"
                      placeholder="2-10个字符，以字母/汉字开头"></el-input>
          </el-form-item>
          <el-form-item label="账号"
                        prop="accountName">
            <el-input v-model="addNewUserForm.accountName"
                      placeholder="2-10个字符，以字母开头"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="accountPwd">
            <el-input v-model="addNewUserForm.accountPwd"
                      type="password"
                      placeholder="6-35个字符"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="accountPwdM">
            <el-input v-model="addNewUserForm.accountPwdM"
                      type="password"
                      placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="备注"
                        prop="mark">
            <el-input type="textarea"
                      v-model="addNewUserForm.mark"
                      placeholder="备注信息，最大200个字符"></el-input>
          </el-form-item>
          <!-- <div>
            <span>角色</span>
             <el-checkbox-group v-model="checkUserList">
              <el-checkbox :label="item.roleId"
                           v-for="item in userRoleList">{{item.roleName}}
              </el-checkbox>
            </el-checkbox-group>
          </div> -->
           <el-form-item label="角色"
                        prop="roleCtr"
                        class="roleCtr">
            <el-checkbox-group v-model="checkUserList">
              <el-checkbox :label="item.roleId"
                           v-for="item in userRoleList">{{item.roleName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
                                              <el-button @click="showAddNewUserList = false">取 消</el-button>
                                              <el-button type="primary" @click="commitAddUser('addNewUserForm')">确 定</el-button>
                                            </span>
      </el-dialog>
      <el-dialog title="修改用户"
                 v-model="editUserDialog"
                 v-if="editUserDialog"
                 size="tiny">
        <el-form :model="editUserForm"
                 :rules="UserFormrulesEdit"
                 ref="editUserForm"
                 label-width="81px"
                 class="demo-ruleForm">
          <el-form-item label="姓名"
                        prop="realName">
            <el-input v-model="editUserForm.realName"
                      placeholder="2-10个字符，以字母/汉字开头"></el-input>
          </el-form-item>
          <el-form-item label="账号"
                        prop="accountName">
            <el-input v-model="editUserForm.accountName"
                      placeholder="2-10个字符，以字母开头"
                      disabled></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="accountPwd">
            <el-input v-model="editUserForm.accountPwd"
                      type="password"
                      placeholder="6-35个字符"
                      icon="edit"
                      :on-icon-click="clickChangePsd"
                      :disabled="isChangePsd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码"
                        prop="accountPwdM">
            <el-input v-model="editUserForm.accountPwdM"
                      type="password"
                      :disabled="isChangePsd"
                      placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="备注"
                        prop="mark">
            <el-input type="textarea"
                      v-model="editUserForm.mark"
                      placeholder="备注信息，最大200个字符"></el-input>
          </el-form-item>
          <el-form-item label="角色"
                        class="roleCtr"
                        prop="roleCtr">
            <el-checkbox-group v-model="checkUserList">
              <el-checkbox :label="item.roleId"
                           v-for="item in userRoleList">{{item.roleName}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <span slot="footer"
              class="dialog-footer">
                                              <el-button @click="editUserDialog = false">取 消</el-button>
                                              <el-button type="primary" @click="saveEditedUse('editUserForm')">确 定</el-button>
                                            </span>
      </el-dialog>
    </div>
  </div>
</template>

<script src="./accountmanage.component"></script>
