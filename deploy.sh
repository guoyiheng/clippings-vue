# cd /var/lib/jenkins/workspace/clippings-vue #进入Jenkins工作空间下hxkj项目目录
node -v #检测node版本（此条命令非必要）
npm -v #检测npm版本（此条命令非必要）
npm config set registry https://registry.npm.taobao.org #把npm源设置为淘宝源（这个你懂的）
npm config get registry #检测npm是否切换成功（此条命令非必要）

npm install #安装项目中的依赖
npm run build #打包

# node oss-deploy.js #配置oss后打开该行

APP_NAME="kindle.gyh.cool"
dstr=`date +%Y-%m-%d-%H-%M-%S`

mv /var/lib/jenkins/workspace/${APP_NAME}/dist /usr/local/openresty/nginx/html/${APP_NAME}-${dstr}
rm -rf /usr/local/openresty/nginx/html/${APP_NAME}
ln -s /usr/local/openresty/nginx/html/${APP_NAME}-${dstr} /usr/local/openresty/nginx/html/${APP_NAME}
