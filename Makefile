###############################
RUN = docker exec

build:
	@docker build -t koa-routing-controller .

clean:
	@echo "clean this docker image..."
	@docker rmi $(docker images |grep 'koa-routing-controller')

rebuild:
	@make clean
	@make build

################################
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
