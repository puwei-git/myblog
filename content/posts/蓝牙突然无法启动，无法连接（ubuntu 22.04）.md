---
title: 蓝牙突然无法启动，无法连接（ubuntu 22.04）
aliases: []
tags:
  - Ubuntu
date: 2024-05-24T09:44:26+08:00
lastmod: 2025-01-19T02:14:45+08:00
draft: false
---

### 问题描述
ubuntu的蓝牙之前正常使用，突然无法使用，并且wifi等没有问题。主要错误标示为Bluetooth: hci0: Reading Intel version command failed (-110)
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9359c03615288908f378c01713f3029f.png)
图中开启的地方可以拨动，但是拨动后并没有反应，也不变颜色。
### 查看蓝牙状态
	sudo dmesg |grep -i bluetooth
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/47c2156911f67fc684aa932d4c504498.png)
### 解决办法
解决办法网上有多种，在这里有效的为：

	sudo rmmod btusb
	sudo modprobe btusb
再次查看蓝牙状态

	sudo dmesg |grep -i bluetooth
	
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/a0da1bee66a74710dbc33d25616509d5.png)
此处则表示可以正常使用了
	