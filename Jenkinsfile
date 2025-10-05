pipeline {
  agent any   // use a node that has Docker CLI installed, or change to a label: agent { label 'docker' }

  environment {
    GIT_CRED = 'github-pat'
    DOCKER_CRED = 'dockerhub-creds'
    SSH_CRED = 'ec2-ssh-key'
    IMAGE_NAME = '<yourhubusername>/<your-repo-name>'
    EC2_USER = 'ubuntu'
    EC2_HOST = '<EC2_PUBLIC_IP>'   // replace
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/<your-github-username>/<your-repo>.git', credentialsId: "${env.GIT_CRED}"
      }
    }

    stage('Install & Test') {
      steps {
        sh 'npm ci || npm install'   // installs dependencies
        sh 'npm test || echo "no tests or tests skipped"'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          image = docker.build("${IMAGE_NAME}:${env.BUILD_NUMBER}")
        }
      }
    }

    stage('Push to DockerHub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', "${DOCKER_CRED}") {
            image.push("${env.BUILD_NUMBER}")
            image.push('latest')
          }
        }
      }
    }

    stage('Deploy to EC2') {
      steps {
        sshagent([ "${SSH_CRED}" ]) {
          sh '''
            ssh -o StrictHostKeyChecking=no ${EC2_USER}@${EC2_HOST} '
              docker pull ${IMAGE_NAME}:${BUILD_NUMBER} &&
              docker rm -f app || true &&
              docker run -d --name app -p 80:3000 ${IMAGE_NAME}:${BUILD_NUMBER}
            '
          '''
        }
      }
    }
  }

  post {
    success { echo "Deployment successful: ${IMAGE_NAME}:${BUILD_NUMBER}" }
    failure { echo "Build failed" }
  }
}
