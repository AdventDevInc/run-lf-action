# LoadForge Start Run GitHub Action

This GitHub Action allows you to trigger [LoadForge](https://loadforge.com) load tests directly from your GitHub Actions workflow.

## Usage

```yaml
- name: Run LoadForge Test
  uses: AdventDevInc/run-lf-action@v1
  with:
    api-token: ${{ secrets.LOADFORGE_API_TOKEN }}
    test-id: 123
    duration: 5  # Optional, defaults to 5 minutes
```

## Inputs

| Name | Description | Required | Default |
|------|-------------|----------|---------|
| `api-token` | Your LoadForge API Token | Yes | N/A |
| `test-id` | The ID of the LoadForge test to trigger | Yes | N/A |
| `duration` | Duration of the test run in minutes (2-720) | No | 5 |

## Outputs

| Name | Description |
|------|-------------|
| `run_id` | The ID of the created LoadForge run |
| `monitor_url` | The URL to monitor the LoadForge run (https://app.loadforge.com/run/monitor/{run_id}) |

## Example Workflow

```yaml
name: Performance Testing

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  loadtest:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Deploy to staging
        # Your deployment step here
      
      - name: Run LoadForge Test
        id: loadforge
        uses: AdventDevInc/run-lf-action@v1
        with:
          api-token: ${{ secrets.LOADFORGE_API_TOKEN }}
          test-id: 123
          duration: 10
      
      - name: Print Run ID and Monitor URL
        run: |
          echo "LoadForge Run ID is ${{ steps.loadforge.outputs.run_id }}"
          echo "Monitor your test run at: ${{ steps.loadforge.outputs.monitor_url }}"
```

## License

MIT
