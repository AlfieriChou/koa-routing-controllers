.PHONY: build clean tag rebuild start remove update
#################################
RUN = docker exec
imageID = docker images 'koa-routing-controller' | uniq
time = $(shell date +"%Y-%M-%d-%H-%M-%S")
image = "alfierichou/koa-routing-controller"

build:
	@docker build -t koa-routing-controller .

clean:
	@echo "clean this docker image..."
	@docker rmi --force $(imageID)

tag:
	@echo "tag this docker image..."
	@docker tag $(image) $(image):$(time)
	@docker push $(image):$(time)

rebuild:
	@make clean
	@make build

#################################
start:
	@docker run --name api-node-ts -d \
		-p 3000:3000 \
		--hostname api-node-ts \
		koa-routing-controller \
		npm start

remove:
	@docker stop api-node-ts
	@docker rm api-node-ts

update:
	@make remove
	@make clean
	@git pull origin master
	@make build
	@make start
