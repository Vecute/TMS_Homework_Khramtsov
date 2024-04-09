// 1) Async / await:
let postIds = [15, 23, 7, 3];

async function loadPosts(postIds) {
    for (let postId of postIds) {
        try {
            let response = await fetch(`https://jsonplaceholder.org/posts/${postId}`);
            let post = await response.json();
            console.log(post.content);
        } catch (error) {
            console.error(`Error loading post ${postId}: ${error}`);
        }
    }
}

loadPosts([15, 23, 7, 3]);

// 2) Promise chainingW
let textIds = [15, 23, 7, 3];

let promise = Promise.resolve();

textIds.forEach(textId => {
    promise = promise.then(() => fetch(`https://jsonplaceholder.org/posts/${textId}`)
        .then(response => response.json())
        .then(post => console.log(post.content))
        .catch(error => console.error(`Error loading post ${textId}: ${error}`)));
});
