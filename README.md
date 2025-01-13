readme

root@vmi2366859:~# microk8s kubectl create secret docker-registry dockerhub-secret --docker-username=frankfromcn --docker-password=dckr_pat_SZ
s8-977Wrws3WEg0gCzR6ZQbrg --docker-server=https://index.docker.io/v1/
secret/dockerhub-secret created
root@vmi2366859:~# kubectl patch serviceaccount default \
 -p '{"imagePullSecrets": [{"name": "my-registry-secret"}]}'
Command 'kubectl' not found, but can be installed with:
snap install kubectl
root@vmi2366859:~# microk8s kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "my-registry-secret"}]}'
serviceaccount/default patched
root@vmi2366859:~#
