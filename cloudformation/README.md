```bash
docker run \
  -it \
  --rm \
  -v "$(pwd):/var/task" \
  --env AWS_ACCESS_KEY_ID=id \
  --env AWS_SECRET_ACCESS_KEY=secret \
  --env SAM_CLI_TELEMETRY=0 \
  public.ecr.aws/sam/build-nodejs20.x:latest
```

```bash
sam build --config-file samconfig-production.toml && \
sam deploy --config-file samconfig-production.toml
```