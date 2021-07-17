mvn clean package
docker build -t dungeonfactory/rest .

cd frontend || cd ../frontend || exit
npm run build
docker build -t dungeonfactory/frontend .