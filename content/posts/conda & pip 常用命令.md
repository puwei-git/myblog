---
title: conda&pip 常用命令
aliases: 
tags:
  - 基础工具
date: 2025-01-24T00:19:48+08:00
lastmod: 
draft: false
---

## conda 常用命令
- 什么是虚拟环境
    它是一个虚拟化，从电脑独立开辟出来的环境。通俗的来讲，虚拟环境就是借助虚拟机docker来把一部分内容独立出来，我们把这部分独立出来的东西称作“容器”，在这个容器中，我们可以只安装我们需要的依赖包，各个容器之间互相隔离，互不影响。
- 为什么要创建虚拟环境
    在实际项目开发中，我们通常会根据自己的需求去下载各种相应的框架库，但是可能每个项目使用的框架库并不一样，或使用框架的版本不一样，这样需要我们根据需求不断的更新或卸载相应的库。直接对我们的python环境操作会让我们的开发环境和项目造成很多不必要的麻烦，管理也相当混乱。
- 创建虚拟环境 
    conda create -n <env_name> python=3.8
    同时安装必要的包：
    conda create -n <env_name> numpy matplotlib python=3.8
- 复制虚拟环境
    conda create -n <new_env_name> --clone <env_name>
- 安装相应包（只为当前激活的环境）
    conda install name
- 临时换源快速安装
        conda install name=0.0.0 -c https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/linux-64/
- 激活虚拟环境
    source activate <env_name>
    可能遇到问题：bash: activate: 没有那个文件或目录
    解决方法：添加环境变量：export PATH="~/anaconda3/bin:$PATH"
- 退出虚拟环境
    conda deactivate <env_name>
- 退出当前虚拟环境
    conda deactivate
- 查看虚拟环境
    conda env list
- 删除虚拟环境
    conda remove -n <env_name> --all
- pip 使用
    创建虚拟环境后如果直接用pip安装python包，默认会使用全局pip，所以pip安装的包会对所有环境生效。如果要安装只对某个虚拟环境生效的python包，
    - 制定虚拟环境名称：conda install -n <env_name> tensorflow-gpu=1.2.1
    - 也可以在创建虚拟环境的时候指定pip只对当前环境生效（https://stackoverflow.com/questions/20928566/conda-installing-local-development-package-into-single-conda-environment%EF%BC%89%EF%BC%9A）
- pip / conda 导出和安装环境组件 requirements.txt
    https://www.cnblogs.com/maxiaodoubao/p/10605850.html

## conda设置默认虚拟环境
输入：vim ~/.bashrc
在最后一行添加：conda activate <env_name>
其中，<env_name>为你需要设置的默认启动虚拟环境名称

## pip常用命令
- 普通安装 
    pip install name
- 指定版本安装
    pip install name==version
- 卸载
    pip uninstall name
- 列出已安装版本
    pip list
    pip freeze
- 换源安装
    临时换源：pip install name -i https://pypi.tuna.tsinghua.edu.cn/simple
    阿里云： https://mirrors.aliyun.com/pypi/simple/
    清华大学：https://pypi.tuna.tsinghua.edu.cn/simple/
    中国科技大学：https://pypi.mirrors.ustc.edu.cn/simple/
    华中理工大学：http://pypi.hustunique.com/
    山东理工大学：http://pypi.sdutlinux.org/ 
    豆瓣：http://pypi.douban.com/simple/
    [永久换源](https://blog.csdn.net/weixin_67182546/article/details/123827008)