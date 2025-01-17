---
title: 杂货铺
aliases: [wiki]
type: wiki
date: 2025-01-01
lastmod: 2025-01-17
---

### 博客搭建过程参考（待整理）
- 主题：[virgo](https://github.com/loveminimal/hugo-theme-virgo)
- B站视频：[陈三月Jules](https://www.bilibili.com/video/BV1H5CiYHEQR?spm_id_from=333.788.recommend_more_video.1&vd_source=15a167d09b9cba40e860bfcd6533b202)
- github部署：
 -配置：[virgo作者博客](https://aituyaa.com/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8-hugo-theme-virgo-%E4%B8%BB%E9%A2%98/)
- 图床：smms，[配置](https://blog.csdn.net/m0_56311797/article/details/134598968)
- obdidian侧：[配置](https://blog.csdn.net/gitblog_00893/article/details/141238667)
obsidian + picgo 报错 upload failed, check dev console，直接下载最新版picgo重新安装配置就可以正常使用了
- 写文章：obsidian
- 待添加：[网站收录](https://www.bilibili.com/video/BV1724y1U779?spm_id_from=333.788.videopod.sections&vd_source=15a167d09b9cba40e860bfcd6533b202)、背景音乐、博客搬家、主题优化（字体颜色大小等）。。。

### 将网站收录到Google
谷歌收录网站：[https://search.google.com/search-console/](https://search.google.com/search-console/)，在**网页前缀模块**里面输入自己网页地址，点击继续。

这里采用HTML文件验证的方法：**下载对应的文件googlexxx.html**（页面不要关闭），将文件放到博客的**static目录**下，编译上传。上传后在刚刚下载文件的页面点击验证，验证成功后点击**前往资源页面**。

打开自己在github中关于网页的工程，可以看到网页工程里面有一个sitemap.xml的文件，网站中所有的url都会显示在里面。在资源页面左侧，点击编制索引-站点地图。