<template>
  <div class>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="skills" type="border-card">
        <el-tab-pane label="基础信息">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!-- $http.defauts.baseURL + '/upload'  =>  http://localhost:3000/admin/api/upload    action：提交图片到对应的接口，后台返回图片地址，即model.icon -->
            <el-upload
              class="item-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(item, 'icon', res.avatar)"
            >
              <!-- 有图片就显示地址，没有显示 +  -->
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="背景图">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'banner', res.url)"
            >
              <!-- $set(item, 'icon', res.url) 使用vue里的显式赋值 -->
              <!-- 有图片就显示地址，没有显示 +  -->
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :label="item.name"
                :value="item._id"
                :key="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top: 1em" :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 1em" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 1em" :max="9" show-score v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 1em" :max="9" show-score v-model="model.scores.survive"></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item of items" :label="item.name" :value="item._id" :key="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能" name="skills">
          <el-button size="small" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item style="width: 400px" label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>

              <el-form-item style="width: 400px" label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item style="width: 400px" label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>

              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'icon', res.url)"
                >
                  <!-- $set(item, 'icon', res.url) 使用vue里的显式赋值 -->
                  <!-- 有图片就显示地址，没有显示 +  -->
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item>
                <el-button size="small" type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="最佳搭档" name="partners">
          <el-button size="small" @click="model.partners.push({})">
            <i class="el-icon-plus"></i>添加英雄
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.partners" :key="i">
              <el-form-item label="英雄">
                <el-select v-model="item.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button size="small" type="danger" @click="model.partners.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="被谁克制" name="restrained">
          <el-button size="small" @click="model.restrained.push({})">
            <i class="el-icon-plus"></i>添加英雄
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.restrained" :key="i">
              <el-form-item label="英雄">
                <el-select v-model="item.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button size="small" type="danger" @click="model.restrained.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="克制谁" name="restrain">
          <el-button size="small" @click="model.restrain.push({})">
            <i class="el-icon-plus"></i>添加英雄
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.restrain" :key="i">
              <el-form-item label="英雄">
                <el-select v-model="item.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button size="small" type="danger" @click="model.restrain.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="进阶攻略" name="moreTips">
          <el-button size="small" @click="model.moreTips.push({})">
            <i class="el-icon-plus"></i>添加攻略
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.moreTips" :key="i">
              <el-form-item label="标题">
                <el-input v-model="item.title"></el-input>
              </el-form-item>

              <el-form-item label="视频背景图">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="res => $set(item, 'banner', res.url)"
                >
                  <img v-if="item.banner" :src="item.banner" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <el-form-item label="视频地址">
                <el-input v-model="item.href"></el-input>
              </el-form-item>

              <el-form-item label="播放量">
                <el-input v-model="item.count"></el-input>
              </el-form-item>

              <el-form-item label="发布日期">
                <el-input v-model="item.date"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button size="small" type="danger" @click="model.moreTips.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top: 1rem">
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    // 由路由传来的id
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        avatar: "",
        skills: [],
        heroes: [],
        partners: [],
        restrained: [],
        restrain: [],
        moreTips: [],
        scores: {
          difficult: 0
        }
      },
      categories: [],
      items: []
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        console.log("修改");
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model); // 修改
      } else {
        res = await this.$http.post("rest/heroes", this.model); // 新增
      }

      console.log(res.data);

      // this.$router.push("/heroes/list");
      this.$message({
        // 保存成功弹框
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`); // 获取被点击的数据
      this.model = Object.assign({}, this.model, res.data); // 将 this.model 与 res.data 两个对象合并到一个空对象，并赋值给this.model
      console.log(res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`); // 获取英雄分类
      this.categories = res.data;
      console.log(res.data);
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`); // 获取装备分类
      this.items = res.data;
      console.log(res.data);
    },
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`); // 获取英雄
      this.heroes = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchHeroes();
    this.fetchCategories();
    this.id && this.fetch(); // 前面的条件满足，即有id才执行 this.fetch()
  }
};
</script>
