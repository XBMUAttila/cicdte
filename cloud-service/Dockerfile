FROM node:22-bookworm

# 设置工作目录
WORKDIR /home

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .
RUN npm run build

# 暴露应用端口
EXPOSE 3000

# 启动应用
CMD ["npm", "start"]
