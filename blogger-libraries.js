let homePageUrl = getUrlHost();

function getUrlHost() { let current = location.href; current = current.replaceAll("https://", ""); if (current.indexOf("?") > -1) { current = current.split('?')[0]; } if (current.indexOf("/") > -1) { current = current.split('/')[0]; } return "https://" + current; }

function getLinkImageFromContent(content) { let s = content; let a = s.indexOf('<img'); let b = s.indexOf('src="', a); let c = s.indexOf('"', b + 5); return s.substr(b + 5, c - b - 5); }

function getLinkFromLinks(links) { for (let i = 0; i < links.length; i++) { if (links[i].type == "text/html") { return links[i].href.replaceAll("#comment-form", ""); } } return ""; }

function getPostId() { let atom = document.querySelectorAll("meta[property='postId']"); for (let i = 0; i < atom.length; i++) { let id = atom[i].getAttribute("content"); if (id) { return id; } } return "0"; }

function getValueCodeFromContent(content, beginCode, endCode) { return (-1 != content.indexOf(beginCode) ? content.substring(content.indexOf(beginCode) + beginCode.length, content.indexOf(endCode)) : ""); }

function getLabelFromLink() {
	let str = location.href; let urllength = homePageUrl.length; let label = ""; if (-1 != str.indexOf("search/label")) {
		if (-1 != str.indexOf("?")) { var str1 = str.split("?")[0]; label = str1.substring(urllength + 13, str1.length); } else label = str.substring(urllength + 13, str.length);
	}
	return label;
}


function getItemProductFromContent(content) {
	let linkImage = getValueCodeFromContent(content, "[thumbnail_url]", "[/thumbnail_url]");
	let id = getValueCodeFromContent(content, "[id]", "[/id]");
	let giaban = getValueCodeFromContent(content, "[price]", "[/price]");
	let chitiet = getValueCodeFromContent(content, "[description]", "[/description]");
	let mota = getValueCodeFromContent(content, "[short_description]", "[/short_description]");
	let list_price = getValueCodeFromContent(content, "[list_price]", "[/list_price]");
	let original_price = getValueCodeFromContent(content, "[original_price]", "[/original_price]");
	let discount = getValueCodeFromContent(content, "[discount]", "[/discount]");
	let discount_rate = getValueCodeFromContent(content, "[discount_rate]", "[/discount_rate]");
	let url_path = getValueCodeFromContent(content, "[url_path]", "[/url_path]");
	let publisher = getValueCodeFromContent(content, "[publisher]", "[/publisher]");
	let manufacturer = getValueCodeFromContent(content, "[manufacturer]", "[/manufacturer]");
	let publication_date = getValueCodeFromContent(content, "[publication_date]", "[/publication_date]");
	let dimensions = getValueCodeFromContent(content, "[dimensions]", "[/dimensions]");
	let book_cover = getValueCodeFromContent(content, "[book_cover]", "[/book_cover]");
	let number_of_page = getValueCodeFromContent(content, "[number_of_page]", "[/number_of_page]");
	let badges_new = getValueCodeFromContent(content, "[badges_new]", "[/badges_new]");
	let current_seller = getValueCodeFromContent(content, "[current_seller]", "[/current_seller]");
	let seller_specifications = getValueCodeFromContent(content, "[seller_specifications]", "[/seller_specifications]");
	let other_sellers = getValueCodeFromContent(content, "[other_sellers]", "[/other_sellers]");
	let url_key = getValueCodeFromContent(content, "[url_key]", "[/url_key]");
	let dich_gia = getValueCodeFromContent(content, "[dich_gia]", "[/dich_gia]");
	let authors = getValueCodeFromContent(content, "[authors]", "[/authors]");
	let rating_average = getValueCodeFromContent(content, "[rating_average]", "[/rating_average]");
	let review_count = getValueCodeFromContent(content, "[review_count]", "[/review_count]");
	let link = getLinkFromLinks(n.link);
	link = link.replaceAll("#comment-form", ""); linkImage = linkImage.replaceAll("http://", "https://");
	let dc = "";
	if (discount_rate != '0%') { dc = `<span class="discount item_price"> ` + discount_rate + `</span>`; }
	return (`<div class="item col-md-3"> <div class="product-grid-item simpleCart_shelfItem"> <div class="product_img relative"> <div class="icon_flat"></div> <a href = "` + link + `"> <img alt="` + title + `"  data-src="` + linkImage + `" class = "lazy" ></a> </div> <div class="product_title"> <h3><a href="` + link + `" class="item_name">` + title + `</a></h3> </div> <div class="product_price"> <span class="price_new item_price"> ` + giaban.replaceAll("₫", "") + ` đ</span> ` + dc + ` </div>  ` + badges_new + ` <div class="area_btn"> </div></div></div>`);

}