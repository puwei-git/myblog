---
title:   LLMs踩坑集
aliases: 
tags:
  - AI
date:  2025-03-09T22:42:05+08:00
lastmod: 
draft: true
---

### Huggingface遇到 Couldn‘t reach xxx on the Hub (ConnectionError)解决方法
- 问题描述：无法访问huggingface下载模型和数据

#### 方法1：
``` python
import  os
os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'
```
注：可以下载模型及数据，但有时有些慢

#### 方法2：
直接下载huggingface文件，放到缓存里面
Linux缓存位置一般为：/home/puwei/.cache/huggingface/或/root/.cache/huggingface/
下载方法：

```bash
git clone https://huggingface.co/datasets/数据集名称
# 或
git clone https://hf-mirror.com/datasets/数据集名称

# 然后使用
ds_raw =datasets.load_dataset("opus_books")  # 此时的路径为本地路径，即上面下载文件的路径
```
