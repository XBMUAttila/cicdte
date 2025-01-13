readme

microk8s kubectl create secret docker-registry dockerhub-secret --docker-username=frankfromcn --docker-password=dckr_pat_SZs8-977Wrws3WEg0gCzR6ZQbrg --docker-server=https://index.docker.io/v1/ && microk8s kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name":"dockerhub-secret"}]}'
