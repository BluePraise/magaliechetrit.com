// References and sources:
// https://linguinecode.com/post/enable-wordpress-rest-api-cors

const url = 'https://libra.nightschool.studio/mc/wp-json/wp/v2/posts'

const response = fetch(url)
  .then(response => response.json())
  .then(data => data.forEach(post => {
    console.log(post.id);
}));

// this one works. Fallback.
function fetchAllPosts() {
	let request = new XMLHttpRequest();
	if (request) {
		request.onreadystatechange = function() {
			if (this.readyState == 4 && (this.status == 200 || this.status == 304)) {
				console.log(request.responseText);
                data = request.responseText;
                console.log(request.responseText.title.rendered);
			}
		};
		request.open("GET", url, true);
		request.send(null);
	}
}
