FROM node:12.18.1


WORKDIR /usr/src/app


COPY package*.json ./
RUN npm install


COPY . .

RUN npm run build

CMD [ "npm", "start" ]
# docker build -t task-manager .
# docker run -d -p 10000:10000 task-manager
# you can register a account with phone number and... in http://localhost:10000/register-progsess/register"
# or just use my account in http://localhost:10000//register-progsess/login"
# mobile: 09361719102
# password: 123456789
# profile section is hardcoded for now