import * as core from '@actions/core';
import fetch from 'node-fetch';

async function run() {
    try {
        // Read inputs
        const apiToken = core.getInput('api-token', { required: true });
        const testId = core.getInput('test-id', { required: true });
        const duration = core.getInput('duration', { required: false }) || 5; // Default to 5 minutes if not specified
        
        // Construct the API endpoint URL according to v2 API
        const url = 'https://app.loadforge.com/api/v2/run';
        core.info(`Triggering LoadForge test with ID: ${testId} for ${duration} minutes`);
        
        // Trigger the test run
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                test_id: parseInt(testId, 10),
                duration: parseInt(duration, 10)
            })
        });
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(`Failed to trigger LoadForge test: ${data.error || response.statusText}`);
        }
        
        core.info(`Test triggered successfully: ${JSON.stringify(data)}`);
        core.info(`Monitor your test run at: https://app.loadforge.com/run/monitor/${data.result_id}`);
        core.setOutput('run_id', data.result_id);
        core.setOutput('monitor_url', `https://app.loadforge.com/run/monitor/${data.result_id}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
