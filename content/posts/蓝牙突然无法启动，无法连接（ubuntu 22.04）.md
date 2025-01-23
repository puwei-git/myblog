---
title: 蓝牙突然无法启动，无法连接（ubuntu 22.04）
aliases: 
tags:
  - Ubuntu
date: 2024-05-24T09:44:26+08:00
lastmod: 2025-01-18T02:14:45+08:00
draft: false
---

### 问题描述
ubuntu的蓝牙之前正常使用，突然无法使用，并且wifi等没有问题。主要错误标示为Bluetooth: hci0: Reading Intel version command failed (-110)

![image.png](https://s2.loli.net/2025/01/23/Aar1QTGzyg28Hwh.png)

图中开启的地方可以拨动，但是拨动后并没有反应，也不变颜色。
### 查看蓝牙状态
```
(base) puwei@puwei-ubuntu:~$ sudo dmesg |grep -i bluetooth
[5.025352] Bluetooth:core ver 2.22
[5.025374] NET: Registered PF_BLUETOOTH protocol family
[5.025376] Bluetooth: HCI device and connection manager initialized
[5.025382] Bluetooth: HCI socket layer initialized
[5.025385] Bluetooth: L2CAP socket layer initialized
[5.025391] Bluetooth: SCO socket layer initialized
[5.420582] Bluetooth: BNEP (Ethernet Emulation) ver 1.3
[5.420587] Bluetooth: BNEP filters: protocol multicast
[5.420594] Bluetooth: BNEP socket layer initialized
[7.048247] Bluetooth: hci0: command 0xfc05 tx timeout
[7.048248] Bluetooth: hci0 Reading Intel version command failed (-110)
```


### 解决办法
解决办法网上有多种，在这里有效的为：

	sudo rmmod btusb
	sudo modprobe btusb
再次查看蓝牙状态

```
(base) puwei@puwei-ubuntu:~$ sudo dmesg |grep -i bluetooth
```

此处则表示可以正常使用了:

```
(base) puwei@puwei-ubuntu:~$ lsusb |grep -i bluetooth
Bus 001 Device 003: ID 8087:0029 Intel Corp. AX200 Bluetooth
```
