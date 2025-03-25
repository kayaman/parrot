# Parrot

A simple microservice application distributed via GitHub Container Registry and Helm.

## Development

### Prerequisites

- Docker
- Node.js 18+
- Kubernetes cluster (for testing)
- Helm 3

### Local Development

1. Clone the repository:

```bash
git clone git@github.com:kayaman/parrot.git
cd parrot
```

2. Install dependencies:

```bash
cd service
npm install
```

3. Run locally:

```bash
npm run start
```

4. Build Docker image:

```bash
docker build -t kayaman/parrot .
docker run -p 3000:3000 kayaman/parrot
```

### Deployment

#### Using Helm

1. Add the Helm repository:

```bash
helm repo add parrot https://kayaman.github.io/parrot
helm repo update
```

2. Install the chart:

```bash
helm install parrot-service parrot/parrot
```

3. Customize the installation:

```bash
helm install parrot-service parrot/parrot \
  --set replicaCount=3 \
  --set service.type=LoadBalancer
```

## Configuration

See [values.yaml](helm/values.yaml) for configuration options.

## Usage Examples

### Basic Installation

```bash
# Add the Helm repository
helm repo add parrot https://kayaman.github.io/parrot
helm repo update

# Install with default configuration
helm install parrot-service parrot/parrot
```

### Production Configuration

For production deployments, you should use a specific version and increase the replica count:

```bash
helm install parrot-service parrot/parrot \
  --set image.tag=v1.0.0 \
  --set replicaCount=3 \
  --set resources.requests.memory=128Mi \
  --set resources.limits.memory=256Mi
```

### Exposing with LoadBalancer

To make the service accessible from outside the cluster:

```bash
helm install parrot-service parrot/parrot \
  --set service.type=LoadBalancer
```

### Scaling the Deployment

To scale an existing deployment:

```bash
kubectl scale deployment parrot-service-parrot --replicas=5
```

Or update the Helm release:

```bash
helm upgrade parrot-service parrot/parrot \
  --set replicaCount=5
```

## Manual Testing

You can manually test the deployment using port-forwarding:

```bash
# Forward the service port to your local machine
kubectl port-forward svc/parrot-service-parrot 3000:3000

# Test the service
curl http://localhost:3000/path/to/nowhere?q=abc
```

## Implementation Notes

This simplified distribution strategy includes:

1. **Single Microservice**: A basic Express.js service that provides a simple REST API
2. **Basic Helm Chart**: Includes deployment, service, and common Kubernetes configurations
3. **GitHub Actions Workflows**:
   - Container image build and publication to GHCR
   - Helm chart packaging and release via GitHub Pages
4. **User-friendly Documentation**: Simple installation and configuration instructions

## License

This project is licensed under the MIT License..
