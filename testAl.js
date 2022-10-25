getAPI = require("./Services/request/get");
postAPI = require("./Services/request/post");
putAPI = require("./Services/request/put");
deleteAPI = require("./Services/request/delete");

// Get Data Before Request
getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
  for (const comment of res.data) {
    console.log(comment.body);
  }
});
// // Send Request
let body = "I can write Comment !";
postAPI(`/projects/188/issues/1/notes?body=${body}`).then((res) => {
  console.log("Hey Responss State is " + res.state);
  // Get Data After Request
  getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
    for (const comment of res.data) {
      console.log(comment.body);
    }
  });
});

// Modifing Comment
let body2 = "I can Modifing Comment";
// getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
//   for (const comment of res.data) {
//     if (comment.body === body) {
//       putAPI(`/projects/188/issues/1/notes/${comment.id}/?body=${body2}`).then(
//         (res) => {
//           if (res.state) {
//             console.log("Yes , Modified Comment");
//           }
//         }
//       );
//     }
//   }
//   // Get Data Before Request
//   getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
//     for (const comment of res.data) {
//       console.log(comment.body);
//     }
//   });
// });

// Delete Comment
getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
  for (const comment of res.data) {
    if (comment.body.split(" ")[0] === "assigned") {
      console.log("I canot delete this comment");
      continue;
    }
    deleteAPI(`/projects/188/issues/1/notes/${comment.id}/`).then((res) => {
      if (res.state) {
        console.log("Yes , Deleted Comment".split(" "));
      }
    });
  }
});
