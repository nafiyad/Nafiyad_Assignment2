pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = 'c1493684-7ac4-475d-90ba-396b2cf694b4'
        NETLIFY_AUTH_TOKEN = credentials('assignment2Token') 
    }

    stages {
        stage('Docker Build Custom Image') {
            steps {
                echo '--- Building Custom Docker Image ---'
                sh 'docker build -t my-docker-image .'
            }
        }

        stage('Build React App') {
            agent {
                docker {
                    image 'node:20.15.1-alpine' 
                    reuseNode true
                }
            }
            steps {
                sh '''
                echo '--- Build Stage ---'
                echo 'Listing files before build:'
                ls -la
                echo 'Node and npm versions:'
                node --version
                npm --version
                echo 'Installing dependencies:'
                npm install
                echo 'Running build:'
                npm run build
                echo 'Listing files after build:'
                ls -la build/
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:20.15.1-alpine' 
                    reuseNode true
                }
            }
            steps {
                sh '''
                echo '--- Test Stage ---'
                echo 'Checking for build output:'
                test -f build/index.html 
                echo 'Running tests:'
                npx react-scripts test --watchAll=false
                '''
            }
        }

        stage('Deploy to Netlify') {
            agent {
                docker {
                    image 'my-docker-image'
                    reuseNode true
                }
            }
            steps {
                sh '''
                echo '--- Deploy Stage ---'
                echo 'Checking netlify-cli version (from custom image):'
                netlify --version
                echo "Deploying build directory to production. Site ID: $NETLIFY_SITE_ID"
                netlify deploy --prod --dir=build --message "Deploy from Jenkins build $BUILD_NUMBER"
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
} 