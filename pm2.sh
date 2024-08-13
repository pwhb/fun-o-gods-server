rm node_modules -rf

npm ci

npm run build && npm prune --omit=dev

pm2 start dist/main.js --name fog-dev-release