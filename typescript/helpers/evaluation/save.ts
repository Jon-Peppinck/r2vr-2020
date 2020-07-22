import { Entity } from 'aframe';

const saveEvaluation = (postResponse: string) => {
  const postPlane = <Entity>document.getElementById(`postPlane`)!;

  let data: any;

  let evaluationResponse: string;

  if (postResponse === 'option1Plane') {
    evaluationResponse = 'Unable to use';
  } else if (postResponse === 'option2Plane') {
    evaluationResponse = 'Major difficulty';
  } else if (postResponse === 'option3Plane') {
    evaluationResponse = 'Minor difficulty';
  } else {
    evaluationResponse = 'No difficulty';
  }

  if (postPlane.getAttribute('annotated') === 'false') {
    postPlane.setAttribute('annotated', 'true');
    console.log('POST');
    data = {
      observer: 'Harry',
      question:
        'Indicate your difficulty using the system to annotate 2D images?',
      response: evaluationResponse,
    };
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    postEvaluation(data);
  } else {
    console.log('PUT');
    data = {
      observer: 'Harry',
      response: evaluationResponse,
    };
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    //  updateResponse(data);
  }
};

export default saveEvaluation;
