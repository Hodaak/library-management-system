export default {
  data() {
    return {
      newPost: "",
      newComments: [],
      showPostMenu: null,
      posts: [
        {
          author: "You",
          content: "Hello, world!",
          comments: [],
          editing: false
        }
      ]
    };
  },
  methods: {
    isAuthor(author) {
      return localStorage.getItem('user') === author;
    },
    addPost() {
      if (this.newPost !== "") {
        this.posts.unshift({
          author: localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : "",
          content: this.newPost,
          comments: [],
          editing: false
        });
        this.newPost = "";
      }
    },
    addComment(index) {
      if (this.newComments[index] !== "") {
        this.posts[index].comments.push(this.newComments[index]);
        this.newComments[index] = "";
      }
    },
    togglePostMenu(index) {
      // TODO: toggle post menu when the post is created by 'CURRENT USER'
      if (this.showPostMenu === index) {
        this.showPostMenu = null;
      } else {
        this.showPostMenu = index;
      }
    },
    editPost(index) {
      this.posts[index].editing = true;
      this.showPostMenu = null;
    },
    saveEditedPost(index) {
      this.posts[index].editing = false;
    },
    deletePost(index) {
      this.showPostMenu = null;
      this.posts.splice(index, 1);
    }
  }
};
