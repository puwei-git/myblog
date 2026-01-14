---
title: hugo常用命令
aliases:
tags:
  - 基础工具
date: 2025-01-23T23:00:01+08:00
lastmod:
draft: false
---

### hugo安装
#### 下载
安装地址：[https://github.com/gohugoio/hugo/releases](https://github.com/gohugoio/hugo/releases)

建议安装extended版本 有些主题需要在该版本下运行：[hugo_extended_0.140.2_windows-amd64.zip](https://github.com/gohugoio/hugo/releases/download/v0.140.2/hugo_extended_0.140.2_windows-amd64.zip)

#### 配置环境
创建一个名为Hugo的文件夹，其下新建bin文件夹，将解压的hugo.exe文件放入bin目录下。

在系统变量Path中添加hugo.exe的目录，如：`C:\software\Hugo\bin`

### 创建hugo本地博客
打开终端
```
cd D:\Documents\BaiduSyncdisk\Github
# cd C:\Users\puwei\Documents\My_files\BaiduSyncdisk\Github\blog 
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