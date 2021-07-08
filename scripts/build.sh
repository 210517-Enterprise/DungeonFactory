cd frontend || cd ../frontend || exit
npm run build
cp -r build/. ../src/main/resources/static/
