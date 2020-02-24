module.exports = app => {
  const router = require('express').Router()

  // 通过 mongoose 引用模型
  const mongoose = require('mongoose')
  // const Article  = require('../../models/Article')
  const Category = mongoose.model('Category')
  const Article = mongoose.model('Article')
  const Hero = mongoose.model('Hero')
  const Video = mongoose.model('Video')

  // 从服务端接口导入新闻资讯数据
  router.get('/news/init', async (req, res) => {
    const parent = await Category.findOne({ // 找到新闻资讯分类
      name: '新闻资讯'
    })
    const cats = await Category.find().where({ // 找到上级分类是新闻资讯分类的所有子分类
      parent: parent
    }).lean()  // .lean() 表示取出纯粹的 js对象和数组
    const newsTitles = ["体验服爆料丨穿上新盔甲，守护玄雍城！白起优化曝光", "情人节限定皮肤爆料丨喜鹊筑桥，嫦娥后羿月下相逢", "觉醒之战即将再度开启！鬼谷子全屏大，露娜无限连", "新皮肤爆料丨AI意识觉醒，机器少女妲己绚丽登场！", "王者荣耀祝各位召唤师春节快乐！", "2月13日全服不停机更新公告", "部分召唤师无法登录异常说明", "2月11日全服不停机更新公告", "【已修复】关于部分召唤师点券充值未到账、点券到账延迟等问题说明", "王者营地2月14日-15日登录异常说明公告", "创意互动营-云中君皮肤设计大赛投票开启", "爱在峡谷携手度 甜蜜好礼轻松得", "元宵福利到 峡谷好热闹！", "妲己新皮肤即将上架 全新好礼不容错过！", "除夕，年兽宝藏登录即领，抢红包抽内测皮肤！", "中国电竞小伙逐梦记", "2019年赛事数据盘点，峡谷最强选手全知道！", "2020KPL春季赛大名单公示", "假期狂欢季开启，高校区域联赛战队携手虎牙人气主播开战啦！", "高校自制定格动画：说出来你可能不信，我们的“作业”打起来了！"]
    const newsList = newsTitles.map(title => {
      const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5) // 复制一份新闻资讯下的所有子分类，再随机排序
      return {
        categories: randomCats.slice(0, 2), // 每条标题返回两个随机的分类
        title: title // 标题
      }
    })
    await Article.deleteMany({}) // 清空之前的文章
    await Article.insertMany(newsList) // 倒入随机搭配的数据
    res.send(newsList)
  })

  // 导入精彩视频数据
  router.get('/videos/init', async (req, res) => {

    await Video.deleteMany({}) // 清空之前的视频信息
    const rawVideosList = [{ "title": "《每日仙放送》我一手小冰心套在身上 还想跟我打！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=590509&e_code=pvpweb_m.statictypenew.type587", "banner": "https://itea-cdn.qq.com/file/tgl/20200217/a8f73a12cdddf0f835c47d97c73a52de.1581920019.5982e921dce0f27630ea92b724b0d91f.230x140_25278.jpg", "count": "2.4万", "date": "02-19" }, { "title": "【王者茶馆】第5期：地板雷霆、平衡之王", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=590789&e_code=pvpweb_m.statictypenew.type587", "banner": "https://itea-cdn.qq.com/file/tgl/20200218/23c9249e552ddf815c61bb68c85124b7.1582040217.094d4971059707b76280b36413d27e5d.111x110_9959.jpg", "count": "2516", "date": "02-19" }, { "title": "《每日仙放送》不就是插秧吗 我也会！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=590253&e_code=pvpweb_m.statictypenew.type587", "banner": "https://itea-cdn.qq.com/file/tgl/20200216/a8f73a12cdddf0f835c47d97c73a52de.1581853536.f9f13233ea8e23da45e23126baff4cf7.230x140_25870.jpg", "count": "3.7万", "date": "02-17" }, { "title": "《大仙不闹》死亡蹦跳！我的吕布跳大都是拿命在顶！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=590254&e_code=pvpweb_m.statictypenew.type587", "banner": "https://itea-cdn.qq.com/file/tgl/20200216/a8f73a12cdddf0f835c47d97c73a52de.1581853435.189922f94407f2dd4c9b6bf11206aacb.230x140_30069.jpg", "count": "7.8万", "date": "02-17" }, { "title": "猴子和兰陵王遇到神级马可，连续的反杀操作，打得两人没有脾气", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=549791&e_code=pvpweb_m.statictypenew.type641", "banner": "https://itea-cdn.qq.com/file/tgl/20190829/0fed9150bb660fe087fc5b81a2b8d50b.1567084750.7a6176cf4229f5978f81c252e59b1c71.230x140_19614.jpg", "count": "5.2万", "date": "09-02" }, { "title": "在这个模式玩钟馗，不想成辅助都难哦！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=549402&e_code=pvpweb_m.statictypenew.type675", "banner": "https://itea-cdn.qq.com/file/tgl/20190828/c81e728d9d4c2f636f067f89cc14862c.1566979174.49877d84db3db2e7e7c9dec467347647.230x140_16202.jpg", "count": "1.5万", "date": "08-31" }, { "title": "王者荣耀s16边路上分英雄首选是谁？职业玩家都玩的英雄橘子！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=539533&e_code=pvpweb_m.statictypenew.type623", "banner": "https://puui.qpic.cn/qqvideo_ori/0/p0904oeyu12_1280_720/0", "count": "3.1万", "date": "09-09" }, { "title": "王者荣耀排位日常：功能型法师张良，更偏向于控制，多游走支援！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550203&e_code=pvpweb_m.statictypenew.type619", "banner": "https://itea-cdn.qq.com/file/tgl/20190831/34ba14d7e74b333126620db8148b7a4a.1567236016.96cfd48480b6f569f5deb0869ddd8925.230x140_43156.jpg", "count": "3.3万", "date": "09-02" }, { "title": "【荣耀进行时】2019年战队补强深度分析，为梦而战该我上场！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=583647&e_code=pvpweb_m.statictypenew.type587", "banner": "https://shp.qpic.cn/cfwebcap/0/8e266477b004262410a2dc053245c5db/0/?width=230&height=140", "count": "8.5万", "date": "01-16" }, { "title": "【荣耀进行时】2019年最令人印象深刻的四大选手，因为热爱所以坚持！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=583450&e_code=pvpweb_m.statictypenew.type587", "banner": "https://shp.qpic.cn/cfwebcap/0/a29167ecacf6ab1970ea3fe28f59fc8a/0/?width=230&height=140", "count": "11.5万", "date": "01-15" }, { "title": "【荣耀进行时】2019年巅峰之战比赛回顾，王者归来战至终章！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=583035&e_code=pvpweb_m.statictypenew.type587", "banner": "https://shp.qpic.cn/cfwebcap/0/6d828de2c704ab308d1c4a131e52eede/0/?width=230&height=140", "count": "12.7万", "date": "01-14" }, { "title": "【棋高一招】第九期：冠军RW女侠纳兰手手，教你新版本高爆发制霸棋盘！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=582451&e_code=pvpweb_m.statictypenew.type587", "banner": "https://shp.qpic.cn/cfwebcap/0/ef527aeab973e6e4cd233e19262e0158/0/?width=230&height=140", "count": "16.8万", "date": "01-11" }, { "title": "王者荣耀世冠：远游之枪华丽收割，花满楼世冠马可波罗击杀集锦", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550567&e_code=pvpweb_m.statictypenew.type751", "banner": "https://puui.qpic.cn/qqvideo_ori/0/z092122i7uv_1280_720/0", "count": "4.2万", "date": "09-03" }, { "title": "Djie一闪侧翼进场，梦奇小爪子疯狂乱舞！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550792&e_code=pvpweb_m.statictypenew.type751", "banner": "https://puui.qpic.cn/qqvideo_ori/0/g0921jhs0ha_1280_720/0", "count": "2.4万", "date": "09-02" }, { "title": "花海云中君暴走时刻，这波三杀真的帅气！", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550566&e_code=pvpweb_m.statictypenew.type751", "banner": "https://puui.qpic.cn/qqvideo_ori/0/r09212zlrm4_1280_720/0", "count": "2万", "date": "09-02" }, { "title": "世冠雨雨关羽集锦：这就是实力！千万雄兵莫敢当，单刀匹马斩四方", "href": "https://pvp.qq.com/m/m201606/detail.shtml?G_Biz=18&tid=550251&e_code=pvpweb_m.statictypenew.type751", "banner": "https://puui.qpic.cn/qqvideo_ori/0/b0921yawkou_1280_720/0", "count": "3万", "date": "09-01" }]
    const newList = [
      { name: "精品栏目", videos: rawVideosList.slice(0, 4) },
      { name: "英雄攻略", videos: rawVideosList.slice(4, 8) },
      { name: "赛事精品", videos: rawVideosList.slice(8, 12) },
      { name: "赛事视频", videos: rawVideosList.slice(12, 16) },
    ]

    for (cat of newList) {
      const categoris = await Category.findOne({
        name: cat.name
      })
      cat.videos = cat.videos.map(video => {
        video.categoris = categoris
        return video
      })


      await Video.insertMany(cat.videos) // 导入处理后的数据
    }

    res.send(newList)

  })

  // 精彩视频列表接口
  router.get('/videos/list', async (req, res) => {
    const parent = await Category.findOne({ // 查出精彩视频下的子分类
      name: '精彩视频'
    })
    const cats = await Category.aggregate([ // 聚合查询，类似 mysql  
      { $match: { parent: parent._id } }, // 找到精彩视频下的子分类
      {
        $lookup: { // 关联查询
          from: 'videos', // 这里指集合名，为模型名的小写复数形式
          localField: '_id', // 本地字段
          foreignField: 'categories', // 外键字段
          as: 'videoList' // 取名
        }
      }
    ])
    res.send(cats)
  })

  // 图文攻略数据接口
  router.get('/strategies/list', async (req, res) => {
    const parent = await Category.findOne({ // 查出图文攻略下的子分类
      name: '图文攻略'
    })
    const cats = await Category.aggregate([ // 聚合查询，类似 mysql  
      { $match: { parent: parent._id } }, // 找到图文攻略下的子分类
      {
        $lookup: { // 关联查询
          from: 'strategies', // 这里指集合名，为模型名的小写复数形式
          localField: '_id', // 本地字段
          foreignField: 'categories', // 外键字段
          as: 'strategyList' // 取名
        }
      }
    ])
    res.send(cats) 
})


// 新闻资讯数据列表接口
router.get('/news/list', async (req, res) => {
  // 这个方法可行但是MongoDB在调取数据时会先统计总数再调取，不能满足每个分类只有5条数据
  // const parent = await Category.findOne({
  //   name: '新闻资讯'
  // }).populate({ // 找出新闻资讯分类下的子分类
  //   path: 'children',
  //   populate: { // 找出子分类里的 newsList
  //     path: 'newsList'
  //   }
  // }).lean()
  const parent = await Category.findOne({ // 查出新闻资讯下的子分类
    name: '新闻资讯'
  })
  const cats = await Category.aggregate([ // 聚合查询，类似 mysql  
    { $match: { parent: parent._id } }, // 找到新闻资讯下的子分类
    {
      $lookup: { // 关联其他集合
        from: 'articles', // 这里指集合名，为模型名的小写复数形式
        localField: '_id', // 本地键
        foreignField: 'categories', // 外地键
        as: 'newsList' // 取名
      }
    },
    {
      $addFields: { // 添加字段或修改字段
        newsList: { $slice: ['$newsList', 5] } // $slice 操作符，类似数组里的slice. 每一个 newsList 只要5条数据 
      }
    }
  ])

  // 添加热门
  const subCats = cats.map(v => v._id) // 提取新闻，公告，赛事，活动的 id
  cats.unshift({ // 在 cats 数组第一位前添加一个热门数组
    name: '热门',
    newsList: await Article.find().where({
      categories: { $in: subCats } // 热门下的 newsList 数组里的 categories 有两个子分类的id
    }).populate('categories').limit(5).lean()
    // 从新闻，公告，赛事，活动调出5条数据作为热门，并关联分类表，此时 热门下的 newsList 数组里的 categories 是数组，包含两个分类的具体数据
  })

  /* 
   因为newsList的每条数据对象里的categories数组都有两个分类信息，
   在这里添加一条categoryName属性，值等于每个newsList上面对应的分类名，如活动，新闻，赛事，
   其中把热门分类下的 newsList 数组里的每个子对象里的 categoryName属性 改为 categories 里的第一个数组里的分类名name
   这样方便前端拿到数据可以直接使用
  */
  cats.map(cat => {
    cat.newsList.map(news => {
      news.categoryName = (cat.name === '热门')
        ? news.categories[0].name : cat.name // 处理热门里的 categories
      return news
    })
    return cat
  })
  res.send(cats) // 通过 http://127.0.0.1:3000/web/api/news/list 查看数据最终格式
})


// 导入英雄数据
router.get('/heroes/init', async (req, res) => {
  await Hero.deleteMany({}) // 清空原有数据
  // 从官网中提取的数据
  const rawData = [{ "name": "热门", "heroes": [{ "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "安琪拉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "妲己", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }] }, { "name": "战士", "heroes": [{ "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "曹操", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg" }, { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" }, { "name": "宫本武藏", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" }, { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "老夫子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" }, { "name": "关羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "刘备", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "杨戬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" }, { "name": "雅典娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" }, { "name": "哪吒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "狂铁", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "李信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" }, { "name": "盘古", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }, { "name": "曜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg" }, { "name": "马超", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" }] }, { "name": "法师", "heroes": [{ "name": "小乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" }, { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "妲己", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "嬴政", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg" }, { "name": "高渐离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "扁鹊", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "周瑜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "武则天", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "安琪拉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "姜子牙", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "王昭君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg" }, { "name": "张良", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "诸葛亮", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg" }, { "name": "干将莫邪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg" }, { "name": "女娲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg" }, { "name": "杨玉环", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "弈星", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg" }, { "name": "米莱狄", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "沈梦溪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }, { "name": "西施", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg" }] }, { "name": "坦克", "heroes": [{ "name": "廉颇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" }, { "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "白起", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "项羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "刘邦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "东皇太一", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "梦奇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }, { "name": "猪八戒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg" }] }, { "name": "刺客", "heroes": [{ "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "阿轲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg" }, { "name": "李白", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "兰陵王", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg" }, { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "娜可露露", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "百里玄策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "元歌", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }, { "name": "马超", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg" }] }, { "name": "射手", "heroes": [{ "name": "孙尚香", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" }, { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "马可波罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" }, { "name": "狄仁杰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg" }, { "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "李元芳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg" }, { "name": "虞姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" }, { "name": "成吉思汗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg" }, { "name": "黄忠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "公孙离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg" }, { "name": "伽罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" }, { "name": "蒙犽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg" }] }, { "name": "辅助", "heroes": [{ "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "姜子牙", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "蔡文姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "大乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg" }, { "name": "鬼谷子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg" }, { "name": "明世隐", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg" }, { "name": "杨玉环", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "盾山", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" }, { "name": "瑶", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg" }, { "name": "鲁班大师", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg" }] }]
  for (let cat of rawData) {  // for(let cat of rawData) 这里的 cat 是rawData下的每一项，如果把 of 改为 in cat表示索引值
    // 跳过热门分类数据
    if (cat.name === '热门') {
      continue
    }
    // 找到当前分类在数据库中对应的数据
    const category = await Category.findOne({
      name: cat.name
    })
    // console.log(category)
    cat.heroes = cat.heroes.map(hero => {
      hero.categories = [category]
      return hero
    })

    // 录入英雄
    await Hero.insertMany(cat.heroes)
  }
  res.send(await Hero.find())
})


// 英雄列表接口
router.get('/heroes/list', async (req, res) => {
  const parent = await Category.findOne({ // 查出子分类
    name: '英雄列表'
  })
  const cats = await Category.aggregate([ // 聚合查询，类似 mysql  
    { $match: { parent: parent._id } }, // 找到英雄列表下的子分类
    {
      $lookup: { // 关联查询
        from: 'heroes', // 这里指集合名，为模型名的小写复数形式
        localField: '_id', // 本地字段
        foreignField: 'categories', // 外键字段
        as: 'heroList' // 取名
      }
    }
  ])

  // 添加热门                                        
  const subCats = cats.map(v => v._id) // 提取出子分类战士，刺手，射手...的 id
  cats.unshift({ // 在 cats 数组第一位前添加一个热门数组
    name: '热门',
    heroList: await Hero.find().where({
      categories: { $in: subCats } // 热门下的 newsList 数组里的 categories 有两个子分类的id
    }).limit(20).lean()
    // 从子分类战士，刺手，射手...调出10条数据作为热门，并关联分类表，此时 热门下的 heroList 数组里的 categories 是数组，包含两个分类的具体数据
  })

  res.send(cats) // 通过 http://127.0.0.1:3000/web/api/heroes/list 查看数据最终格式
})


// 文章详情
router.get('/articles/:id', async (req, res) => {
  const data = await Article.findById(req.params.id).lean()
  data.related = await Article.find().where({
    categories: { $in: data.categories }
  }).limit(2)
  res.send(data)
})

// 英雄详情
router.get('/heroes/:id', async (req, res) => {
  const data = await Hero
    .findById(req.params.id)
    .populate('categories items1 items2 partners.hero restrained.hero restrain.hero')
    .lean()
  res.send(data)
})

app.use('/web/api', router)
}