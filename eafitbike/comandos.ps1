docker build -t sanalvarezmun/eafitbike:v12 .
docker image ls
docker run -d -it -p 8081:80 sanalvarezmun/eafitbike:v12