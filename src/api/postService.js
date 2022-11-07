import axios from "axios";

export class postService {
  static async getAllPosts({ postsPerPage, pageNumber }) {
    const postsResponse = await axios.get(
      "http://jsonplaceholder.typicode.com/posts",
      {
        params: {
          _limit: postsPerPage,
          _page: pageNumber,
        },
      }
    );

    const imagesResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      {
        params: {
          _limit: postsPerPage,
          _page: pageNumber,
        },
      }
    );

    const postsWithPhotos = postsResponse.data.map((post) => {
      const correspondingImage = imagesResponse.data.find(
        (image) => image.id === post.id
      );

      return {
        ...post,
        url: correspondingImage.url,
        thumbnailUrl: correspondingImage.thumbnailUrl,
      };
    });

    return { response: postsResponse, data: postsWithPhotos };
  }

  static async getPostById(id) {
    const postResponse = await axios.get(
      `http://jsonplaceholder.typicode.com/posts/${id}`
    );
    const photoResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${id}`
    );

    const postWithPhoto = {
      ...postResponse.data,
      url: photoResponse.data.url,
      thumbnailUrl: photoResponse.data.thumbnailUrl,
    };

    return { response: postResponse, data: postWithPhoto };
  }

  static async getPostComments(id) {
    return await axios.get(
      `http://jsonplaceholder.typicode.com/posts/${id}/comments`
    );
  }
}
