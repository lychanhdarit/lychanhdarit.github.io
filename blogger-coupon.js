//required moment.js
//let tokenAT = $("#tokenAT").val();
let counponList = $("#counponList");
let mggLoading = $("#counponLoading");
let titleCoupon = $("#titleCoupon");
let btnMoreCoupon = $("#btnMoreCoupon");

var loadingImg = "https://blogger.googleusercontent.com/img/a/AVvXsEjem-tWEY77eArEVzlz0a7aSkuZaCfl9envYMXZk4xKHb0bEHrXEf2LtZ8kI6hlbl2zOcu7YIQiYHXjbmIvAmKcxO8B7kpQlm0_UyJeuhhUxVevCr8NEfHMAOrv7L-bMP1s9Zta0C7Nyjz2bE_4r0jRamiYy2222AWWqc0JyN92AxBvBOe5DJEqB4yB=s320";
var hostCounpon = 'https://api.accesstrade.vn/v1/offers_informations';
//let currentPage = 1, limit = 50, merchant = "shopee";

//getCounpon("shopee");

btnMoreCoupon.click(function () {
	currentPage++; getCounpon(merchant, $("#categoriesCounponFilter").val());
})
$('#txtLinkFilter').bind("enterKey", function (e) {
	$("#btnFilterCoupon").click()
});
$('#txtLinkFilter').keyup(function (e) {
	if (e.keyCode == 13) { $(this).trigger("enterKey"); }
});
$("#btnFilterCoupon").click(function () {
	currentPage = 1; counponList.empty(); searchCounpon($("#txtLinkFilter").val());
})

$("#btnCategoriesCounponFilter").click(function () {
	currentPage = 1; counponList.empty(); getCounpon(merchant, $("#categoriesCounponFilter").val());
})
$("#categoriesCounponFilter").change(function () {
	currentPage = 1; counponList.empty(); getCounpon(merchant, $("#categoriesCounponFilter").val());
})

function getCounpon(merchant, categories) {
	btnMoreCoupon.show();
	let authorizationToken = 'Token ' + tokenAT;
	let url = hostCounpon +'?merchant='+ merchant + '&status=1&page=' + currentPage + '&limit=' + limit;
	if (categories) { url += '&categories=' + categories; }
	mggLoading.html(`<p style="color:green;text-align:center;background:#fff;margin-top:10px"><img src="` + loadingImg + `" style="width:200px;display:block;margin:auto" alt="đang chờ"/><br/> <b>Đang tải dữ liệu....</b> </p>`);
	$.ajax({
		type: "GET",
		beforeSend: function (request) { request.setRequestHeader("Authorization", authorizationToken); },
		url: url,
		data: null,
		processData: false,
		success: function (res) {
			mggLoading.empty();
			let data = res.data;
			appendItem(data);
		}
	});
}

function searchCounponShopee(urlLink) {
	let authorizationToken = 'Token ' + tokenAT;
	counponList.empty();
	let url = hostCounpon + '/coupon?url=' + urlLink;
	mggLoading.html(`<p style="color:green;text-align:center;background:#fff;margin-top:10px"><img src="` + loadingImg+`" style="width:200px;display:block;margin:auto" alt="đang chờ"/><br/> <b>Đang tải dữ liệu....</b> </p>`);
	$.ajax({
		type: "GET",
		beforeSend: function (request) { request.setRequestHeader("Authorization", authorizationToken); },
		url: url,
		data: null,
		processData: false,
		success: function (res) {
			mggLoading.empty();
			let dataAll = res.data;
			if (dataAll.length > 0) {
				titleCoupon.html('<h4>Mã giảm giá có thể áp dụng:</h4>');
				var data = [];
				let endCol = 4;
				if (dataAll.length < endCol) {
					endCol = dataAll.length;
				}
				for (let index = 0; index < endCol; index++) { data.push(dataAll[index]); }
				appendItem(data);
			} 
		}
	});
}
function appendItem(data) {
	$.each(data, function (i, item) {
		var then = new Date(item.end_time);
		then.setUTCHours(23, 59, 59, 999);
		var now = new Date(); 
		var ms = moment(then, "DD/MM/YYYY HH:mm:ss").diff(moment(now, "DD/MM/YYYY HH:mm:ss"));
		var d = moment.duration(ms);
		var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
		let hour = d.asHours().toFixed(0);
		let hsd = "<b style='color:green'> " + " còn  " + hour + " giờ nữa</b>";
		if (then == now) {
			hsd = "<b style='color:green'> " + " còn  " + (24 - now.hour).toFixed(0) + " giờ </b>";
		}
		if (hour > 24) {
			let ngay = hour / 24;
			hsd = "<b style='color:green'> " + " còn  " + ngay.toFixed(0) + " ngày</b>";
		}
		if (hour == 0) {
			if (d.asMinutes() <= 0) {
				hsd = "<b  style='color:red'> " + " hết hạn</b>";
			}
			else {
				hsd = "<b  style='color:orange'> " + " Còn " + d.asMinutes().toFixed(0) + " phút</b>";
			}
		}
		let coupon_code = '';
		if (item.coupons.length > 0) { 
			coupon_code = `<p class="p-coupon-code"> <i class="fa fa-tag mr-2"></i> Mã Coupon:</p> <div class="coupon-code"> <div class="coupon-code--key" id="`+ item.id + `">` + (item.coupons[0] ? item.coupons[0].coupon_code : '') + `</div> <button class="btn-copy btn-copy-coupon"  type="button" onclick="copyCodeOpenLink( '` + item.aff_link + `','` + item.id + `',)"> 	<i class="fa fa-copy"></i></button> </div> `;

			counponList.append(` <div class="coupon-card coupon-item-card">
												<div class="coupon-info coupon-name">
													<div class="mr-3 coupon-image" style="width:50px">
													<img alt="" src="`+ item.image + `""></div>
													<p class="coupon-name cursor-pointer"> `+ item.name + ` </p></div>
													<div class="coupon-content">
													<div class="circle circle-right"></div>
													<div class="circle circle-left"></div>
													 `+ coupon_code + `
													<div class="coupon-expired">
													<p class="coupon-due-date"><i class="fa fa-clock mr-2"></i> HSD: <b  >`+ item.end_time + `</b></p>
													<p class="item-time-left"> <i  class="fa fa-hourglass-half  mr-2"></i> Thời gian: `+ hsd + ` </p><p></p></div></div>
													<div class="coupon-action mt-4">
													<a class="cursor-pointer link-coupon-action" data-bs-toggle="collapse" href="#collapseContent`+ item.id + `" role="button" aria-expanded="false" aria-controls="collapseContent` + item.id + `">Chi tiết</a>
													<a class="cursor-pointer link-coupon-action"  href='`+ item.aff_link + `' target="_blank">Lấy link</a> </div>
													<div class="collapse" id="collapseContent`+ item.id + `"> <div class="card card-body">  `+ item.content + `  </div> </div> </div>` );
		}
	});
}
function copyText(element) {
	var range, selection, worked; 
	if (document.body.createTextRange) {
		range = document.body.createTextRange();
		range.moveToElementText(element);
		range.select();
	} else if (window.getSelection) {
		selection = window.getSelection();
		range = document.createRange();
		range.selectNodeContents(element);
		selection.removeAllRanges();
		selection.addRange(range);
	} 
	try { document.execCommand('copy'); alert('đã copy mã'); }
	catch (err) { alert('unable to copy text'); }
}
function copyCodeOpenLink(link, id) { 
	var copyTextEl = document.getElementById(id); copyText(copyTextEl); if (link) { setTimeout(window.open(link), 900); }
}
