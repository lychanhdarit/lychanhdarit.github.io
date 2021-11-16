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

function customContentProductBook(content) { 
    if (content) {
        let html = ''; 
        let title = getValueCodeFromContent(content, "[title]", "[/title]");
        if (content.indexOf("[tintuc]") == -1) {
            let linkImage = getValueCodeFromContent(content, "[thumbnail_url]", "[/thumbnail_url]");
            let id = getValueCodeFromContent(content, "[id]", "[/id]");
            let giaban = getValueCodeFromContent(content, "[price]", "[/price]");
            let chitiet = getValueCodeFromContent(content, "[description]", "[/description]");
            let mota = getValueCodeFromContent(content, "[short_description]", "[/short_description]");
            let list_price = getValueCodeFromContent(content, "[list_price]", "[/list_price]");
            let original_price = getValueCodeFromContent(content, "[original_price]", "[/original_price]");
            let discount = getValueCodeFromContent(content, "[discount]", "[/discount]");
            let discount_rate = getValueCodeFromContent(content, "[discount_rate]", "[/discount_rate]");
            discount_rate = discount_rate.replaceAll("-", "");
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
            let km = ""; 
            current_seller = current_seller.replaceAll("https://tiki.vn", "https://go.isclix.com/deep_link/5637987508533784952?url=https://tiki.vn");
            other_sellers = other_sellers.replaceAll("https://tiki.vn", "https://go.isclix.com/deep_link/5637987508533784952?url=https://tiki.vn");
            if (discount_rate != "0%") {
                km = `<div class="original_price"><small>Giá gốc:</small> ` + original_price + ` ₫</div>  <div class="discount">Giảm ` + discount_rate + `</div>`;
            }
            html = `  <div class="detail-top">   <div class="row">
                                                                    <div class="col-md-4">
                                                                            <div class="img-product"><img class="lazy" alt="`+ title + `" data-src='` + linkImage + `'/></div>
                                                                    </div>
                                                                    <div class="col-md-8 detail-product row">
                                                                          <h1 class="title">`+ title + `</h1>
                                                                          <div class="detail-product-item col-md-7">
                                                                              <div class="mota"><p>`+ mota + `</p></div>
                                                                               `+ km + `
                                                                              <div class="gia">`+ giaban + ` ₫</div>
                                                                                 `+ badges_new + `
                                                                              <div class="buy"> <a href='`+ affLink + `https://tiki.vn/` + url_path.replaceAll("https://tiki.vn/", "") + `' target='_blank' rel='nofollow' class="btn btn-buy">Mua tại Tiki</a></div>
                                                                                   ` + seller_specifications + `
                                                                          </div>
                                                                          <div class="col-md-5">
                                                                                <div class="box-cuahang">
                                                                                    <h3 class="title">Các cửa hàng đang bán</h3>
                                                                                    `+ current_seller + `` + other_sellers + `
                                                                                </div>
                                                                                <div>
                                                                                   <a href="/p/ma-giam-gia.html" class=" btn-mgg-tiki2"><i class="fa fa-tag mr-2"></i> Mã giảm giá</a>
                                                                                </div>
                                                                           </div>
                                                                    </div>

                                                                 </div>
                                                            </div>
                                                         <div class="recentBox ">
                                                            <h3>Sản Phẩm Tương Tự</h3>
                                                            <div class="boxData">
                                                                <div id="recentProducts" class="homeData  row"></div>
                                                                <div id="productLoading"> </div>
                                                                <p class="text-center">
                                                                    <button id="btnMore" class="btn btn-primary">Xem thêm</button>
                                                                </p>
                                                            </div>
                                                         </div>
                                                          <div class="chitiet">
                                                                    <h4>Thông tin chi tiết</h4>
                                                                    <div class="content has-table">
                                                                        <table class="table-content">
                                                                            <tbody>
                                                                                <tr><td>Công ty phát hành</td><td>`+ publisher + `</td></tr>
                                                                                <tr><td>Ngày xuất bản</td><td>`+ publication_date + `</td></tr>
                                                                                <tr><td>Kích thước</td><td>`+ dimensions + `</td></tr>
                                                                                <tr><td>Loại bìa</td><td>`+ book_cover + `</td></tr>
                                                                                <tr> <td>Số trang</td> <td>`+ number_of_page + `</td> </tr>
                                                                                <tr><td>Nhà xuất bản</td><td>`+ manufacturer + `</td></tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div> `+ chitiet + `</div> `;
            return html;
        }
        else {
            html = getValueCodeFromContent(content, "[tintuc]", "[/tintuc]");
            if (html.length == 0) {
                html = content;
            }
            html = "<div class='bai-viet'><h1 class='title'>" + title + "</h1>" + "<div class='chi-tiet-bai-viet'>" + html + "</div></div>";
            return html;
        }
    }
}

function customContentProductV1(content) { 
    if (content) {
        let html = ''; 
        let title = getValueCodeFromContent(content, "[title]", "[/title]");
        if (content.indexOf("[tintuc]") == -1) { 
            if (content.indexOf("[price]") > -1) {
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
                linkImage = linkImage.replaceAll("http://", "https://");
                let km = "";
                if (discount_rate != "0%") {
                    km = `<div class="original_price"><small>Giá gốc:</small> ` + original_price.replaceAll("₫", "") + ` ₫</div>  <div class="discount"> -` + discount_rate.replaceAll("-", "") + `</div>`;
                }
                giaban = giaban.replaceAll("₫", "");
                if (url_path.indexOf("https://") == -1) { url_path = "https://tiki.vn/" + url_path }

                current_seller = current_seller.replaceAll("https://tiki.vn", "https://go.isclix.com/deep_link/5637987508533784952?url=https://tiki.vn");
                other_sellers = other_sellers.replaceAll("https://tiki.vn", "https://go.isclix.com/deep_link/5637987508533784952?url=https://tiki.vn");

                mota = mota + `<div class="mota"><p></p><p>➡ Vào mục mã giảm giá để lấy mã giảm giá Shopee, Lazada, Tiki,... <br><a href="/p/ma-giam-gia.html" class="btn-mgg" id="btn-mgg">✔️ Mã giảm giá</a></p>    <p></p></div>`;
                html = `  <div class="detail-top">  <div class="row">  <div class="col-md-4">  <div class="img-product"><img class="lazy" alt="`+ title + `" data-src='` + linkImage + `'/></div>  </div>
                            <div class="col-md-8 detail-product row">  <h1 class="title" style="text-align:left">`+ title + `</h1>
                                    <div class="detail-product-item col-md-7">  <div class="mota"><p>`+ mota + `</p></div>   `+ km + `  <div class="gia">`+ giaban + ` ₫</div>  `+ badges_new + `   <div class="buy" style="width:130px"> <a href='`+ affLink + `` + url_path + `' target='_blank' rel='nofollow' class="btn btn-buy">Mua ngay</a></div>  ` + seller_specifications + `  </div>
                                    <div class="col-md-5">  <div class="box-cuahang">  <h3 class="title">Các cửa hàng đang bán</h3>  `+ current_seller + `` + other_sellers + `  </div> <div>  <a href="/p/ma-giam-gia.html" class=" btn-mgg-tiki2"><i class="fa fa-tag mr-2"></i> Mã giảm giá </a> </div> </div> </div>  </div> </div>  <div class="recentBox ">  <h3>Sản Phẩm Tương Tự</h3>  <div class="boxData">  <div id="recentProducts" class="  homeData  row"></div> <div id="productLoading"> </div>   <p class="text-center">  <button id="btnMore" class="btn btn-primary">Xem thêm</button> </p> </div>  </div>  <div class="chitiet">`+ chitiet + `</div> `;
                return html;
            }

            if (content.indexOf("[giaban]") > -1) {
                let linkImage = getLinkImageFromContent(content);
                linkImage = linkImage.replaceAll("http://", "https://");
                let giaban = getValueCodeFromContent(content, "[giaban]", "[/giaban]");
                giaban = giaban.replaceAll("₫", "");
                let chitiet = getValueCodeFromContent(content, "[chitiet]", "[/chitiet]");
                let mota = getValueCodeFromContent(content, "[mota]", "[/mota]");
                html = ` <div class="detail-top">  <div class="row">  <div class="col-md-4">   <div class="img-product"><img class="lazy" alt="`+ title + `" data-src='` + linkImage + `'/></div>   </div>
                            <div class="col-md-8 detail-product row">   <h1 class="title">`+ title + `</h1> <div class="detail-product-item col-md-7">  <div class="mota"><p>`+ mota + `</p></div>   <div class="gia">`+ giaban + ` ₫</div> </div>
                                    <div class="col-md-5">  <div> <a href="/p/ma-giam-gia-shopee.html" class=" btn-mgg-tiki2"><i class="fa fa-tag mr-2"></i> Mã giảm giá Shopee</a>   </div> </div> </div>  </div>
                    </div>
                    <div class="coupon-list"><div id="titleCoupon"></div> <div id="counponList" class="coupon-list-card"> </div> <div id="mgg-loading"> </div></div> 
                    <div class="recentBox ">  <h3>Sản Phẩm Tương Tự</h3> <div class="boxData">   <div id="recentProducts" class="  homeData  row"></div> <div id="productLoading"> </div>  <p class="text-center">  <button id="btnMore" class="btn btn-primary">Xem thêm</button>   </p> </div> </div>  <div class="chitiet">  <h4>Thông tin chi tiết</h4> `+ chitiet + `</div> `;
                return html;
            } 
        }
        else {
            html = getValueCodeFromContent(content, "[tintuc]", "[/tintuc]");
            if (html.length == 0) {
                html = content;
            }
            html = "<div class='bai-viet'><h1 class='title'>" + title + "</h1>" + "<div class='chi-tiet-bai-viet'>" + html + "</div></div>";
            return html;
        } 
    }

}