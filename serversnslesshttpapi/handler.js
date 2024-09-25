const AWS = require('aws-sdk');
const { promisify } = require('util');

AWS.config.update({ region: 'us-east-1' });

const sns = new AWS.SNS({ endpoint: 'http://localhost:4566' });

sns.publish = promisify(sns.publish);

const TopicArn = 'arn:aws:sns:us-east-1:000000000000:poc-sns';

module.exports.hello = async (event) => {
  const body = JSON.parse(event.body);
  
  const params = {
    Message: body.message || 'Mensagem padrão',
    TopicArn: process.env.SNS_TOPIC_ARN || TopicArn
  };

  try {
    await sns.publish(params);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Mensagem enviada ao SNS com sucesso!' }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro ao enviar mensagem para o SNS' }),
    };
  }
};

