FROM node:18.12.1
WORKDIR /pray2u_fe
COPY package.json .
RUN npm install
COPY . .

ARG REACT_APP_API_SERVER
ENV REACT_APP_API_SERVER=${REACT_APP_API_SERVER}

ARG REACT_APP_REDIRECT_URL
ENV REACT_APP_REDIRECT_URL=${REACT_APP_REDIRECT_URL}

ARG REACT_APP_AWS_ACCESS_KEY
ENV REACT_APP_AWS_ACCESS_KEY=${REACT_APP_AWS_ACCESS_KEY}

ARG REACT_APP_AWS_SECRET_ACCESS_KEY
ENV REACT_APP_AWS_SECRET_ACCESS_KEY=${REACT_APP_AWS_SECRET_ACCESS_KEY}

ARG REACT_APP_REGION
ENV REACT_APP_REGION=${REACT_APP_REGION}

ARG REACT_APP_S3_BUCKET
ENV REACT_APP_S3_BUCKET=${REACT_APP_S3_BUCKET}

ARG GENERATE_SOURCEMAP
ENV GENERATE_SOURCEMAP=${GENERATE_SOURCEMAP}

EXPOSE 3000
CMD ["npm", "start"]