#!/usr/bin/env groovy
pipeline {
    agent any

    stages {
            stage('Build') {
                steps {
                    sh "rm -rf dist"
                    sh "npm run build"
                    sh "PARCEL_AUTOINSTALL=false npx parcel build demo/index.html --public-url /rqcomponents/ --no-cache --no-minify"
                }
            }
            stage('Deploy') {
                steps {
                    sh "rsync -aczvh --stats --delete dist/ jenkins@172.30.0.14:/static/st/rqcomponents"
                }
            }
    }

    post {
        unstable {
            mail (to: "anson@ricequant.com",
                  subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                  body: "Something is wrong with ${env.BUILD_URL}")
        }
    }
}