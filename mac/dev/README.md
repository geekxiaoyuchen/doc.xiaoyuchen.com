# 我的Mac开发环境

作为一名程序猿，你需要配置好自己的工具。我使用的是一台Mac Book Pro 2016款，至于要不要买Mac，我在个人微信公众号文章里就这个问题进行过讨论。

但入手一台Mac，如果不把它的功能发挥到极致，那真对不起当初花的那个银子。所以，我写这个专题一是为了自己总结Mac配置方面的技巧，二来也可以帮助到更多入手Mac而没有使用高级功能的小伙伴。

这个专题，我会迭代构建，暂时还没有想好使用什么样的框架，先写一篇文章放着，后面思考成熟了会再次更新！

Happy Hacking ~:P

## Mac中如何设置环境变量？

1. 首先要知道你使用的Mac OS X是什么样的Shell，使用命令
echo $SHELL
如果输出的是：csh或者是tcsh，那么你用的就是C Shell。
如果输出的是：bash，sh，zsh，那么你的用的可能就是Bourne Shell的一个变种。
Mac OS X 10.2之前默认的是C Shell。
Mac OS X 10.3之后默认的是Bourne Shell。
 
2. 如果是Bourne Shell。
那么你可以把你要添加的环境变量添加到你主目录下面的.profile或者.bash_profile，如果存在没有关系添加进去即可，如果没有生成一个。
 
Mac配置环境变量的地方
 1. /etc/profile   （建议不修改这个文件 ）
 全局（公有）配置，不管是哪个用户，登录时都会读取该文件。
 2. /etc/bashrc    （一般在这个文件中添加系统级环境变量）
 全局（公有）配置，bash shell执行时，不管是何种方式，都会读取此文件。
 3. ~/.bash_profile  （一般在这个文件中添加用户级环境变量）
 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!
 
MAC 修改host文件 
```bash
sudo vi /etc/hosts
```
但是一般不建议这么做，作为一名开发者，我一直使用iHost这个软件，可以非常方便的修改host文件。
![iHost{100,100}](http://cdn.xiaoyuchen.com/blog/2017-10-01-060355.jpg?imageView2/1/w/400)

linux下查看和添加PATH环境变量

PATH的格式为：
```bash
PATH=$PATH:<PATH 1>:<PATH 2>:<PATH 3>:------:<PATH N>，中间用冒号隔开。
```

添加PATH环境变量：

```bash
[root@localhost u-boot-sh4]#export PATH=/opt/STM/STLinux-2.3/devkit/sh4/bin:$PATH
```
查看PATH环境变量：

```bash
[root@localhost u-boot-sh4]#echo $PATH
/usr/kerberos/sbin:/usr/kerberos/bin:/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin:/root/bin
```
 操作示例：

通过编辑 启动文件 来改PATH，
```bash
vim /etc/profile
```
在文档最后，添加:
```bash
export PATH="/opt/STM/STLinux-2.3/devkit/sh4/bin:$PATH"
```
保存，退出。

想立即生效请运行：
```bash
source /etc/profile
```
不报错则成功。
 
如果想立刻生效，则可执行下面的语句：
```bash
source .bash_profile（这是文件名）
```
环境变量更改后，在用户下次登陆时生效。