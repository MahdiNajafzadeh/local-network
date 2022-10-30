const getAPI = require("./Services/request/get");
const postAPI = require("./Services/request/post");
const putAPI = require("./Services/request/put");
const deleteAPI = require("./Services/request/delete");
const fs = require("fs");

// Get Data Before Request
// getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
//   for (const comment of res.data) {
//     console.log(comment.body);
//   }
// });
// // Send Request
// let body = "I can write Comment !";
// postAPI(`/projects/188/issues/1/notes?body=${body}`).then((res) => {
//   console.log("Hey Responss State is " + res.state);
//   // Get Data After Request
//   getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
//     for (const comment of res.data) {
//       console.log(comment.body);
//     }
//   });
// });

// Modifing Comment
// let body2 = "I can Modifing Comment";
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
// getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
//   for (const comment of res.data) {
//     if (comment.body.split(" ")[0] === "assigned") {
//       console.log("I canot delete this comment");
//       continue;
//     }
//     deleteAPI(`/projects/188/issues/1/notes/${comment.id}/`).then((res) => {
//       if (res.state) {
//         console.log("Yes , Deleted Comment".split(" "));
//       }
//     });
//   }
// });
// let userName = "mahdi.najafzadeh";
// let body = `
// خطایی در ثبت لیبل نام تیم رخ داده است

// نام کاربری @${userName} دارای نام تیم نمی‌باشد

// پیگیری شود : @arash.ghavidast
// `;
// // console.log(body);

let body2 = `
خطایی در ثبت لیبل نام تیم رخ داده است

نام کاربری @mahdi.najafzadeh دارای نام تیم نمی‌باشد

پیگیری شود : @arash.ghavidast
`;

// console.log(body === body2);
// console.log(body.length + " : " + body2.length);
// for (let i = 0; i < body.length; i++) {
//   // console.log(`${i} - body[i] | body2[i]: ${body[i]} | ${body2[i]} | ${body2[i] === body[i]}`);
// }
// console.log(body.split("\n").forEach((data)=>{}));

let commentsAnalyzG = [];
let commentsAnalyzF = [];
// Get Data Before Request
// getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
//   for (const comment of res.data) {
//     let wordOfComment = [];
//     for (const line of comment.body.trim().split("\n")) {
//       for (const word of line.trim().split(" ")) {
//         if (word === "") continue;
//         wordOfComment.push(word);
//       }
//     }
//     commentsAnalyz.push(wordOfComment);
//   }
//   console.log(commentsAnalyz);
//   fs.writeFileSync("./commentAnalyz.txt", JSON.stringify(commentsAnalyz));
// });

commentsAnalyzF = JSON.parse(fs.readFileSync("./commentAnalyz.txt"));
console.log(commentsAnalyzF);
getAPI("/projects/188/issues/1/notes?sort=asc").then((res) => {
  for (const comment of res.data) {
    let wordOfComment = [];
    for (const line of comment.body.trim().split("\n")) {
      for (const word of line.trim().split(" ")) {
        if (word === "") continue;
        wordOfComment.push(word);
      }
    }
    commentsAnalyzG.push(wordOfComment);
  }

  for (let commentN = 0; commentN < commentsAnalyzG.length; commentN++) {
    for (let wordN = 0; wordN < commentsAnalyzG[commentN].length; wordN++) {
      if (commentsAnalyzG[commentN][wordN] !== commentsAnalyzF[commentN][wordN])
        continue;

    }
  }

  //   for (const comments of commentAnalyzG) {
  //     for (const comment of comments) {
  //         for (const word of comment) {
  //             if()
  //         }
  //     }
  //   }
});
