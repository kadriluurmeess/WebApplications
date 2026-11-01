// Loob ühe postituse HTML-elemendid.
function createPost(post) {
  const article = document.createElement("article");
  article.className = "post-card";

  // Postituse päis.
  const header = document.createElement("div");
  header.className = "post-header";

  const author = document.createElement("div");
  author.className = "post-author";

  const authorIcon = document.createElement("div");
  authorIcon.className = "post-author-icon";
  authorIcon.textContent = "👤";

  const authorName = document.createElement("span");
  authorName.textContent = post.author;

  author.append(authorIcon, authorName);

  const date = document.createElement("time");
  date.className = "post-date";
  date.dateTime = post.createdAt;
  date.textContent = new Date(post.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "UTC"
    }
  );

  header.append(author, date);
  article.append(header);

  // Pilt lisatakse ainult siis, kui postitusel on pildi aadress.
  if (post.image) {
    const image = document.createElement("img");
    image.className = "post-image";
    image.src = post.image;
    image.alt = post.imageAlt;

    article.append(image);
  }

  // Postituse tekst.
  const caption = document.createElement("p");
  caption.className = "post-caption";
  caption.textContent = post.text;

  // Meeldimise nupp.
  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.type = "button";
  likeButton.title = "Like";
  likeButton.textContent = "👍";

  article.append(caption, likeButton);

  return article;
}

// Laadib postitused veebist ja lisab need lehele.
async function loadPosts() {
  const feed = document.getElementById("feed");

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/kadriluurmeess/WebApplications/main/posts.json"
    );

    if (!response.ok) {
      throw new Error("HTTP error: " + response.status);
    }

    const posts = await response.json();

    // Eemaldab laadimise teate.
    feed.replaceChildren();

    for (const post of posts) {
      const article = createPost(post);
      feed.append(article);
    }
  } catch (error) {
    feed.textContent = "Postituste laadimine ebaõnnestus.";
    console.error(error);
  }
}

loadPosts();