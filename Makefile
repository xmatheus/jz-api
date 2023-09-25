include .env

.PHONY: up

up:
	docker-compose up --build -d --remove-orphans

.PHONY: up-dev

up-dev:
	docker-compose -f docker-compose-dev.yml up --build -d --remove-orphans

.PHONY: down

down:
	docker-compose down

.PHONY: logs

logs:
	docker-compose logs -f