import * as core from '@actions/core';
import fetch from 'node-fetch';

console.log('Testing LoadForge GitHub Action dependencies');
console.log('Core version:', core.issueCommand ? 'Working' : 'Not working');
console.log('Fetch version:', fetch.name === 'fetch' ? 'Working' : 'Not working');
