# 使用一个基础的Node.js镜像
FROM node:16.15.1

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install 

# 复制所有文件到工作目录
COPY . .

# 构建Vue项目
RUN npm run build

# 设置容器的启动命令
CMD ["npm", "run", "dev"]