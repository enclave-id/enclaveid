SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)

AUX_CONTAINERS_DIR="$SCRIPT_DIR/../k8s/aux_containers"
AUX_CONTAINERS="$(find "$AUX_CONTAINERS_DIR" -name Dockerfile | sed 's|/Dockerfile||' | xargs -n 1 basename)"

VERSION=latest

for container in $AUX_CONTAINERS; do
  docker build -t docker.io/enclaveid/"$container":"$VERSION" "$AUX_CONTAINERS_DIR/$container" &
done
wait

for container in $AUX_CONTAINERS; do
  docker push docker.io/enclaveid/"$container":"$VERSION" &
done
wait
