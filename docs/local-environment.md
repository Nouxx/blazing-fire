# Local

This project runs entirely locally using Docker. The `compose.yaml` file located at the root defines all services for the monorepo applications.

## Docker architecture

This project uses a monorepo structure with a root `node_modules` folder and additional `node_modules` folders in nested directories.

Each `node_modules` directory (containing all dependencies) must be installed both on the host and in the Docker images/containers. Dependencies are installed during the image build, and dedicated volumes are mounted with the containers to prevent conflicts between the `node_modules` folders in the images and on the host.

![docker architecture with node modules](assets/img/generated/docker-architecture.svg)

This approach offers maximum flexibility, allowing local dependencies tailored to your host OS (macOS, Windows, Linux) without mounting them within the development containers, which contain dependencies suited to the Docker base image (usually Linux).

The drawback is that any changes to the dependencies (in `package.json` and `package-lock.json`) require rebuilding the base images.
