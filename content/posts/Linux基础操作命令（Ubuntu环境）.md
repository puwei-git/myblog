---
title: Linux基础操作命令（Ubuntu环境）
aliases: 
tags:
  - Ubuntu
date: 2024-05-14T16:27:30+08:00
lastmod: 2025-01-17T21:07:45+08:00
draft: false
---

## Shell基本操作：命令+选项+参数
### 系统命令
    目录信息查看命令：ls  
    目录切换命令：cd  
    当前路径显示命令：pwd  
    系统信息查看命令：uname  
    清屏命令：clear  

    创建新文件命令：touch（文本文件类型，与vim创建的没有区别）  
    创建文件夹命令：mkdir  
    文件及目录删除命令：rm、rm 目录名 -rf 使用参数强制递归删除文件夹  
    文件夹（目录）删除命令：rmdir  
    文件复制命令：cp  
    文件移动命令：mv  
    显示文件内容命令：cat  

    切换用户执行身份命令：sudo  
    添加用户命令：adduser（需要用root身份）  
    删除用户命令：deluser  
    切换用户命令：su  
    进入root界面：sudo -su  

文件查询和搜索：  

- find：find <路径> <参数> <关键字>  
如：find /etc/ -name vim* 查找/etc路径下包含以vim*开头的文件  
- grep：grep <参数> 关键字 文件列表  
如：grep -ir “Ubuntu” /usr 查找/usr目录下递归查找包含字符”Ubuntu“的文件  

权限：

| 字母 | 权限 | 二进制 | 八进制 |
|:---:|:---: |:-----: |:----: |
|  r  | 可读  | 100   |    4  |
|  w  | 可写  | 010   |   2   |
|  x  | 可执行 | 001  |   1   |

- chmod：权限修改命令
  chmod 参数 文件名/目录名
- chown：文件归属者修改命令
  chown   参数   用户名.<组名>   文件名/目录  

### 磁盘管理命令:

    磁盘分区命令：fdisk
    格式化命令：mkfs  
    挂载分区命令：mount  
    卸载命令：umount  

    更新本地数据库：sudo apt-get update
    检查依赖关系：sudo apt-get check
    设置初始unix密码：sudo passwd

    显示和配置网络属性命令：ifconfig
    查看进程信息：ps -aux
    查看当前运行程序：top
    强制杀死程序：kill -9 <PID号>

    系统帮助命令：man
    系统重启命令：reboot
    系统关闭命令：poweroff

### 系统更新
    sudo apt update && sudo apt -y upgrade

### 关机与重启
- 立刻关机：shutdown -h now
- 10分钟之后自动关机：shutdown -h 10
- 立刻关机：halt
- 立刻关机：poweroff
- 重启：reboot
- 重启：shutdown -r now

### 查看运行的进程
- 罗列当前进程：ps
- 实时进程监视器：top
- 可交互可视化实时进程监视器：htop (sudo apt install htop)

## 软件安装卸载
### zip 压缩解压
- zip 压缩  
    zip -rv <文件名.zip> test
- zip 解压  
    unzip <参数> test.zip
### tar 压缩解压
- tar 压缩  
    bz2格式: tar -vcjf <文件名.tar.bz2> <文件名>  
    gz格式: tar -vczf <文件名.tar.gz> <文件名>  
- tar 解压  
    bz2格式: tar -vxjf <文件名.tar.bz2> <文件名>  
    gz格式: tar -vxzf <文件名.tar.gz> <文件名>  
### sudo-apt 默认安装卸载
- apt-get 安装  
    sudo apt-get install <软件名>  
- apt-get 更新  
    sudo apt-get upgrade <软件名>  
- apt-get 卸载  
    sudo apt-get remove <软件名>  

### deb 文件安装卸载
- deb 安装  
    sudo dpkg -i <deb文件名>  
- deb 查看已安装  
    sudo dpkg -l  
    dpkg --list
    ii表示软件正常安装  
    rc表示软件已卸载，可是配置文件还在，可以通过以下命令进行清理
        dpkg -l | grep ^rc | cut -d' ' -f3 | sudo xargs dpkg --purge 或
        dpkg -l |grep ^rc|awk ‘{print $2}’ |sudo xargs dpkg -P
- deb 卸载  
    sudo dpkg -r <软件名>

