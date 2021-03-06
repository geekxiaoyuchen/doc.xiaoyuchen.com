# 《精通Yii框架》
## 项目概述
### （一）灵感来源
近段时间，一直在学习Yii框架，读了一些英文资料，其中有一本[《Mastering Yii》](https://www.masteringyii.com)，写的非常棒，所以想把这本书翻译成中文，算是自己阅读学习笔记，也可以帮到更多的中文Yii开发者。


### （二）翻译原则
1. 忠实原文
2. 结合自己经验，采用更加易懂的语言
3. 尽量给多一些拓展资源
4. 记录自己在学习中遇到的问题
5. 结合自己正在开发的项目，给出实战的例子

### （三）写作时间
因为是业余时间做这件事，所以，更新的频率不会高，初步定为每周更新1个小节，后面如果时间允许可以加快速度。

## 第1章:Composer,配置,类,路径别名

在正式开始学习Yii框架之前，我们需要先来看看Yii是如何安装，如何配置，核心构建模块有哪些。在这章，我们将讨论如何安装Yii框架并且通过一个叫Composer的包管理工具来构建应用。我们还将讨论一些Yii2和Web服务器通用的配置，包括配置应用程序运行环境等。

### (一)Composer

我们可以通过多种方式安装Yii2框架，包括从版本控制工具下载安装包（通常，使用[GitHub](https://github.com/ yiisoft/yii2)，或者使用包管理工具：Composer。Composer可以帮助我们自动化安装、更新、管理依赖与扩展，因此，从现代Web应用的角度说，推荐使用Composer来安装Yii2。此外，通过Composer，我们可以确保Yii2能够及时更新最新版和Bug修正。可以通过以下的命令来安装[Composer](https://getcomposer.org)

```bash
curl -sS https://getcomposer.org/installer | php
```
如何你没有安装cURL，你也可以使用PHP来安装Composer，命令如下：

```bash
php -r "readfile('https://getcomposer.org/installer');" | ph
```
安装完成之后，你应该将Composer移动到主目录（拥有全局权限），以便我们可以在任何文件夹下使用它。因为这么做可以获取以下几点好处：


* 任何项目均可调用。当在多个项目工作时，我们可以确保使用同样的依赖管理。

* 安装在主目录，Composer只需要更新一次而不需要在每个项目目录里更新。

* 依赖管理很少需要被当作需要提交到版本仓库的代码。只需要将Composer.phar排除在代码仓库之外，确保我的代码独立于包管理代码。

* 将Composer安装在主目录，我们可以保证Composer总是可以被使用，这样可以节省每次克隆依赖于Composer项目的时间。

把Composer移动到/usr/local/bin主目录，可以实现以上几点好处，命令如下：
```bash
mv composer.phar /usr/local/bin/composer
chmod a+x /usr/local/bin/composer
```
此外，如果你已经安装Composer，可以通过下面这条命令保持Composer更新到最新版本。
```bash
composer self-update
```
Composer安装之后，我们需要安装一个叫[Composer Asset Plugin](https://github.com/francoispluchino/)的全局插件。这个插件帮助我们自动下载管理资源，而不用每个都下载安装（比如Bower，一个Twitter创建的资源依赖管理，NPM，一个Javascript依赖管理）
```bash
composer global require "fxp/composer-asset-plugin:1.0.0"
```
Composer安装后，我们现在可以创建就应用。如果我们想安装Yii2包，只需要简单运行如下命令：
```bash
composer create-project --prefer-dist <package/name> <foldername> 
```
例如我们想安装Yii2 Basic（Yii2分为Basic和Advanced两种）应用，可以输入以下命令：
```bash
composer create-project --prefer-dist yiisoft/yii2-app-basic basic 
```
输入命令后，我们应该会得到下面的输出：

```bash
Installing yiisoft/yii2-app-basic (2.0.6)
  - Installing yiisoft/yii2-app-basic (2.0.6) 

Downloading: 100%
Created project in basic
Loading composer repositories with package information
Installing dependencies (including require-dev)
- Installing yiisoft/yii2-composer (2.0.3)
  - Installing ezyang/htmlpurifier (v4.6.0)
  - Installing bower-asset/jquery (2.1.4)
  - Installing bower-asset/yii2-pjax (v2.0.4)
  - Installing bower-asset/punycode (v1.3.2)
  - Installing bower-asset/jquery.inputmask (3.1.63)
  - Installing cebe/markdown (1.1.0) 

 - Installing yiisoft/yii2 (2.0.6)
  - Installing swiftmailer/swiftmailer (v5.4.1)
  - Installing yiisoft/yii2-swiftmailer (2.0.4)
  - Installing yiisoft/yii2-codeception (2.0.4)
  - Installing bower-asset/bootstrap (v3.3.5)
  - Installing yiisoft/yii2-bootstrap (2.0.5)
  - Installing yiisoft/yii2-debug (2.0.5)
  - Installing bower-asset/typeahead.js (v0.10.5)
  - Installing phpspec/php-diff (v1.0.2)
  - Installing yiisoft/yii2-gii (2.0.4)
  - Installing fzaninotto/faker (v1.5.0)
  - Installing yiisoft/yii2-faker (2.0.3) 

Writing lock file
Generating autoload files
> yii\composer\Installer::postCreateProject
chmod('runtime', 0777)...done.
chmod('web/assets', 0777)...done.
chmod('yii', 0755)...done.
```
这行命令会在basic文件夹下安装Yii2 Basic应用。创建Yii2项目时，经常会使用create-porject命令来克隆"yii2-app-basic"，在这个Basic应用的基础上可以快速的开发自己的应用。当然，你也可以使用该命令创建更为复杂的Yii2应用，这样你可以更好的控制应用结构。

让我们看一下执行create-project命令之后创建的composer.json内容：

```json
 {
   "name": "yiisoft/yii2-app-basic",
   "description": "Yii 2 Basic Application Template",
   "keywords": ["yii2", "framework", "basic",
   "application template"],
   "homepage": "http://www.yiiframework.com/",
   "type": "project",
   "license": "BSD-3-Clause",
   "support": { 

   "issues": "https://github.com/
           yiisoft/yii2/issues?state=open",
           "forum": "http://www.yiiframework.com/forum/",
           "wiki": "http://www.yiiframework.com/wiki/",
           "irc": "irc://irc.freenode.net/yii",
           "source": "https://github.com/yiisoft/yii2" 

 },
   "minimum-stability": "stable",
   "require": { 
   "php": ">=5.4.0",
           "yiisoft/yii2": "*",
           "yiisoft/yii2-bootstrap": "*",
           "yiisoft/yii2-swiftmailer": "*" 

 },
   "require-dev": { 

   "yiisoft/yii2-codeception": "*",
           "yiisoft/yii2-debug": "*",
           "yiisoft/yii2-gii": "*",
           "yiisoft/yii2-faker": "*" 

 },
   "config": { 
   		"process-timeout": 1800
   }, 

 "scripts": {
           "post-create-project-cmd": [ 

 "yii\\composer\\Installer::postCreateProject"
           ] 

}, "extra": {

 "yii\\composer\\Installer::postCreateProject": {
               "setPermission": [ 

 {
	 "runtime": "0777", 
	 "web/assets": "0777", 
	 "yii": "0755"
 } 

 ],
"generateCookieValidationKey": [ 

 "config/web.php"
               ] 

 },
           "asset-installer-paths": { 

 "npm-asset-library": "vendor/npm", 

 "bower-asset-library": "vendor/bower"
           } 

} }
```
大部分内容（例如name,description,license,require blocks)都很容易理解，有一些配置项我们需要关注，首先让我们来看看scripts部分：

```json
 "scripts": {
       "post-create-project-cmd": [ 
			 "yii\\composer\\Installer::postCreateProject"
			 ]
}
```

script告诉Composer，在使用create-project命令时，应该执行postCreateProject静态方法。查看框架源码，我们看到，这个文件指向[yii2-composer包](https://github.com/yiisoft/yii2-composer/blob/master/Installer.php#L232)，这条命令执行一些post-project创建动作，为composer-asset-plugin设置一些资源安装路径。

```json
 "extra": {
       "yii\\composer\\Installer::postCreateProject": { 
			 "setPermission": [
			    { 
 					"runtime": "0777",
                   	"web/assets": "0777",
                   	"yii": "0755"
				}],
			 "generateCookieValidationKey": [
			 		"config/web.php"
			  	] 

 },
			"asset-installer-paths": { 
		 	"npm-asset-library": "vendor/npm", 
		 	"bower-asset-library": "vendor/bower"
       } 

}
```

这个部分告诉Composer在执行postCreateProject命令时使用这些参数。这些预定义参加让我们创建应用程序时有一个好的开始。
　
<p class="tip">
译者说：此部分提前告诉我们Composer这个PHP最新加入的利器，他可以让PHP的开发更具有模块化。让代码复用变得可能，可以说，正是因为Composer的存在，才让PHP语言展现了新的魅力，让PHP开发者在Java等开发者面前扬眉吐气。
</p>

### (二)配置（Configuration）

我们的基础应用已经安装，现在来看一下Yii2为我们自动生成的基础配置和初始化文件。

#### 1. 检查依赖（Requirements checker）

Yii2为我们创建的基础应用项目包括一个内建的依赖检查脚本：requirements.php.该脚本帮助我们检查依赖以确认Yii2可以正常运行。在我们运行Yii应该之前，做运行这个依赖检查器脚本。
```php
php requirements.php
```
你会得出如下输出：

```bash
Yii Application Requirement Checker
This script checks if your server configuration meets the requirements
for running Yii application.
It checks if the server is running the right version of PHP,  if
appropriate PHP extensions have been loaded, and if php.ini file settings
are correct.
Check conclusion:
-----------------
PHP version: OK
[... more checks here ...]
-----------------------------------------
Errors: 0   Warnings: 6   Total checks: 21
```
通常情况下，只要错误数为0，我们就可以继续啦。如果提示错误，会在检查结论里直接输出错误报告。

#### 2. 入口脚本（Entry scripts）

像前一个版本，Yii2有两个单独的入口脚本，一个是Web应用程序，一个是控制台应用程序。

##### Web入口脚本（Web entry script）

在Yii2，Web应用程序入口脚本已经从root(/)根目录移至web/目录下。在Yii1中，PHP文件被放在protected/目录下。这样做，Yii2通过减少服务器的配置来增强应用程序的安全性。此外，所有公共资源文件已经和我们的源代码目录完全独立。打开web/index.php，我们的入口脚本现在是如下这个样子的：

```php
<?php

 // comment out the following two lines when deployed to production
 defined('YII_DEBUG') or define('YII_DEBUG', true);
 defined('YII_ENV') or define('YII_ENV', 'dev'); 

 require(__DIR__ . '/../vendor/autoload.php');
 require(__DIR__ . '/../vendor/yiisoft/yii2/Yii.php'); 

 $config = require(__DIR__ . '/../config/web.php');
 (new yii\web\Application($config))->run();
```
为了正确使用基础应用，当我们在不同的环境中部署应用时，入口脚本需要我们手动指定和修改。在一个非开发环境下修改代码不是一个好的实践做法，我们应该改动这些代码，以便我们在迁移不同环境时不需要再修改我们的业务代码。

我们从创建一个全局的常量APPLICATION_ENV开始。这个常量可以在Web应用程序或者控制台应用程序中定义，允许我们根据当前不同的工作环境来动态加载配置文件。

1.打开web/index.php中的php标签后，添加下面代码块：

```php
// Define our application_env variable as provided by nginx/apache/console
if (!defined('APPLICATION_ENV'))
{ 
	if (getenv('APPLICATION_ENV') != false)
		define('APPLICATION_ENV',getenv('APPLICATION_ENV')); 
	else
		define('APPLICATION_ENV', 'prod'); 
}
```
我们的应用现在知道如何从环境变量中读取APPLCATTION_ENV的值，这个变量值可以从命令行或者Web服务配置文件中传递过来。默认情况，如果没有环境变量设置，APPLCATTION_ENV被设置为prod。

接下来我们想加载一个单独的环境定义文件，它包含不同的环境常量，这样我们可以用来动态改变应用运行的方式。
```php
$env = require(__DIR__ . '/../config/env.php'); 
```
接下来，我们将根据该程序配置Yii文件，设置YII_DEBUG和YII_ENV变量。

```php
defined('YII_DEBUG') or define('YII_DEBUG', $env['debug']);
defined('YII_ENV') or define('YII_ENV', APPLICATION_ENV); 
```
<p class="warning">
尼妹啊，APPLICATION_ENV是个什么鬼，这玩意在哪里设置，别急，哥告诉你，这个是环境变量，在Apache或者Nigix的站点配置里设置哈，下面是具体的设置方法：
</p>

```bash
<VirtualHost *:80>
    ServerAdmin dev@xiaoyuchen.com
    DocumentRoot "/Users/xiaoyuchen/iCode/yii-basic/web"
    SetEnv APPLICATION_ENV dev
    ServerName b.yii
</VirtualHost>
```
2.然后，修改web/目录下的index.php文件：

```php
require(__DIR__ . '/../vendor/autoload.php');
require(__DIR__ . '/../vendor/yiisoft/yii2/Yii.php');

$config = require(__DIR__ . '/../config/web.php');

(new yii\web\Application($config))->run();
```
通过这些修改，我们的应用现在可以根据不同的运行环境，适当的加载配置文件啦。

<p class="danger">
  原书里丢掉了$config这个配置文件的载入，如果丢了这句，我们的程序是跑不起来的，切记！
</p>

#### 3. 配置文件（Configuration files）

在Yii2，配置文件也分为控制台和Web应用配置文件两种。因为这两种配置文件有很共同之处（例如数据库和环境配置），所以，我们将共同的元素存储在它们可共用的配置文件中。这既遵循DRY标准，也可以减少程序的重复代码。

##### 1.Web和控制台配置文件（Web and console con guration les）

Yii2支持两种不同的配置文件：一个用于Web应用程序，一个用于控制台应用程序。在Yii2中，Web应用配置文件存储在config/web.php中，控制台配置文件存储在config/console.php中。如果你对Yii1熟悉的话，你会发现这两种类型的配置文件结构都做了很大的改动。


##### 2.数据库配置（Database con guration）

接下来，我们来看下数据库配置文件config/db.php。这个文件包含需要连接数据库的信息，Web和控制台应用都可以使用。

在基础应用中，这个文件如下：
```php
<?php
 return [
	'class' => 'yii\db\Connection',
	'dsn' => 'mysql:host=localhost;dbname=yii2basic',
	'username' => 'root',
	'password' => '',
	'charset' => 'utf8', 
];
```
为了让应用敏感于开发环境，我们应该使用APPLICATION_ENV环境变量：

```php
<?php return require __DIR__ . '/env/' . APPLICATION_ENV .　'/db.php';
```
通过这个改变，我们的应用知道根据不同的环境变量读取db.php配置文件。

##### 3.参数配置（Parameter con guration）

和数据库配置一样，Yii也通过参数文件存储所有程序用到的非组件参数。

```php
<?php return require __DIR__ . '/env/' . APPLICATION_ENV . '/params.php';
```
##### 4.环境配置（Environment con guration）
Finally, we have the environment con guration that we de ned earlier when working with our entry scripts. We'll store this le in con g/env.php, and it should be written as follows:

最后，我们要设置之前定义的环境配置来配合我们的入口脚本。我们在config目录下建立env.php文件，内容如下：

```php
<?php return require __DIR__ . '/env/' . APPLICATION_ENV .'/env.php';
```
现代应用程序按需求来分有几种不同的环境。一般有四个独立的环境：

* 第一种环境是DEV。这是本地开发时的环境。开发者可以完全控制，修改和调试应用程序。
* 第二种环境是TEST。一般，应用于准产品测试。通过在这个环境下，还是会做高级别的日志和调试信息。
* 第三种环境是UAT。或者说是用户使用测试环境。这是给客户、投资人使用，用来验证产品是否是他们想要的。
* 第四种环境是PROD。这是最终部署到服务器中的生产环境。

如前面提到的，我们将所有配置文件存放在“config/env/<env>”文件夹下。所以，我们的环境将会设置为DEV，可以这样创建：

1.使用命令行创建DEV环境目录。

```bash
mkdir -p config/env/dev
```
2.下一步，我们在"config/env/dev/目录下设置数据库配置，这里我们设置一个基本的SQLit数据库。

```php
<?php return [
   'dsn' => 'sqlite:/' . __DIR__ .
   '/../../../runtime/db.sqlite', 
   'class' => 'yii\db\Connection',
   'charset' => 'utf8' 
 ];
```
3.下一步，我们设置env.php文件。而debug也是在这里设置的。内容如下：

```php
<?php return [
   'debug' => true 
];
```
4.最后，我们创建param.php文件，这里只需要简单的返回一个空数组即可。

```php
<?php return [];
```

现在，为了简便，我们可以将DEV的配置文件直接复制到其他环境下，可以使用如下的命令：

```bash
cp –R config/env/dev config/env/test
cp –R config/env/dev config/env/uat
cp –R config/env/dev config/env/prod
```
#### 4.配置应用环境变量

现在，我们需要告诉Yii我们当前的环境。可以在Web服务器配置文件中设置这些选项。

##### NGINX服务器配置

```bash
 location ~ \.php$ {
   include fastcgi_params; 
   fastcgi_param SCRIPT_FILENAME $document_root/
   $fastcgi_script_name;
   fastcgi_pass   127.0.0.1:9000;
   #fastcgi_pass unix:/var/run/php5-fpm.sock;
   try_files $uri =404; 
　　fastcgi_param APPLICATION_ENV "dev";

}
```
修改之后，重启NGINX即可。

##### Apache服务器配置

```bash
<VirtualHost *:80>
    ServerAdmin dev@xiaoyuchen.com
    DocumentRoot "/Users/xiaoyuchen/iCode/yii-basic/web"
    SetEnv APPLICATION_ENV dev
    ServerName b.yii
</VirtualHost>
```
修改之后，重启Apache即可。

通过以上这些配置，我们的应用程序更加灵活与健壮，在后面的学习中，你会看到这些配置将大大简化我们部署的程序。

### (三)组件和对象
有两个牛B闪闪的类，几乎Yii2所有的类都是继承这两个类，它们是Component和Object。

#### 1.组件

Yii2使用Component类取代Yii1中的CComponent类。在Yii1中，组件充当定位器作用，用来提供不同的处理请求的服务。在Yii2中，每个组件可以使用下面的语法来访问：

```php
Yii::$app->componentID 
```
例如，数据库组件可以这样来访问：

```php
Yii::$app->db 
```
缓存组件可以这样来访问：

```php
Yii::$app->cache 
```

Yii2在运行时，通过应用程序配置文件中的名称来自动注册每个组件。

为了提高性能，Yii2组件使用懒加载模式，也就是说当第一次被访问时才会被加载。这就是说，如果缓存组件没有在你的代码中使用，那么这个组件就不会被加载到内存。有些时候，这个模式是非理想的，所以，强制加载一个组件，你可以通过bootstrap配置项来添加需要初始化的组件，可以在config/web.php或者config/console.php中进行配置。例如，我们想初始化日志组件，我们可以这样来配置：

```php
<?php return [
	'bootstrap' => [ 
	'log' ],
	[...] 
]
```
bootstrap选项类似于Yii1中的预加载项。所有出现在这里的组件都会第一时间被加载，而不论是否会被用到。


#### 2.对象
在Yii2中，几乎所有的类，除了继承自Component类之外，都是继承自Object类。Object类实现了一些基础属性。在Yii2中，属性可以访问许多关于类的信息。例如：__get和__set魔术方法，还有工具函数，如hasProperty(),canGetProperty(),canSetProperty().这使得Yii2中的类异常强大。

### (四)路径别名
在Yii2中，路径别名用来代表文件路径或者URL路径，我们不用硬编码路径在代码里。在Yii2中，别名总是使用@符号开始，Yii以此和其他路径和URL区别开来。

别名有多种定义方式。在简单的方法是调用\\Yii::setAlias():

```php
\\Yii::setAlias('@path', '/path/to/example');
\\Yii::setAlias('@example, 'https://www.example.com'); 
```
别名还可以在应用配置文件中的aliases选项中定义：

```php
return [
// ... 
'aliases' => [
   '@path => '/path/to/example,
   '@example' => 'https://www.example.com', 
], ];
```
使用Yii::getAlias()可以方便的调取到别名的值。

```php
\\Yii::getAlias('@example') // returns https://www.example.com
```
Yii2在很多地方可以识别路径别名。例如：yii\caching\FileCache能够识别$cachePath参数：

```php
$cache = new FileCache([
   'cachePath' => '@runtime/cache', 
]);
```
### (五)小结
在这章，我们学习了如何通过composer创建Yii应用程序。又学习了基础配置文件，如何配置Web应用程序，并且设置环境配置文件。最后，我们还学习组件、对象、路径别名，这些都是掌握Yii框架的基础知识。

在下一章，我们将会继续学习控制台命令行和应用程序。

## 第2章:控制命令行和应用程序

在构建现代Web应用程序时，我们需要写一些后台任务来支持主应用程序。这些任务包括生产报告，发送邮件，或者web端数据分析。通过Yii2，我们通过控制命令行或者控制台应用程序来构建这些工具。

### (一)配置及用法

Yii2控制台应用程序和Web应用程序的结构非常相似。在Yii2，控制台命令行继承自yii\console\Controller，与yii\web\Controller一样。

#### 1. 入口脚本

在进入配置文件之前，我们先来看看控制入口脚本，它写在yii文件中。这个入口脚本是所有控制台命令行的初始化代码，通常来说，可以使用如下命令调用这个脚本：

```bash
$ ./yii
```
这个命令会输出系统所有现有变量。类似web/index.php入口脚本，但是，还未能识别环境。我们可以使用如下代码修改yii文件：

```bash
#!/usr/bin/env php
```
```php
<?php
/** 
 * Yii console bootstrap file.
*/ 

// Define our application_env variable as provided by nginx/apache 

if (!defined('APPLICATION_ENV'))
{ 
	if (getenv('APPLICATION_ENV') != false)
		define('APPLICATION_ENV', getenv('APPLICATION_ENV')); 
	else
		define('APPLICATION_ENV', 'prod'); 
}

$env = require(__DIR__ . '/config/env.php');
defined('YII_DEBUG') or define('YII_DEBUG', $env['debug']); 

// fcgi doesn't have STDIN and STDOUT defined by default
defined('STDIN') or define('STDIN', fopen('php://stdin', 'r'));
defined('STDOUT') or define('STDOUT', fopen('php://stdout', 'w')); 

require(__DIR__ . '/vendor/autoload.php');
require(__DIR__ . '/vendor/yiisoft/yii2/Yii.php'); 

$config = require(__DIR__ . '/config/console.php'); 

$application = new yii\console\Application($config);
$exitCode = $application->run();
exit($exitCode);
```
这样，我们就搞定了入口脚本配置文件。下面我们来看看应用程序配置文件。

#### 2. 配置

在Yii2，控制台配置文件位于config/console.php文件中，这与我们的web配置文件类似。

```php
<?php

Yii::setAlias('@tests', dirname(__DIR__) . '/tests'); 

return [
       'id' => 'basic-console',
       'basePath' => dirname(__DIR__),
       'bootstrap' => ['log'],
       'controllerNamespace' => 'app\commands',
       'components' => [ 

'cache' => [
       'class' => 'yii\caching\FileCache', 
],
'log' => [
 	'targets' => [
                 	[
						'class' => 'yii\log\FileTarget', 

 						'levels' => ['error', 'warning'],
                    ], 
], ],

 'db' => require(__DIR__ . '/db.php'),
       ], 
 'params' => require(__DIR__ . '/params.php'),
   ];
```
像我们的Web配置文件，我们可以包含数据库和参数配置文件，使用第1章环境敏感的配置，Composer，Configuration，Classess，和Path Aliases.事实上，web和控制台配置文件的主要不同是明白声明控制台命名空间和@test别名，这指名了测试文件的位置。

#### 3. 设置控制台环境变量
按照Web应用程序的惯例，我们要设置APPLICATION_ENV环境变量。在命令行，我们可以通过如下命令来设置环境变量。

```bash
export APPLICATION_ENV="dev"
```
使用如下命令来测试是否设置成功：

```bash
echo $APPLICATION_ENV 
```
如果设置成功，你会在屏幕上得到如下输出。

```bash
dev
```
#### 4. 运行控制台命令

现在我们的控制台应用程序已经配置好，我们要以简单的通过如下命令来执行控制台应用：

```bash
$ ./yii
```
如果你对Yii1熟悉的话，这条命令现在已经替换了/yiic。没有任何参数，使用/yii help可以获得帮助菜单，列出所有内建的控制台命令。

```bash
$ ./yii
```
Yii为每个默认命令提供帮助。例如，如果我们想看缓存里的子命令，我们可以使用下面的命令：

```bash
$ ./yii help cache
```
通常来说，我们可以使用如下Yii控制台模式：

```bash
$ ./yii <route> [--option1=value1 --option2=value2 ... argument1 argument2 ...] 
```
这里，<route>指明了希望运行的控制器和方法。例如如果我们想清空控制台的缓存，我们可以运行如下命令：

```bash
$ ./yii cache/flush-all
```
这会输出如下内容：

```bash
The following cache components were processed:

* cache (yii\caching\FileCache) 
```
./yii命令也允许我们使用如下命令来实现同样的功能：

```bash
$ ./yii <route> --appconfig=path/to/config.php 
```
不需要我们修改任何代码，我们可以简单的指导Yii使用配置文件，包含了一切，引用另外的数据库或缓存，或者做更复杂的如不同的控制器命名空间。这个选项在我们创建既有前端又有后端应用程序，需要切换不同数据库时会非常有用。

### (二)内建控制命令行
### (三)创建控制命令行
### (四)小结

