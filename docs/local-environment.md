# Local

This project run locally 100% with Docker. At the root compose.yaml is defined all the services for all the app of the monorepo.

## Docker architecture

This project is a monorepo with a node_modules folder at the root and multiples others node_modules folders in nested directories.

Every node_modules directory (with all the dependencies) should be installed in the host AND in the docker images/container. Dependencies are installed in the image build and dedicated volumes are mounted with the containers so that the node_modules folder from the images does not collide with the node_modules from the host.

![docker architecture with node modules](assets/img/generated/docker-architecture.svg)

This provides maximum flexibility since it allows to have locally the dependencies that fits your host OS (macOS, Windows, Linux...) without mounting them within the dev containers, that have the dependencies that fits the Docker base image (Linux usually).

The downside is that every time there is a change in the dependencies (package.json, package-lock.json) the base images must be rebuilt.