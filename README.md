---
title: hexo-theme-sam 主题使用方法
date: 2017-04-24 16:14:29
categories:
  - 技术开发
tags:
  - hexo
---

## 开始使用
### 安装主题
1. 初始化
```bash
// "blog" 为文件夹名
$ hexo init blog
```

2. 主题下载
  * 初始化后进入`blog`文件夹，结构如下：
  ```
  .
  ├ node_modules
  ├ scaffolds     // 模版文件夹
  ├ source        // 资源文件夹
  ├ themes        // 主题文件夹
  ├ _config.yml   // 网站的 配置 信息
  ├ .gitignore
  └ package.json  // 应用程序的信息
  ```

<!-- more -->

  * 进入`themes`主题文件夹，克隆[hexo-theme-sam主题](https://github.com/Sam618/hexo-theme-sam)。
  ```bash
  $ cd themes/
  $ git clone git@github.com:Sam618/hexo-theme-sam.git
  ```

3. 主题切换
  * 切换回根目录，打开`_config.yml`网站配置文件；
  ```bash
  $ cd ../
  ```

  * 找到`theme`属性，并把值修改为`hexo-theme-sam`。
  ```yml
  theme: hexo-theme-sam
  ```
  ![图片](http://www.cfmwsc.com/2017/04/24/hexo-theme-sam-used/post_1.png)

4. 主题预览
  * 预览当前主题；
    ```bash
    $ hexo server --debug
    ```

  * 发现没有加载`css`文件，因为默认`hexo`使用了`stylus`预处理器；而`hexo-theme-sam`主题使用了`SCSS`预处理器，先不管它往后看。  
  ![图片](http://www.cfmwsc.com/2017/04/24/hexo-theme-sam-used/post_2.png)

### 插件准备
1. 安装
  ```bash
  $ npm install hexo-renderer-sass --save
  $ npm install hexo-generator-json-content --save
  $ npm install hexo-generator-feed --save
  ```
  * `hexo-renderer-sass`，主题使用的是`SCSS`，之后再预览就能加载`css`文件了；
  * `hexo-generator-json-content`，主题使用了本地搜索功能，这个插件会生成一个`JSON`格式的所有文章数据；
  * `hexo-generator-feed`，用于生成`RSS`订阅，经过配置，根目录会生成一个`XML`文件。

2. 配置
以下配置在根目录的`_config.yml`文件中写入。
  * `hexo-generator-json-content`插件生成的数据有许多是用不到的，参考[官网](https://github.com/alexbruno/hexo-generator-json-content)配置如下：
  ```yml
  jsonContent:
    meta: false
    pages: false
    posts:
      title: true
      date: true
      path: true
      text: true
      raw: false
      content: false
      slug: false
      updated: false
      comments: false
      link: false
      permalink: false
      excerpt: false
      categories: true
      tags: true
  ```
  * `hexo-generator-feed`插件配置：
  ```yml
  #RSS订阅
  plugin:
    - hexo-generator-feed
  ```

### 主题更新
```bash
$ cd themes/hexo-theme-sam
$ git pull
```

### 语言切换
* 默认语言为英语，文件名为`default.yml`，在主题文件夹下的`languages`中；
* 配置在根目录的`_config.yml`中，属性为`language`；
```yml
language: zh-CN
```
* 现在一共有两种可选语言，英语和简体中文。

## 基础设置

### 站点信息
主要修改或添加以下内容：
```yml
title: 网站的标题
keywords: 网站的关键字
description: 网站的描述
author: 网站的作者
url: 网站的完整域名，格式 http://www.cfmwsc.cn/
root: 网站的位置，根目录就为 /
```

### 新建文章
* 只需使用命令`hexo new`后面选择模板`post`，`hexo-test`就是文章标题，**注意** 文章标题最好是英文；
```bash
$ hexo new post hexo-test
```

* 文章有一些内容需要在[官网](https://hexo.io/zh-cn/docs/writing.html)了解。

### 文章摘要
在文章内容中添加`<!-- more -->`就可以在主页显示摘要，如下所示：
![图片](http://www.cfmwsc.com/2017/04/24/hexo-theme-sam-used/post_3.png)
![图片](http://www.cfmwsc.com/2017/04/24/hexo-theme-sam-used/post_4.png)

### 评论设置
* 评论默认开启，在主题的配置文件`_config.yml`中：
```yml
comments: true
```
* 评论使用的是畅言平台，需要`ID`和`KEY`，在文件中修改配置：
```yml
# ID
changyan_appid: cysXoaLrO

# KEY
changyan_appkey: d728bfac2289e4139bef3956efe4401f
```

### 导航菜单
导航菜单可以修改图标和注释选项，链接需要加上`index.html`不然会导致识别不出当前页面，图标使用的是阿里的`iconfont`字体：
```yml
# 侧边导航
aside_menu:
  home:
    link: /index.html
    icon: wendang
  archives:
    link: /archives/index.html
    icon: wendang1
  tags:
    link: /tags/index.html
    icon: biaoqian1
  links:
    link: /links/index.html
    icon: lianjie
  about:
    link: /about/index.html
    icon: guanyu
  rss:
    link: /atom.xml
    icon: rss
```

### 分类与标签
* `分类与标签`页默认并没有创建所以打不开，需要自己手动创建主页：
```bash
$ hexo new page tags
```

* 页面标题可以在主题文件夹`languages`语言文件夹中选择当前语言的配置文件中修改：
```yml
tags: 所有标签
categories: 所有分类
```
![图片](http://www.cfmwsc.com/2017/04/24/hexo-theme-sam-used/post_5.png)

* 如果`分类`和`标签`是中文，就需要映射为英文以便链接和文件夹名为英文，在根配置文件中修改：
```yml
# 分类和标签的映射，中文就需要映射防止 BUG
category_map:
  技术开发: tech
  资源共享: share
  新闻动态: news
  生活杂烩: life
  点滴记录: diary
tag_map:
```

### 关于页面
和`分类与标签`页一样：
```bash
$ hexo new page about
```
```yml
about: 关于
```

### 本地搜索
本地搜索默认开启，[上文](#插件准备)有讲如何配置，设置在主题文件夹的`_config.yml`中：
```yml
# 搜索
search: true
```

### `favicon`图标
一般放在根目录下，名字命名为`favicon.icon`；如有特殊要求也可在根目录下配置地址：
```yml
# 需要自己添加
favicon: /favicon.ico
```

### `RSS`订阅
`RSS`只要装好[插件](#插件准备)基本就可以使用了，修改下[导航菜单](导航菜单)的`RSS`链接即可。

### 字体图标
* 如果想要修改需要先在根目录配置文件中设置：
```yml
# 修改字体图标链接，用的是阿里的 iconfont
fontface_url: //at.alicdn.com/t/font_pb2xepysv85gsyvi.css
```

* 修改导航菜单图标[上文](导航菜单)有讲，但是还有一些图标就要在`SCSS`文件中找了。
