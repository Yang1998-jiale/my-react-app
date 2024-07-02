###
 # @Author: yjl
 # @Date: 2024-07-02 14:25:03
 # @LastEditors: yjl
 # @LastEditTime: 2024-07-02 15:29:47
 # @Description: 描述
### 


docker build -t my-react-app .

# docker run --name my-react-app -d -p   
docker run -p 7777:7777 -d my-react-app