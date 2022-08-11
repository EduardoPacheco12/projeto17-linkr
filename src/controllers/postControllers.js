import { postsMetadata } from '../handlers/postsHandler.js';
import {postRepository} from '../repositories/postRepository.js'


export async function post(req, res) {
  const { link, description } = req.body;
  const {id} = res.locals
  try {
    await postRepository.sendPost(id, description, link);

    res.sendStatus(201);
  } catch(err) {
    console.log(err);
    res.sendStatus(401);
  }
}


export async function getPost(req, res) {
  let a = []
  try {
    const { rows: usersData, rowCount } = await postRepository.getPosts();

    const ultimos20 = (rowCount > 20)? 20 : rowCount; 
    for (let i = 0; i < rowCount; i++) {
      console.log(usersData[i])
      a.push( await postsMetadata(usersData[i]));
      
    }

    res.status(200).send(a.reverse());
  } catch(err) {
    console.log(err);
    res.sendStatus(500);
  }
}