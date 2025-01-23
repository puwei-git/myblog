---
title:  hugo常用命令
aliases: 
tags:
  - 基础工具
date:  2025-01-23T23:00:01+08:00
lastmod: 
draft: ture
---

### 创建hugo本地博客
打开终端
```
cd D:\Documents\BaiduSyncdisk\Github
hugo new site blog
cd blog
git init
```



### git上传代码
```
//默认分支与yaml文件相同，设为main
git branch -M main

//对接远程库
git remote add source https://github.com/puwei-git/myblog.git
git remote add pages https://github.com/puwei-git/puwei-git.github.io.git

//验证远程库配置
git remote -v

//添加文件到暂存区
git add .

//将暂存区中的更改提交到本地的仓库，并添加信息
git commit -m "更改信息"

//上传远程代码并合并，上传到source库的main分支
git push source main
```