#!/usr/bin/env node
/**
 * Script to generate repositories.json from GitHub API
 * Run by GitHub Actions automatically
 */

const fs = require('fs');
const path = require('path');

const GITHUB_USERNAME = 'Ibrahim-Nidam';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN environment variable is not set!');
  process.exit(1);
}

const headers = {
  'Authorization': `token ${GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'Portfolio-Generator'
};

async function fetchAllRepositories() {
  try {
    console.log('🚀 Starting repository fetch...');
    const allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const url = `${GITHUB_API_URL}?per_page=100&page=${page}&sort=updated`;
      console.log(`📄 Fetching page ${page}...`);
      
      const response = await fetch(url, { headers });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const repos = await response.json();
      
      if (!Array.isArray(repos) || repos.length === 0) {
        hasMore = false;
        break;
      }

      allRepos.push(...repos);
      page++;
    }

    console.log(`✅ Fetched ${allRepos.length} repositories`);
    return allRepos;
  } catch (error) {
    console.error('❌ Error fetching repositories:', error.message);
    throw error;
  }
}

async function fetchLanguagesForRepo(repoName) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      { headers }
    );
    
    if (!response.ok) return [];
    
    const languages = await response.json();
    return Object.keys(languages).filter(lang => languages[lang] > 0);
  } catch (error) {
    console.warn(`⚠️ Could not fetch languages for ${repoName}`);
    return [];
  }
}

async function enrichRepositoriesWithLanguages(repos) {
  console.log('⚡ Fetching multi-language data for public repos...');
  
  const publicRepos = repos.filter(repo => !repo.private);
  const enrichedRepos = [];
  const batchSize = 5;

  for (let i = 0; i < publicRepos.length; i += batchSize) {
    const batch = publicRepos.slice(i, i + batchSize);
    const batchPromises = batch.map(async (repo) => {
      const languages = await fetchLanguagesForRepo(repo.name);
      return {
        ...repo,
        languages: languages.length > 0 ? languages : (repo.language ? [repo.language] : [])
      };
    });

    const batchResults = await Promise.all(batchPromises);
    enrichedRepos.push(...batchResults);
    
    const progress = Math.round(((i + batchSize) / publicRepos.length) * 100);
    console.log(`⚡ Progress: ${Math.min(progress, 100)}%`);
  }

  // Add private repos (no multi-language data)
  const privateRepos = repos.filter(repo => repo.private).map(repo => ({
    ...repo,
    languages: repo.language ? [repo.language] : []
  }));

  return [...enrichedRepos, ...privateRepos];
}

function transformRepositories(repos) {
  return repos.map(repo => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    language: repo.language,
    languages: repo.languages || [],
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    updated_at: repo.updated_at,
    topics: repo.topics || [],
    fork: repo.fork,
    private: repo.private
  })).sort((a, b) => b.stargazers_count - a.stargazers_count);
}

async function generateRepositoriesJson() {
  try {
    const repos = await fetchAllRepositories();
    const enrichedRepos = await enrichRepositoriesWithLanguages(repos);
    const transformedRepos = transformRepositories(enrichedRepos);

    // Ensure directory exists
    const outputDir = path.join(__dirname, '../dist');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write as JavaScript module instead of JSON
    const jsContent = `export const repos = ${JSON.stringify(transformedRepos, null, 2)};`;
    const outputPath = path.join(outputDir, 'repos.js');
    fs.writeFileSync(outputPath, jsContent);

    console.log(`✅ Successfully generated ${outputPath}`);
    console.log(`📦 Total repositories: ${transformedRepos.length}`);
    console.log(`📅 Generated at: ${new Date().toISOString()}`);
  } catch (error) {
    console.error('❌ Failed to generate repositories.json:', error);
    process.exit(1);
  }
}

generateRepositoriesJson();