import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';

const baseFolder =
    env.APPDATA !== undefined && env.APPDATA !== ''
        ? `${env.APPDATA}/ASP.NET/https`
        : `${env.HOME}/.aspnet/https`;

const certificateName = "socialcampaign.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
    fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
    if (0 !== child_process.spawnSync('dotnet', [
        'dev-certs',
        'https',
        '--export-path',
        certFilePath,
        '--format',
        'Pem',
        '--no-password',
    ], { stdio: 'inherit', }).status) {
        console.warn("Skipping certificate creation - Running in production mode.");
    }
}

// Detect if running in a production environment
const isProduction = process.env.NODE_ENV === "production";

// ✅ **Fixed API Base URL** ✅
const apiBaseUrl = isProduction
    ? "https://socialcampaign-api-feceh0ecded8gfe0.australiaeast-01.azurewebsites.net"
    : "https://localhost:53328";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    define: {
        __API_BASE_URL__: JSON.stringify(apiBaseUrl),
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            // ✅ Restored All Proxy Routes ✅
            '^/api/AdminApprovals': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/api/BusinessAds': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/api/BusinessAds/business': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/business_ads': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/api/Businesses': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/api/CampaignLikes': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/api/Campaigns': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/api/Users': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/profile_pictures': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/campaign_pictures': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/api/Campaigns/bycreator': { target: apiBaseUrl, secure: false, changeOrigin: true },
            '^/api': { target: apiBaseUrl, secure: false, changeOrigin: true },
        },
        port: 53328,
        https: isProduction ? false : {
            key: fs.readFileSync(keyFilePath),
            cert: fs.readFileSync(certFilePath),
        }
    },
    build: {
        outDir: "dist" // Ensure output directory matches GitHub Actions config
    }
});
