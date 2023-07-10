
const validateEnv = () => {
    const requiredEnvVars = ['email', 'password'];
    let missingEnvs = []
    requiredEnvVars.forEach((variable) => {
        if (!process.env[variable] || process.env[variable]?.length <= 0) {
            missingEnvs.push(variable);
        }
    });

    if (missingEnvs.length > 0) {
        console.log('Following env variables are missing', missingEnvs);
        process.exit(1);
    }
    else return true;
}

module.exports = validateEnv