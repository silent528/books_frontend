## 多看小说网客户端(h5,app,小程序)

`duokan`是一个基于自有爬虫引擎构建的小说客户端，目的是让阅读更简单、优雅，让每位读者都有舒适的阅读体验，如**搜书、阅读、收藏等功能**：

衍生项目：

- 多看小说web： [web](http://www.duokanxiaoshuo.site)
- 多看小说h5：[h5](http://www.duokanxiaoshuo.site/h5)

**注意**：若将本项目部署并发行，请**声明来源**，本项目纯属**共享学习之用，不得用于商业！**

### duokan

对于不同网站的小说，页面规则都不尽相同，我希望能够在代码解析后再统一展示出来，这样方便且美观，而不是仅仅跳转到对应网站就完事，清新简洁的阅读体验才是最重要的

#### Installation

请先装好nodejs, 装好后，进入项目目录，依照步骤执行：

```shell
# 下载代码
git clone git@github.com:silent528/books_frontend.git
cd books_frontend
npm install
# h5
npm run dev:h5
```
#### TODO

- [ ] 评分
- [ ] 阅读书单
- [ ] 推荐
- [ ] 评论

### FAQ


### Reference

**duokan使用了以下第三方包:**

- uni-app
- vue
- vuex

### License

`duokan` is offered under the Apache 2 license.