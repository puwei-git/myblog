---
title: 基于Docker的PyTorch深度学习环境配置（Ubuntu 22.04）
aliases: []
tags:
  - Pytorch
date: 2024-05-21T22:10:38+08:00
lastmod: 2025-01-19T02:12:45+08:00
draft: false
---


## 说明
- 为解决不同项目的深度学习环境不同以及配置配置麻烦的问题，采用docker容器，通过下载运行[官网](https://catalog.ngc.nvidia.com/orgs/nvidia/containers/pytorch/tags)现成的容器进行配置。
- 为解决docker内无法直观显示图片等问题，采用PyCharm调用docker中的环境。
- 本配置使用本机的docker,而不是服务器中的docker,后续有需要或将此文章更新为两种配置。
- 配置此文环境且写此文档时，本机电脑配置为AMD Ryzen 9 3900X + NVIDIA GeForce GTX 1660 SUPER。
- 本机系统为：Ubuntu 22.04

PS：由于前后花费较多时间，并且文档整理期间也有事情耽误几天，或有遗漏错误，还望指正！
## docker安装及常用命令
### docker安装
本部分有参考[苏洋博客](https://soulteary.com/2022/06/21/building-a-cost-effective-linux-learning-environment-on-a-laptop-the-basics.html#%E6%9B%B4%E7%AE%80%E5%8D%95%E7%9A%84-docker-%E5%AE%89%E8%A3%85)中更简单的docker安装内容。如果有需要，读者可以参考相应内容。

#### 清理老版本的软件
    sudo apt remove -y docker docker-engine docker.io containerd runc
#### 安装所需工具依赖
    sudo apt install -y ca-certificates curl gnupg lsb-release
#### 下载软件包签名使用的GPG密钥，并配置系统信任该密钥
    sudo mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
若无法访问官方地址，可以将密钥下载地址替换为下面的地址。

    # 清华源
    https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu/gpg
    # 阿里云
    https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg
    
#### 创建一个适合于当前 CPU 架构和系统版本的软件源。
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  同样的，如果你希望能够更快的下载到软件，可以配置软件源来替换官方地址。
  
    # 清华源
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu/ \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    # 阿里云
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu/ \
      $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

#### 安装docker的社区版
    sudo apt update && sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

#### 将当前用户加入docker用户组
    sudo gpasswd -a ${USER} docker

#### 查看 docker 的用户组
    sudo cat /etc/group | grep docker
#### 为docker配置镜像Mirror
有的时候，我们拉取 docker 官方镜像会十分的慢，甚至会卡顿中断，这个时候，可以考虑为 docker 配置一些容器镜像。

执行下面的命令，将会创建一个位于/etc/docker/daemon.conf 的文件，并包含一些通用的容器镜像。

    echo '{"registry-mirrors": [ 
        "https://registry.docker-cn.com",
        "http://hub-mirror.c.163.com",
        "https://docker.mirrors.ustc.edu.cn/",
        "https://zrb2xl6u.mirror.aliyuncs.com"
      ]}' | jq | sudo tee /etc/docker/daemon.json
执行命令：

	cat /etc/docker/daemon.conf
能够看到配置中添加了上面的镜像地址，并且内容是被格式化过的。

执行下面的命令，重启服务：

	sudo systemctl restart docker.service

然后执行下面的命令确认配置是否生效即可

	docker info

启动docker

    service docker start
### docker常用命令
- 查看正在运行的容器   
        docker ps 
- 查看所有容器  
        docker ps -a
- 保存当前容器为新的镜像（镜像命名不能有大写字母）
    docker commit 8c9e37f0a008 pytorch_env:v0.1
- 启动容器（后台模式）
    docker run -d  ubuntu:14.04 /bin/bash -c "while true; do echo hello world; sleep 1; done"
- 停止容器
    docker stop 容器ID
- 查看命令使用方法
    docker command --help
- 启动已停止运行的容器
    docker restart 容器ID
- 为容器启动第二个终端
    docker exec -it 容器ID /bin/bash
- 后台运行
    docker run -itd --name
- 退出容器终端且不会导致容器停止
    docker exec
- 进入后台的容器
    docker attach 容器ID
- 导出容器
    docker export 容器ID > ubuntu.tar
- 将容器快照文件导入为镜像
    docker/ubuntu.tar | docker import - pytorch_env:v1.0
- 删除容器
    docker rm -f 容器ID
- 列出镜像列表
    docker images
- 删除镜像
    docker rmi 镜像名
## 显卡驱动及Nvidia docker安装
### 显卡驱动安装
#### 获取最新版本的稳定版本的驱动
    nvidia-detector
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/7410b14cca2d5309882fab51bb0b5eae.png)

#### 根据获取的提示安装驱动
    sudo apt-get install -y nvidia-driver-545 nvidia-dkms-545

#### 测试nvidia-smi报错
NVIDIA-SMI has failed because it couldn't communicate with the NVIDIA driver. Make sure that the latest NVIDIA driver is installed and running.
参考[解决方法](https://blog.csdn.net/sazass/article/details/116074288)：通过安装对应的驱动模块。
查看对应驱动模块
	
	cd /usr/src
	ls
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d1123a7c73c19b2f3599a8f76eb55329.png)
 然后安装对应的DKMS

	sudo apt-get install dkms

根据个人版本号重新安装对应nvidia的驱动模块

	sudo dkms install -m nvidia -v 545.29.06
输入nvidia-smi测试
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5b574e69445b41a880a9afe318ac9bd6.png)

### Nvidia docker安装
根据[官网](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)的提示进行安装，我这里采用的是apt安装方式。
安装Lib Nvidia Container工具的软件源：

	curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  	&& curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
	sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list

更新系统软件列表并安装nvidia-container-toolkit：
 
	sudo apt-get update
	sudo apt-get install -y nvidia-container-toolkit
完成安装后配置docker：

	sudo nvidia-ctk runtime configure --runtime=docker
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9bc36c32ec0c39cb87843acb9b1ea5a2.png)
完成配置后重启docker服务，使配置生效：

	sudo systemctl restart docker
重启服务后，查看docker运行时列表可以看到生效信息：

	docker info | grep Runtimes
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/fadedd4e98cc50258b87398b8fd4b402.png)
### 获取docker镜像
自己构建镜像会比较折腾，这里考虑直接获取官方镜像。这里给出几个网站：[nvidia pytorch镜像](https://catalog.ngc.nvidia.com/orgs/nvidia/containers/pytorch/tags)，[nvidia镜像官网](https://catalog.ngc.nvidia.com/containers?filters=&orderBy=weightPopularDESC&query=&page=&pageSize=)，[docker hub镜像](https://hub.docker.com/)。
这里由于下载的docker镜像的cuda版本应不高于主机的cuda版本，这里并没有下载当时最新的docker镜像，而是下载了pytorch:23.02-py3。

运行下面的代码即下载并运行此docker容器了
```
docker run --gpus all -it --rm nvcr.io/nvidia/pytorch:23.02-py3 nvidia-smi
```

但是输出的日志可能会提醒我们并行计算需要的缓存不足：
```
NOTE: The SHMEM allocation limit is set to the default of 64MB.  This may be
   insufficient for PyTorch.  NVIDIA recommends the use of the following flags:
   docker run --gpus all --ipc=host --ulimit memlock=-1 --ulimit stack=67108864 ...
```
我们可以根据说明继续调整命令，并添加文件挂载等命令，可以直接启动
```
docker run --gpus all --ipc=host --ulimit memlock=-1 --ulimit stack=67108864 -it -v \
/home/puwei/Documents/Docker_share:/root/Documents:rw --rm nvcr.io/nvidia/pytorch:23.02-py3 /bin/bash
```

退出docker

	exit

## 配置PyCharm调用本机docker环境
### 本机docker容器配置
#### 启动镜像
由于需要使用ssh访问容器，就需要将容器内的端口映射到主机的端口，这里采用端口映射的镜像启动方式：
```
docker run --gpus all --ipc=host --ulimit memlock=-1 --ulimit stack=67108864 -it -v \
/home/puwei/Documents/Docker_share:/root/Documents:rw --name PyTorch_v0.1 -p 8022:22 \
--rm nvcr.io/nvidia/pytorch:23.02-py3 /bin/bash
```
其中

	/home/puwei/Documents/Docker_share:/root/Documents:rw，表示并将宿主机的 /home/puwei/Documents/Docker_share 目录挂载到容器内的 /root/Documents 目录；
	PyTorch_v0.1，表示命名一个这样的容器名；
	8022:22，表示端口映射；
#### 容器内安装sudo

	apt-get update
	apt-get install sudo
#### 容器内安装并启动ssh，查看ssh服务状态

	sudo apt-get install openssh-server	
	sudo /etc/init.d/ssh start
	sudo service ssh status

#### 容器内设置root密码和配置文件
设置密码：

	passwd root
配置文件：

	vim /etc/ssh/sshd_config
在文档末尾添加以下内容（中文解释可以全部去掉）：

    #启用 RSA 认证
    RSAAuthentication yes 
    #启用公钥私钥配对认证方式
    PubkeyAuthentication yes 
    #公钥文件路径（和上面生成的文件同）
    AuthorizedKeysFile .ssh/authorized_keys 
    #root能使用ssh登录
    PermitRootLogin yes 
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/00df6dab3070fb66ace865c6d43990d4.png)

重启ssh：

	service ssh restart

### PyCharm配置
- 需要注意的是，PyCharm必须是专业版。

首先随便打开一个工程，然后在File->Settings->Project->Python Interpreter->Add->On SSH
选择On SSH
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/8ef6b173aac0aa5d3f9f98fda6ea3503.png)
使用127.0.0.1（默认）连接本地docker容器，端口号为启动时设置的8022
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/4a60db300ba73ceb7f70b5d1ef043f53.png)
输入密码，密码为刚刚设置的密码
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/5d775d0216ee7a6be61d7f10e4f1623b.png)

![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/9ae745c911dd5b5aa9c776a4ec7b43f2.png)
这里要注意，在环境选取处选择Existing，并且将Interpreter设置为/usr/bin/python
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/6ea9ceea24e269773b779b0a0708b474.png)
正确添加环境后会加载环境中的配置，如下（环境加载会花费一些时间）
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/b60eaa4c6f42d87a96cee223f5bd8ebb.png)
到此就连接完成了，测试一下
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/654b33763f85f173b80d04ecb1cad165.png)
容器进行配置后，注意保存容器为新的镜像。
### 后记
后面重新打开容器时，可能会显示无法连接，这时重启一下ssh即可。

	service ssh restart
	sudo service ssh status
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/e1c8a61d6aeab4a5f907250928e39970.png)

## 参考文章
docker部分：[苏洋博客](https://soulteary.com/2022/06/21/building-a-cost-effective-linux-learning-environment-on-a-laptop-the-basics.html#%E6%9B%B4%E7%AE%80%E5%8D%95%E7%9A%84-docker-%E5%AE%89%E8%A3%85)等。
nvidia docker部分：[nvidia-smi报错](https://blog.csdn.net/sazass/article/details/116074288)，[nvidia docker整体安装](https://zhuanlan.zhihu.com/p/616208372?utm_id=0)等。
配置调用部分：[pycharm使用docker容器开发](https://gitcode.csdn.net/65ec52c91a836825ed79871d.html?dp_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTEzNDY5MSwiZXhwIjoxNzE2MjgxODA5LCJpYXQiOjE3MTU2NzcwMDksInVzZXJuYW1lIjoicXFfMzk1OTQyNDYifQ.IVx7zmlDAxkaNtFJUSdA7ZS4O208JN0lrPsjT8UHNrc)，[pycharm远程访问docker容器](https://blog.csdn.net/weixin_44533869/article/details/119891809)等。



