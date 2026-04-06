 pipeline {
     agent any
     environment {
         IMAGE_NAME = 'harisha100/weather-application'
         IMAGE_TAG  = 'latest'
     }
     stages {
         stage('Check Repository Files') {
             steps {
                 bat 'dir'
             }
         }

         stage('Test') {
             steps {
                 bat 'npm install'
                 bat 'npm test'
             }
         }

         stage('Clean Docker Cache') {
             steps {
                 bat 'docker system prune -af'
             }
         }

         stage('Build Docker Image') {
             steps {
                 bat 'docker build --no-cache -t %IMAGE_NAME%:%IMAGE_TAG% .'
             }
         }

         stage('Login & Push Docker Image') {
             steps {
                 withCredentials([usernamePassword(
                     credentialsId: 'dockerhub-cred',
                     usernameVariable: 'DOCKER_USER',
                     passwordVariable: 'DOCKER_PASS'
                 )]) {
                    bat 'echo %DOCKER_PASS%| docker login -u %DOCKER_USER% --password-stdin'
                    bat 'docker push %IMAGE_NAME%:%IMAGE_TAG%'
                }
            }
        }

        stage('Deploy Container') {
            steps {
                bat 'docker stop weather-app || exit 0'
                bat 'docker rm weather-app || exit 0'
                withCredentials([string(
                    credentialsId: 'weather-api-key',
                    variable: 'API_KEY'
                )]) {
                    bat 'docker run -d --name weather-app -p 3000:3000 -e API_KEY=%API_KEY% %IMAGE_NAME%:%IMAGE_TAG%'
                }
            }
        }
    }
    post {
        always {
            bat 'docker logout'
        }
    }
}