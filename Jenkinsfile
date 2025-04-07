pipeline {
    agent any // Runs the overall pipeline checkout on any available agent

    stages {
        stage('Build') {
            agent { // Use a specific agent (Docker container) for this stage
                docker {
                    image 'node:20.15.1-alpine'
                    reuseNode true // Run steps on the same node Jenkins is running on, but inside the container
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
                ls -la
                '''
            }
        }
        stage('Test') {
            agent { // Use the same Docker container setup for consistency
                docker {
                    image 'node:20.15.1-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                echo '--- Test Stage ---'
                echo 'Running tests:'
                # Use npx to ensure react-scripts command is found
                # Pass --watchAll=false to run tests once and exit
                npx react-scripts test --watchAll=false
                '''
            }
        }
    }
} 