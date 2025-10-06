stage('Prepare Node App') {
    steps {
        sh '''
        mkdir -p app
        cat > app/package.json <<'EOF'
{
  "name": "my-node-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {}
}
EOF

        cat > app/app.js <<'EOF'
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('✅ Hello from Node.js inside Docker!');
});
server.listen(3000, () => console.log('🚀 Server running on port 3000'));
EOF
        '''
    }
}
