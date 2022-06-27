# kubernates nginx testing

## 1. create configmap
```
kubectl create configmap nginx-config --from-file=nginx.conf
configmap/nginx-config created
```
查看configmap nginx-config已经创建
```
kubectl get configmap
NAME               DATA   AGE
kube-root-ca.crt   1      7d
nginx-config       1      6s
```

## 2. 创建deployment和service
可在nginx-deployment.yaml中配置 nginx.conf 、index.html的挂载路径
```
kubectl create -f nginx-deployment.yaml
kubectl create -f service-nginx-nodeport.yaml
```

## 3. 访问ngixn
如果使用minikube，可以使用下面的命令暴露servcie对外地址访问：
```
minikube service nginx-node-port --url
```
否则可直接 http://<服务器地址>:<nodeport>/ 访问


## uninstall
kubectl delete configmap nginx-config
kubectl delete -f nginx-deployment.yaml 
kubectl delete -f service-nginx-nodeport.yaml


## 验证
```
curl localhost:30080

curl -X POST -H 'Content-Type: application/json' -d '{"context":{"username":"luoji"}, "subject": "users:manager","action" : "delete", "resource": "resources:users"}' http://localhost:30080/api/
```

