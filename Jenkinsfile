pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git 'https://github.com/Harisha-A/weather-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t harisha100/weather-app .'
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push harisha100/weather-app'
            }
        }

    }
}
