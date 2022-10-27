import axios from "axios";

export class postService {
  static async getAllPosts() {
    return axios.get("http://jsonplaceholder.typicode.com/posts");
  }

  static async getPostById(id) {
    const response = await axios.get(
      `http://jsonplaceholder.typicode.com/posts/${id}`
    );

    return response.data;
  }
}
