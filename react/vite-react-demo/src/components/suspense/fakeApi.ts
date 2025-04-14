export interface FakeUser {
    name: string;
}

export interface FakePost {
    id: number;
    text: string;
}

export function fetchProfileData() {
    const userPromise = fetchUser();
    const postsPromise = fetchPosts();
    return {
        user: wrapPromise(userPromise),
        posts: wrapPromise(postsPromise)
    };
}
  
// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise: Promise<FakeUser | FakePost[]>) {
    let status = "pending";
    let result: FakeUser | FakePost[] | Error;
    const suspender = promise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}

// 模拟从后端获取用户信息
function fetchUser() {
    console.log("fetch user...");
    return new Promise<FakeUser>((resolve) => {
        setTimeout(() => {
            console.log("===== fetched user =====");
            resolve({
                name: "Ringo Starr"
            });
        }, 3000);
    });
}

const ringoPosts = [
    {
        id: 0,
        text: "I get by with a little help from my friends"
    },
    {
        id: 1,
        text: "I'd like to be under the sea in an octupus's garden"
    },
    {
        id: 2,
        text: "You got that sand all over your feet"
    }
];

function fetchPosts() {
    const ringoPostsAtTheTime = ringoPosts;
    console.log("fetch posts...");
    return new Promise<FakePost[]>((resolve) => {
        setTimeout(() => {
            console.log("===== fetched posts =====");
            resolve(ringoPostsAtTheTime);
        }, 2000);
    });
}
  