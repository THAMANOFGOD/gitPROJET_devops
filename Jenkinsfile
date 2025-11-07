pipeline {
    agent any

    // Configuration des paramètres Slack dans le bloc environment
    environment {
        // Le nom de la configuration Slack est "Jenkins-Notifier" comme spécifié par l'utilisateur.
        SLACK_CHANNEL = '#jenkins'
        SLACK_CONFIG = 'DEVOPSb3 utils'
    }

    // Définition des options globales pour le pipeline
    options {
        // Option pour nettoyer l'espace de travail après l'exécution
        skipDefaultCheckout()
        // Définir le fuseau horaire pour les logs
        timestamps()
    }

    stages {
        stage('Démarrage du Pipeline') {
            steps {
                script {
                    // Notification de début de build
                    slackSend(
                        channel: env.SLACK_CHANNEL,
                        color: 'good',
                        message: "✅ *Démarrage du Pipeline* : Le build #${env.BUILD_NUMBER} pour le dépôt `${env.JOB_NAME}` sur la branche `${env.BRANCH_NAME}` a commencé. (<${env.BUILD_URL}|Voir le Build>)",
                        teamDomain: 'travailraman',
                        tokenCredentialId: env.SLACK_CONFIG
                    )
                }
            }
        }

        stage('Checkout du Code') {
            steps {
                // Récupération du code depuis GitHub
                checkout scm
                script {
                    // Notification de succès de l'étape
                    slackSend(
                        channel: env.SLACK_CHANNEL,
                        color: 'good',
                        message: "ℹ️ *Étape 1/4: Checkout du Code* : Code récupéré avec succès sur la branche `${env.BRANCH_NAME}`. (<${env.BUILD_URL}|Détails>)",
                        teamDomain: 'travailraman',
                        tokenCredentialId: env.SLACK_CONFIG
                    )
                }
            }
        }

        stage('Build') {
            steps {
                echo "Simuler l'étape de construction (par exemple, npm install, mvn package, docker build)"
                script {
                    slackSend(
                        channel: env.SLACK_CHANNEL,
                        color: 'good',
                        message: "🛠️ *Étape 2/4: Build* : La construction du projet est terminée. (<${env.BUILD_URL}|Détails>)",
                        te
